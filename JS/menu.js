document.addEventListener("DOMContentLoaded", () => {
  // Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000);
  }

  // Mostrar saldo actual
  const saldoActual = Number(localStorage.getItem("saldo"));
  document.getElementById("saldo").textContent = `Saldo $${saldoActual.toLocaleString()}`;

  // Mostrar últimas transacciones
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  const ultimas = transacciones.slice(0, 3);
  const lista = document.getElementById("ultimasTransacciones");
  lista.innerHTML = "";

  ultimas.forEach(t => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `${t.tipo} $${t.monto.toLocaleString()} 
      <small class="text-muted d-block">${t.fecha}</small>`;
    lista.appendChild(li);
  });
});
