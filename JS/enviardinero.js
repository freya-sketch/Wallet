document.addEventListener("DOMContentLoaded", () => {
  // Mostrar saldo actual desde localStorage
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000); // inicializar si no existe
  }
  const saldoActual = parseInt(localStorage.getItem("saldo"));
  document.querySelector(".monto").textContent = `Saldo $${saldoActual.toLocaleString()}`;

  // Seleccionar contacto → rellena el campo destinatario
  const botones = document.querySelectorAll(".list-group-item button");
  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.parentElement.querySelector("strong").textContent;
      document.getElementById("destinatario").value = nombre;
    });
  });

  // Enviar dinero → actualizar saldo y transacciones
  const form = document.getElementById("sendMoneyForm");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const destinatario = document.getElementById("destinatario").value.trim();
    const monto = parseInt(document.getElementById("monto").value);

    if (!destinatario) {
      alert("Selecciona un contacto antes de enviar dinero.");
      return;
    }

    let saldo = parseInt(localStorage.getItem("saldo"));
    if (monto > saldo) {
      alert("Saldo insuficiente.");
      return;
    }

    // Restar del saldo
    saldo -= monto;
    localStorage.setItem("saldo", saldo);
    document.querySelector(".monto").textContent = `Saldo $${saldo.toLocaleString()}`;

    // Guardar transacción
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    const fecha = new Date().toLocaleDateString("es-ES");
    transacciones.unshift({ tipo: "Envío", monto: monto, fecha: fecha, destinatario: destinatario });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    alert(`Has enviado $${monto.toLocaleString()} a ${destinatario}`);
    form.reset();
    document.getElementById("destinatario").value = "";
  });
});
