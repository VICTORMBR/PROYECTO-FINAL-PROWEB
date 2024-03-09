document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const contraseña = document.getElementById('contraseña').value;

        // Validación de campos
        if (email === '' || contraseña === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Aquí puedes enviar los datos del formulario a tu backend para iniciar sesión
        console.log('Email:', email);
        console.log('Contraseña:', contraseña);

        // Limpia el formulario después de enviar
        form.reset();
    });
});
