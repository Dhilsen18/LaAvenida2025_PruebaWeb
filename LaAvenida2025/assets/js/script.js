// Menú hamburguesa universal y navegación activa
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }
}
setupHamburgerMenu();

// Marcar enlace activo según la página
function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a');
  const path = window.location.pathname;
  links.forEach(link => {
    link.classList.remove('active');
    if (
      (path.endsWith('index.html') && link.getAttribute('href').includes('index.html')) ||
      (path.endsWith('menu.html') && link.getAttribute('href').includes('menu.html')) ||
      (path.endsWith('nosotros.html') && link.getAttribute('href').includes('nosotros.html')) ||
      (path.endsWith('blog.html') && link.getAttribute('href').includes('blog.html')) ||
      (path.endsWith('contacto.html') && link.getAttribute('href').includes('contacto.html'))
    ) {
      link.classList.add('active');
    }
  });
}
setActiveNavLink();

// Animación hamburguesa
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  const hamburgerSpans = hamburger.querySelectorAll('span');
  const observer = new MutationObserver(() => {
    if (hamburger.classList.contains('open')) {
      hamburgerSpans[0].style.transform = 'rotate(45deg) translateY(8px)';
      hamburgerSpans[1].style.opacity = '0';
      hamburgerSpans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
      hamburgerSpans[0].style.transform = '';
      hamburgerSpans[1].style.opacity = '';
      hamburgerSpans[2].style.transform = '';
    }
  });
  observer.observe(hamburger, { attributes: true });
}

// Validación simple de formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
    contactForm.reset();
  });
}

// Tabs funcionales para Menú Destacado
const menuTabs = document.querySelectorAll('.menu-tab');
const productsTabs = document.querySelectorAll('.products-tab');
let sliderState = { destacados: 0, recientes: 0, vendidos: 0 };
const sliderSizes = { destacados: 4, recientes: 4, vendidos: 3 };

function updateSlider(tabName) {
  productsTabs.forEach(ptab => {
    ptab.classList.remove('active');
  });
  const currentTab = document.querySelector('.productos-' + tabName);
  currentTab.classList.add('active');
  const track = currentTab.querySelector('.slider-track');
  const cards = track.querySelectorAll('.product-card');
  const size = sliderSizes[tabName];
  let start = sliderState[tabName];
  if (start > cards.length - size) start = Math.max(0, cards.length - size);
  sliderState[tabName] = start;
  // Ocultar los que no van y calcular desplazamiento
  cards.forEach((card, i) => {
    card.classList.remove('slider-hidden');
    if (i < start || i >= start + size) {
      card.classList.add('slider-hidden');
    }
  });
  // Desplazamiento animado
  const cardWidth = cards[0] ? cards[0].offsetWidth + 32 : 0; // 32px gap aprox
  track.style.transform = `translateX(-${start * cardWidth}px)`;
}

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const tabName = tab.getAttribute('data-tab');
    sliderState[tabName] = 0;
    updateSlider(tabName);
  });
});

// Slider arrows
const sliderArrows = document.querySelectorAll('.slider-arrow');
sliderArrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    const activeTab = document.querySelector('.menu-tab.active').getAttribute('data-tab');
    const cards = document.querySelectorAll('.productos-' + activeTab + ' .product-card');
    const size = sliderSizes[activeTab];
    let start = sliderState[activeTab];
    if (arrow.classList.contains('left')) {
      start = Math.max(0, start - 1);
    } else {
      start = Math.min(cards.length - size, start + 1);
    }
    sliderState[activeTab] = start;
    updateSlider(activeTab);
  });
});

// Inicializar slider al cargar
updateSlider('destacados');

// Selección de tarjeta de producto en el slider
const sliderTracks = document.querySelectorAll('.slider-track');
sliderTracks.forEach(track => {
  track.addEventListener('click', function(e) {
    let card = e.target.closest('.product-card');
    if (!card) return;
    // Remover selección previa
    track.querySelectorAll('.product-card.selected').forEach(sel => sel.classList.remove('selected'));
    // Seleccionar la actual
    card.classList.add('selected');
  });
});

// Estrellas clickeables para calificar
function setupStars() {
  document.querySelectorAll('.stars').forEach(starsDiv => {
    const stars = starsDiv.querySelectorAll('.star');
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.value);
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < val);
        });
      });
      star.addEventListener('mouseleave', () => {
        const rating = parseInt(starsDiv.dataset.rating) || 0;
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < rating);
        });
      });
      star.addEventListener('click', () => {
        const val = parseInt(star.dataset.value);
        starsDiv.dataset.rating = val;
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < val);
        });
      });
    });
    // Inicializar
    const rating = parseInt(starsDiv.dataset.rating) || 0;
    stars.forEach((s, i) => {
      s.classList.toggle('selected', i < rating);
    });
  });
}
setupStars();

// Icono corazón (favorito)
document.querySelectorAll('.icon-heart').forEach(btn => {
  btn.addEventListener('click', function() {
    btn.classList.toggle('active');
  });
});
// Icono ojo (ver detalles)
document.querySelectorAll('.icon-eye').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = btn.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    alert('Detalles de ' + name + ':\n' + card.querySelector('p').textContent);
  });
});
// Icono comparar
document.querySelectorAll('.icon-compare').forEach(btn => {
  btn.addEventListener('click', function() {
    btn.classList.toggle('active');
    alert('Producto añadido a comparación. (Funcionalidad demo)');
  });
});
// Reaplicar estrellas al cambiar de tab/slider
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => setTimeout(setupStars, 100));
}); 