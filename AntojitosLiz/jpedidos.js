document.addEventListener('DOMContentLoaded', function() {
    const listaPedidos = document.getElementById('lista-pedidos');
    const guardarPedidoBtn = document.getElementById('guardar-pedido');
    const borrarPedidoBtn = document.getElementById('borrar-pedido');

    // Obtener pedidos y tiempo del almacenamiento local
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    let tiempoInicio = parseInt(localStorage.getItem('tiempoInicio')) || 0;
    let intervalo;

    // Mostrar los pedidos en la lista
    function mostrarPedidos() {
        listaPedidos.innerHTML = '';
        if (pedidos && pedidos.length > 0) {
            pedidos.forEach(pedido => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = pedido.nombre;
                listaPedidos.appendChild(li);
            });
            // Mostrar el temporizador solo si hay pedidos
            mostrarTemporizador();
        } else {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = 'No hay pedidos anteriores.';
            listaPedidos.appendChild(li);
            reiniciarTemporizador(); // Reiniciar el temporizador si no hay pedidos
        }
    }

    mostrarPedidos();

    // Mostrar el temporizador
    function mostrarTemporizador() {
        if (tiempoInicio !== 0) {
            const tiempoRestanteInicial = tiempoInicio + (60 * 60 * 1000) - Date.now();
            if (tiempoRestanteInicial > 0) {
                actualizarTemporizador();
                intervalo = setInterval(actualizarTemporizador, 1000);
            } else {
                reiniciarTemporizador();
            }
        }
    }

    // Actualizar el temporizador
    function actualizarTemporizador() {
        const tiempoRestante = tiempoInicio + (60 * 60 * 1000) - Date.now();

        if (tiempoRestante > 0) {
            const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
            const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

            const tiempoMostrado = `${horas}h ${minutos}m ${segundos}s`;

            const mensaje = `Su pedido estará listo en ${tiempoMostrado}.`;
            document.getElementById('tiempo-restante').textContent = mensaje;
        } else {
            reiniciarTemporizador();
        }
    }

    // Reiniciar el temporizador
    function reiniciarTemporizador() {
        clearInterval(intervalo);
        tiempoInicio = 0;
        localStorage.removeItem('tiempoInicio');
        document.getElementById('tiempo-restante').textContent = '';
    }

    // Guardar pedido en el almacenamiento local
    guardarPedidoBtn.addEventListener('click', function() {
        tiempoInicio = Date.now();
        localStorage.setItem('tiempoInicio', tiempoInicio.toString());
        mostrarPedidos();
        clearInterval(intervalo);
        intervalo = setInterval(actualizarTemporizador, 1000);
    });

    // Borrar pedido del almacenamiento local
    borrarPedidoBtn.addEventListener('click', function() {
        pedidos = [];
        localStorage.removeItem('pedidos');
        reiniciarTemporizador();
        mostrarPedidos();
    });
});
