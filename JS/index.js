$(function () {
  const USUARIOS = [
    { email: "admin@correo.com", clave: "1234" },
    { email: "usuario@correo.com", clave: "abcd" }
  ];

  // Al cargar la página, rellenar email si está guardado
  const emailGuardado = localStorage.getItem("emailGuardado");
  if (emailGuardado) {
    $('#email').val(emailGuardado);
    $('#recuerdame').prop('checked', true);
  }

  $('#loginForm').on('submit', function (event) {
    event.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    // Buscar usuario válido en el array
    const usuarioValido = USUARIOS.find(u => u.email === email && u.clave === password);

    if (usuarioValido) {
      $('#loginError').addClass('d-none');

      // Guardar email si se marcó "Recuérdame"
      if ($('#recuerdame').is(':checked')) {
        localStorage.setItem("emailGuardado", email);
      } else {
        localStorage.removeItem("emailGuardado");
      }

      window.location.href = "menu.html";
    } else {
      $('#loginError').removeClass('d-none');
    }
  });
});

