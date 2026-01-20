document.addEventListener("DOMContentLoaded", () => {
  // Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 60000);
  }

  // Mostrar saldo actual
  let saldo = parseInt(localStorage.getItem("saldo"));
  document.querySelector(".monto").textContent = `Saldo $${saldo.toLocaleString()}`;

  // Función para mostrar alertas Bootstrap
  function mostrarAlerta(texto, tipo) {
    const alerta = `
      <div class="alert alert-${tipo} mt-3" role="alert">
        ${texto}
      </div>`;
    document.getElementById("alert-container").innerHTML = alerta;
    setTimeout(() => {
      const alertaEl = document.querySelector(".alert");
      if (alertaEl) alertaEl.remove();
    }, 2000);
  }

  // Función para cargar contactos desde localStorage
  function cargarContactos() {
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    const lista = document.getElementById("listaContactos");
    lista.innerHTML = "";

    if (contactos.length === 0) {
      lista.innerHTML = `<li class="list-group-item text-muted">No hay contactos guardados.</li>`;
      return;
    }

    contactos.forEach(c => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <strong>${c.nombre}</strong><br>
          <small>CBU/Alias: ${c.cbu}, Banco: ${c.banco}</small>
        </div>
        <button class="btn btn-outline-success btn-sm seleccionar">Seleccionar</button>
      `;
      lista.appendChild(li);
    });

    // Evento seleccionar contacto
    document.querySelectorAll(".seleccionar").forEach(btn => {
      btn.addEventListener("click", () => {
        const nombre = btn.parentElement.querySelector("strong").textContent;
        document.getElementById("destinatario").value = nombre;
      });
    });
  }

  cargarContactos();

  // Buscar contacto
  const buscarInput = document.getElementById("buscarContacto");
  if (buscarInput) {
    buscarInput.addEventListener("input", () => {
      const filtro = buscarInput.value.toLowerCase();
      document.querySelectorAll("#listaContactos li").forEach(li => {
        const nombre = li.querySelector("strong")?.textContent.toLowerCase() || "";
        li.style.display = nombre.includes(filtro) ? "" : "none";
      });
    });
  }

  // Mostrar/ocultar formulario nuevo contacto
  const btnNuevo = document.getElementById("btnNuevoContacto");
  const btnCancelar = document.getElementById("btnCancelarContacto");
  const formNuevo = document.getElementById("formNuevoContacto");

  if (btnNuevo && formNuevo) {
    btnNuevo.addEventListener("click", () => formNuevo.style.display = "block");
  }
  if (btnCancelar && formNuevo) {
    btnCancelar.addEventListener("click", () => formNuevo.style.display = "none");
  }

  // Guardar nuevo contacto
  if (formNuevo) {
    formNuevo.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = document.getElementById("nombreContacto").value.trim();
      const cbu = document.getElementById("cbuContacto").value.trim();
      const banco = document.getElementById("bancoContacto").value.trim();

      if (!nombre || !cbu || !banco) {
        mostrarAlerta("Completa todos los campos", "danger");
        return;
      }

      const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
      contactos.push({ nombre, cbu, banco });
      localStorage.setItem("contactos", JSON.stringify(contactos));

      mostrarAlerta("Contacto agregado con éxito", "success");
      formNuevo.reset();
      formNuevo.style.display = "none";
      cargarContactos();
    });
  }

  // Enviar dinero → actualizar saldo y transacciones
  const form = document.getElementById("sendMoneyForm");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const destinatario = document.getElementById("destinatario").value.trim();
    const monto = parseInt(document.getElementById("monto").value);

    if (!destinatario) {
      mostrarAlerta("Selecciona un contacto antes de enviar dinero.", "danger");
      return;
    }
    if (isNaN(monto) || monto <= 0) {
      mostrarAlerta("Ingrese un monto válido mayor a 0.", "danger");
      return;
    }
    if (monto > saldo) {
      mostrarAlerta("Saldo insuficiente.", "danger");
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

    // Mensaje de éxito
    mostrarAlerta(`Has enviado $${monto.toLocaleString()} a ${destinatario}`, "success");

    // Redirigir al menú después de 2 segundos
    setTimeout(() => {
      window.location.href = "../HTML/menu.html";
    }, 2000);
  });

  // Eventos de los enlaces del menú
  const mensaje = document.getElementById("mensaje");
  const mensajes = {
    linkDepositar: "Redirigiendo a depositar...",
    linkInicio: "Redirigiendo al inicio...",
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
