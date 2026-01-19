document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000);
  }

  const saldoActual = Number(localStorage.getItem("saldo"));
  document.getElementById("saldo").textContent = `Saldo $${saldoActual.toLocaleString()}`;

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

    let saldo = Number(localStorage.getItem("saldo"));
    saldo += monto;
    localStorage.setItem("saldo", saldo);
    document.getElementById("saldo").textContent = `Saldo $${saldo.toLocaleString()}`;

    const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
    const fecha = new Date().toLocaleDateString("es-ES");
    transacciones.unshift({ tipo: "Depósito", monto: monto, fecha: fecha });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    alert(`Depósito realizado: $${monto.toLocaleString()}`);
    form.reset();
    submitBtn.disabled = true; 
  });
});

