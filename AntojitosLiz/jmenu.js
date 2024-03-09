document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById('menu');
    const platillosSeleccionados = document.getElementById('platillos-seleccionados');
    const limpiarUltimoBtn = document.getElementById('borrar-ultimo');
    const limpiarTodoBtn = document.getElementById('limpiar-todo');
    const crearPedidoBtn = document.getElementById('crear-pedido');
    const mensajePedido = document.getElementById('mensaje-pedido');
    const irAPedidosBtn = document.getElementById('ir-a-pedidos'); // Nuevo: Botón para ir a la página de pedidos

    // Array de platillos con sus detalles
    const platillos = [
        { nombre: 'Orden de Enchiladas', descripcion: '5 Enchiladas con queso, cebolla, crema y complementadas con un bistek.', imagen: 'imgs/m1.jpg' },
        { nombre: 'Orden de Tostadas', descripcion: '5 Tostadas complementadas con su respectivo pollo, col, aguacate, queso y crema.', imagen: 'imgs/m2.jpg' },
        { nombre: 'Mole de Totol', descripcion: 'Pieza de mole de totol, racionada con arroz.', imagen: 'imgs/m3.jpg' },
        { nombre: 'Ensalada', descripcion: 'Una porcion de ensalada racionada con carne y verduras al vapor.', imagen: 'imgs/m4.jpg' },
        { nombre: 'Orden de Gorditas', descripcion: '5 Gorditas de Chicharon complementadas con col, queso y crema.', imagen: 'imgs/m5.jpg' },
        { nombre: 'Orden de Tacos', descripcion: '5 Tacos al Pastor donde se puede servir al gusto su respectiva verdura y con sus respectivas salsas.', imagen: 'imgs/m6.jpg' },
        { nombre: 'Orden de Enfrijoladas', descripcion: '5 Enfrijoladasenvueltas en hoja de platano con queso, crema y con sus respectivas salsas.', imagen: 'imgs/m7.jpg' },
        { nombre: 'Platillo de Camarones', descripcion: 'Platillo de 10 camarones al mojo de ajo, con su respectivo arroz y ensalada.', imagen: 'imgs/m8.jpg' },
        { nombre: 'Tamal de Elote', descripcion: 'Tamal de elote de costilla de puerco.', imagen: 'imgs/m9.jpg' },
        // Agrega más platillos aquí según sea necesario
    ];

    // Generar cartas de platillos
    platillos.forEach((platillo, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4');

        const cardHTML = `
            <div class="card">
                <img src="${platillo.imagen}" class="card-img-top" alt="${platillo.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${platillo.nombre}</h5>
                    <p class="card-text">${platillo.descripcion}</p>
                    <button class="btn btn-primary agregar-platillo" data-index="${index}">Agregar</button>
                </div>
            </div>
        `;
        card.innerHTML = cardHTML;

        menu.appendChild(card);
    });

    // Evento para agregar platillos seleccionados a la lista
    menu.addEventListener('click', function(event) {
        if (event.target.classList.contains('agregar-platillo')) {
            const index = event.target.getAttribute('data-index');
            const platillo = platillos[index];
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = platillo.nombre;
            platillosSeleccionados.appendChild(li);
        }
    });

    // Evento para borrar el último platillo seleccionado
    limpiarUltimoBtn.addEventListener('click', function() {
        const ultimoPlatillo = platillosSeleccionados.lastElementChild;
        if (ultimoPlatillo) {
            platillosSeleccionados.removeChild(ultimoPlatillo);
        }
    });

    // Evento para limpiar todos los platillos seleccionados
    limpiarTodoBtn.addEventListener('click', function() {
        platillosSeleccionados.innerHTML = '';
    });

    // Evento para crear el pedido y redirigir a la página de pedidos
    crearPedidoBtn.addEventListener('click', function() {
        const pedidos = [];
        platillosSeleccionados.querySelectorAll('li').forEach(li => {
            const nombre = li.textContent;
            const platillo = platillos.find(p => p.nombre === nombre);
            if (platillo) {
                pedidos.push(platillo);
            }
        });

        // Almacenar los pedidos en el almacenamiento local
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        // Redirigir a la página de pedidos
        window.location.href = 'pedidos.html';
    });
});
