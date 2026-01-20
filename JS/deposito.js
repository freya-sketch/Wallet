document.addEventListener("DOMContentLoaded", () => {
  // Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000);
  }

  // Mostrar saldo actual
  const saldoActual = Number(localStorage.getItem("saldo"));
  document.getElementById("saldo").textContent = `Saldo $${saldoActual.toLocaleString()}`;

  // Formulario de depósito
  const form = document.getElementById("depositForm");
  const montoInput = document.getElementById("monto");
  const submitBtn = form.querySelector("button[type='submit']");

  submitBtn.disabled = true;

  montoInput.addEventListener("input", () => {
    submitBtn.disabled = montoInput.value.trim() === "";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const monto = Number(montoInput.value.trim());

    // Actualizar saldo
    let saldo = Number(localStorage.getItem("saldo"));
    saldo += monto;
    localStorage.setItem("saldo", saldo);
    document.getElementById("saldo").textContent = `Saldo $${saldo.toLocaleString()}`;

    // Guardar transacción
    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    const fecha = new Date().toLocaleDateString("es-ES");
    transacciones.unshift({ tipo: "Depósito", monto: monto, fecha: fecha });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    // Mensaje de confirmación
    alert(`Depósito realizado: $${monto.toLocaleString()}`);

    // Redirigir al menú después de 2 segundos
    setTimeout(() => {
      window.location.href = "../HTML/menu.html";
    }, 2000);
  });

  // Eventos de los enlaces del menú
  const mensaje = document.getElementById("mensaje");
  const mensajes = {
    linkInicio: "Redirigiendo al inicio...",
    linkEnviar: "Redirigiendo a enviar dinero...",
    linkMovimientos: "Redirigiendo a movimientos..."
  };

  Object.keys(mensajes).forEach(id => {
    const enlace = document.getElementById(id);
    if (enlace) {
      enlace.addEventListener("click", e => {
        e.preventDefault();
        if (mensaje) {
          mensaje.textContent = mensajes[id];
        }
        setTimeout(() => {
          window.location.href = enlace.href;
        }, 1500);
      });
    }
  });
});
