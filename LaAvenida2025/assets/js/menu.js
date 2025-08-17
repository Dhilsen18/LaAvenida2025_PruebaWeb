// Datos reales de categorías y productos (imágenes de prueba en assets/images/)
const productosPorCategoria = {
  desayunos: [
    { nombre: 'Waffles con Frutas', descripcion: 'Waffles servidos con fresas, plátano y arándanos. Acompañado con miel de maple.', precio: '18', imagen: 'assets/images/waffles.jpg' },
    { nombre: 'Tostadas Francesas', descripcion: 'Pan brioche, huevo, leche, canela, vainilla, miel de maple, frutas y azúcar glas.', precio: '21', imagen: 'assets/images/tostadas.jpg' },
    { nombre: 'Omelette de la Casa', descripcion: 'Huevos, jamón, queso, tomate y cebolla.', precio: '16', imagen: 'assets/images/omelette.jpg' }
  ],
  cafebebidas: [
    { nombre: 'Espresso', descripcion: 'Café intenso y aromático.', precio: '7', imagen: 'assets/images/espresso.jpg' },
    { nombre: 'Americano', descripcion: 'Café suave y largo.', precio: '8', imagen: 'assets/images/americano.jpg' },
    { nombre: 'Capuccino', descripcion: 'Espuma cremosa y sabor intenso.', precio: '9', imagen: 'assets/images/capuccino.jpg' }
  ],
  entradas: [
    { nombre: 'Tequeños', descripcion: 'Palitos de queso envueltos en masa y fritos.', precio: '15', imagen: 'assets/images/tequenos.jpg' },
    { nombre: 'Bruschettas', descripcion: 'Pan tostado con tomate, ajo y albahaca.', precio: '14', imagen: 'assets/images/bruschettas.jpg' }
  ],
  platos: [
    { nombre: 'Arroz Chaufa de Pollo', descripcion: 'Arroz chaufa con pollo y verduras.', precio: '20', imagen: 'assets/images/chaufa.jpg' },
    { nombre: 'Milanesa de Pollo', descripcion: 'Milanesa de pollo crocante.', precio: '24', imagen: 'assets/images/milanesa.jpg' },
    { nombre: 'Spaghetti a la Bolognesa', descripcion: 'Spaghetti con salsa bolognesa.', precio: '25', imagen: 'assets/images/spaghetti.jpg' }
  ],
  sandwiches: [
    { nombre: 'Triple de Pollo', descripcion: 'Pan molde con pollo deshilachado, jamón y queso edam.', precio: '10', imagen: 'assets/images/triple.jpg' },
    { nombre: 'Ciabatta de Pollo', descripcion: 'Pollo deshilachado, tomate, lechuga y mayonesa.', precio: '15', imagen: 'assets/images/ciabatta.jpg' },
    { nombre: 'Croissant Olivar', descripcion: 'Pollo deshilachado con palta y mayonesa de orégano.', precio: '15', imagen: 'assets/images/croissant.jpg' }
  ],
  piqueos: [
    { nombre: 'Papas Fritas', descripcion: 'Papas fritas crocantes.', precio: '10', imagen: 'assets/images/papas.jpg' },
    { nombre: 'Alitas BBQ', descripcion: 'Alitas de pollo en salsa BBQ.', precio: '18', imagen: 'assets/images/alitas.jpg' }
  ],
  postres: [
    { nombre: 'Cheesecake', descripcion: 'Tarta de queso con salsa de frutos rojos.', precio: '14', imagen: 'assets/images/cheesecake.jpg' },
    { nombre: 'Brownie', descripcion: 'Brownie de chocolate con helado.', precio: '13', imagen: 'assets/images/brownie.jpg' }
  ],
  bebidas: [
    { nombre: 'Jugo de Fruta', descripcion: 'Papaya, piña o naranja.', precio: '8.5', imagen: 'assets/images/jugo.jpg' },
    { nombre: 'Limonada', descripcion: 'Limonada vaso o jarra.', precio: '8', imagen: 'assets/images/limonada.jpg' },
    { nombre: 'Frappe Oreo', descripcion: 'Frappe de Oreo.', precio: '12', imagen: 'assets/images/frappe.jpg' }
  ],
  bar: [
    { nombre: 'Pisco Sour', descripcion: 'Cóctel clásico peruano.', precio: '18', imagen: 'assets/images/pisco.jpg' },
    { nombre: 'Cuba Libre', descripcion: 'Ron, cola y limón.', precio: '16', imagen: 'assets/images/cuba.jpg' }
  ]
};

function renderProductos(categoria) {
  const productos = productosPorCategoria[categoria] || [];
  const cont = document.getElementById('productos-lista');
  cont.innerHTML = productos.map(prod => `
    <div class="producto-item">
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="producto-info">
        <h3>${prod.nombre} <span class="producto-precio">S/ ${prod.precio}</span></h3>
        <p>${prod.descripcion}</p>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.categoria-item').forEach(item => {
  item.addEventListener('click', function() {
    document.querySelectorAll('.categoria-item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    renderProductos(this.dataset.categoria);
  });
});

// Mostrar la primera categoría por defecto
renderProductos('desayunos'); 