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
    const contenedor = document.getElementById("alert-container");
    if (contenedor) {
      contenedor.innerHTML = alerta;
      setTimeout(() => {
        const alertaEl = contenedor.querySelector(".alert");
        if (alertaEl) alertaEl.remove();
      }, 2000);
    } else {
      // fallback si no existe el contenedor
      alert(texto);
    }
  }

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
