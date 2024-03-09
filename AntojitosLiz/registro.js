document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const contraseña = document.getElementById('contraseña').value;

        // Validación de campos
        if (nombre === '' || email === '' || contraseña === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Aquí puedes enviar los datos del formulario a tu backend para registrar al usuario
        console.log('Nombre:', nombre);
        console.log('Email:', email);
        console.log('Contraseña:', contraseña);

        // Limpia el formulario después de enviar
        form.reset();
    });
});
