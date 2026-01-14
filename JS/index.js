$(function () {
  const USUARIO_VALIDO = "admin@correo.com";
  const CLAVE_VALIDA = "1234";

  $('#loginForm').on('submit', function (event) {
    event.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if (email === USUARIO_VALIDO && password === CLAVE_VALIDA) {
      // Ocultamos el error si estaba visible
      $('#loginError').addClass('d-none');
      window.location.href = "menu.html";
    } else {
      // Mostramos el mensaje de error
      $('#loginError').removeClass('d-none');
    }
  });
});

