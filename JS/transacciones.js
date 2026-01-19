document.addEventListener("DOMContentLoaded", () => {
  // Mostrar saldo actual
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000);
  }
  const saldoActual = Number(localStorage.getItem("saldo"));
  document.getElementById("saldo").textContent = `Saldo $${saldoActual.toLocaleString()}`;

  // Mostrar todas las transacciones
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  const lista = document.getElementById("listaTransacciones");
  lista.innerHTML = "";

  if (transacciones.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-muted";
    li.textContent = "No hay transacciones registradas.";
    lista.appendChild(li);
  } else {
    transacciones.forEach(t => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${t.tipo} $${t.monto.toLocaleString()}</span>
        <small class="text-muted">${t.fecha}${t.destinatario ? " → " + t.destinatario : ""}</small>
      `;
      lista.appendChild(li);
    });
  }
});
