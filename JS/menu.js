const transacciones = [
  { tipo: "Depósito", monto: 20000, fecha: "12/01/2026" },
  { tipo: "Envío", monto: 5000, fecha: "12/01/2026" },
  { tipo: "Depósito", monto: 20000, fecha: "11/01/2026" },
  { tipo: "Envío", monto: 5000, fecha: "11/01/2026" },
  { tipo: "Depósito", monto: 20000, fecha: "10/01/2026" }
];

const ultimas = transacciones.slice(0, 3); // solo las 3 primeras
const lista = document.getElementById("ultimasTransacciones");

ultimas.forEach(t => {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `${t.tipo} $${t.monto.toLocaleString()} 
    <small class="text-muted d-block">${t.fecha}</small>`;
  lista.appendChild(li);
});
