document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000);
  }
  const saldoActual = Number(localStorage.getItem("saldo"));
  document.getElementById("saldo").textContent = `Saldo $${saldoActual.toLocaleString()}`;

  // Obtener transacciones
  const transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];
  const lista = document.getElementById("listaTransacciones");

  // Función para mostrar transacciones con filtro
  function mostrarTransacciones(filtro = "todos") {
    lista.innerHTML = "";

    const filtradas = filtro === "todos"
      ? transacciones
      : transacciones.filter(t => t.tipo.toLowerCase().includes(filtro.toLowerCase()));

    if (filtradas.length === 0) {
      const li = document.createElement("li");
      li.className = "list-group-item text-muted";
      li.textContent = "No hay transacciones registradas.";
      lista.appendChild(li);
      return;
    }

    filtradas.forEach(t => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${t.tipo} $${t.monto.toLocaleString()}</span>
        <small class="text-muted">${t.fecha}${t.destinatario ? " → " + t.destinatario : ""}</small>
      `;
      lista.appendChild(li);
    });
  }

  // Mostrar todas al inicio
  mostrarTransacciones();

  // Crear filtro dinámico
  const filtroContainer = document.createElement("div");
  filtroContainer.className = "mb-3";
  filtroContainer.innerHTML = `
    <label for="filtro" class="form-label">Filtrar por tipo:</label>
    <select id="filtro" class="form-select">
      <option value="todos">Todos</option>
      <option value="Depósito">Depósitos</option>
      <option value="Envío">Envíos</option>
    </select>
  `;
  lista.parentElement.insertBefore(filtroContainer, lista);

  // Evento de cambio en el filtro
  document.getElementById("filtro").addEventListener("change", e => {
    mostrarTransacciones(e.target.value);
  });

  // Eventos de los enlaces del menú
  const mensaje = document.getElementById("mensaje");
  const mensajes = {
    linkDepositar: "Redirigiendo a depositar...",
    linkEnviar: "Redirigiendo a enviar dinero...",
    linkInicio: "Redirigiendo al inicio..."
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
