/* ══════════════════════════════════════════════════
   SINAMEC-Laser — JavaScript principal
   Navegación SPA + Galería con carrusel automático
══════════════════════════════════════════════════ */

const WHATSAPP = '525661381199';
const EMAIL    = 'laser@grupsinamec.com';

/* ── Helpers de contacto ── */
function openWhatsApp(msg) {
  const text = msg || '¡Hola! Me interesa cotizar una pieza artesanal con SINAMEC-Laser.';
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
}
function openEmail(subject, body) {
  const s = subject || 'Cotización — SINAMEC-Laser';
  const b = body   || 'Hola, me gustaría obtener más información sobre sus productos.';
  window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(s) + '&body=' + encodeURIComponent(b);
}

/* ── Navegación SPA ── */
const pages = ['inicio', 'servicios', 'portafolio', 'contacto'];
let currentPage = 'inicio';

function navigate(page) {
  if (!pages.includes(page)) return;
  currentPage = page;
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.toggle('active', p === page);
  });
  document.querySelectorAll('.nav-link-custom').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
  const toggler = document.querySelector('.navbar-collapse');
  if (toggler && toggler.classList.contains('show')) toggler.classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Reveal on scroll ── */
function setupReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting)
        e.target.style.cssText = 'opacity:1;transform:none;transition:opacity .55s ease,transform .55s ease;';
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-el').forEach(el => {
    el.style.cssText = 'opacity:0;transform:translateY(24px);';
    obs.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   DATOS DE PRODUCTOS
   ─────────────────────────────────────────────────
   Cada producto tiene:
     imgFolder → nombre de la subcarpeta dentro de images/
                 Ejemplo: 'letras-3d' → images/letras-3d/
     gallery   → array de slides, cada uno con:
       img   → nombre del archivo dentro de imgFolder
                Ejemplo: 'foto1.jpg' → images/letras-3d/foto1.jpg
       emoji → se muestra si la imagen no carga (fallback)
       label → título del slide (aparece sobre la imagen)
       sub   → subtítulo / descripción corta del slide
       bg    → fondo de color para cuando no hay imagen

   CÓMO AGREGAR TUS FOTOS:
     1. Crea la subcarpeta: images/letras-3d/
     2. Sube tus fotos con los nombres exactos de "img"
     3. ¡Listo! El carrusel las carga automáticamente.
══════════════════════════════════════════════════ */
const PRODUCTS = [
  {
    emoji: '🏠', title: 'Letras decorativas 3D',
    desc: 'Nombre de familia en MDF de 9mm con acabado natural. Ideal para sala, recámara o entrada del hogar. Tamaño personalizable.',
    cat: 'DECORACIÓN', catColor: '#C8853A', bg: 'linear-gradient(135deg,#F5E6D0,#E8C99A)',
    mat: 'mdf', matLabel: 'MDF 9mm',
    imgFolder: 'portafolio/Letrero',
    gallery: [
      { img: 'corte a lacer.png', emoji: '🏠', label: 'Vista frontal',       sub: 'Acabado natural MDF',      bg: 'linear-gradient(135deg,#F5E6D0,#E8C99A)' },
      { img: 'foto2.jpg', emoji: '🎨', label: 'Versión pintada',     sub: 'Pintura blanca mate',      bg: 'linear-gradient(135deg,#FDF0E0,#F5D5A0)' },
      { img: 'foto3.jpg', emoji: '🌑', label: 'Acabado oscuro',      sub: 'Stain café intenso',       bg: 'linear-gradient(135deg,#2D1B0E,#5C3317)'  },
      { img: 'foto4.jpg', emoji: '✨', label: 'Con iluminación LED', sub: 'Retroiluminado cálido',   bg: 'linear-gradient(135deg,#F9E4C8,#E8A85A)'  },
      { img: 'foto5.jpg', emoji: '📐', label: 'Detalle de calado',   sub: 'Precisión láser ±0.5mm',  bg: 'linear-gradient(135deg,#E8D5C0,#C8A07A)'  },
    ]
  },
  {
    emoji: '', title: 'Letrero de negocio en MDF',
    desc: 'Logo y nombre del negocio en MDF 3mm. Acabado profesional.',
    cat: 'NEGOCIO', catColor: '#c8853a', bg: 'linear-gradient(135deg,#E0F2FE,#BAE6FD)',
    mat: 'acrylic', matLabel: 'MDF 9mm',
    imgFolder: 'portafolio/Letrero',
    gallery: [
      { img: 'LASER.png', emoji: '💎', label: 'Acrílico espejo dorado', sub: '3mm · Acabado brillante', bg: 'linear-gradient(135deg,#E0F2FE,#BAE6FD)' },
      { img: 'foto2.jpg', emoji: '⬜', label: 'Acrílico blanco',        sub: '3mm · Mate',              bg: 'linear-gradient(135deg,#F0F0F0,#D4D4D4)' },
      { img: 'foto3.jpg', emoji: '⬛', label: 'Acrílico negro',         sub: '3mm · Grabado blanco',    bg: 'linear-gradient(135deg,#1A1A2E,#16213E)'  },
      { img: 'foto4.jpg', emoji: '🌟', label: 'Con luz de fondo',      sub: 'LED integrado',           bg: 'linear-gradient(135deg,#FFF9E6,#FDE68A)'  },
      { img: 'foto5.jpg', emoji: '🔤', label: 'Letras sueltas 3D',     sub: 'Cada letra por separado', bg: 'linear-gradient(135deg,#F0F9FF,#DBEAFE)'  },
    ]
  },
  {
    emoji: '💍', title: 'Detalles de boda personalizados',
    desc: 'Llaveros y separadores o Centro de mesa con  nombres En MDF . Pedidos desde 10 piezas.',
    cat: 'REGALO', catColor: '#6D28D9', bg: 'linear-gradient(135deg,#F5F0FF,#DDD6FE)',
    mat: 'both', matLabel: 'MDF / Acrílico',
    imgFolder: 'portafolio/llavero/sinamec',
    gallery: [
      { img: 'foto1.jpg', emoji: '💍', label: 'Llavero de boda MDF',  sub: 'Nombres y fecha grabados', bg: 'linear-gradient(135deg,#F5F0FF,#DDD6FE)' },
      { img: 'foto2.jpg', emoji: '💌', label: 'Separadores de lugar', sub: 'Acrílico rosa 3mm',        bg: 'linear-gradient(135deg,#FDF4F0,#FBD5D5)' },
      { img: 'foto3.jpg', emoji: '🌿', label: 'Porta menú',           sub: 'MDF calado floral',        bg: 'linear-gradient(135deg,#F0FDF4,#BBF7D0)' },
      { img: 'foto4.jpg', emoji: '🪷', label: 'Centro de mesa',       sub: 'MDF pintado + flores',     bg: 'linear-gradient(135deg,#FFFBEB,#FDE68A)' },
      { img: 'foto5.jpg', emoji: '🎀', label: 'Cajita de regalo',     sub: 'MDF armable personalizada',bg: 'linear-gradient(135deg,#EFF6FF,#BFDBFE)' },
    ]
  },
  {
    emoji: '🌸', title: 'Mandala calado decorativo',
    desc: 'Mandala floral calado en MDF de 5.5mm, listo para pintar o dejar natural. Diámetros de 30cm a 80cm.',
    cat: 'DECORACIÓN', catColor: '#C8853A', bg: 'linear-gradient(135deg,#FDF4E7,#F5D5A0)',
    mat: 'mdf', matLabel: 'MDF 5.5mm',
    imgFolder: 'mandala',
    gallery: [
      { img: 'foto1.jpg', emoji: '🌸', label: 'Natural sin pintar',   sub: 'MDF crudo 5.5mm · ø50cm', bg: 'linear-gradient(135deg,#FDF4E7,#F5D5A0)' },
      { img: 'foto2.jpg', emoji: '🌺', label: 'Pintado en rosa',      sub: 'Pintura acrílica mate',    bg: 'linear-gradient(135deg,#FFF0F3,#FFD6E0)' },
      { img: 'foto3.jpg', emoji: '🌙', label: 'En fondo oscuro',      sub: 'Efecto boho chic',         bg: 'linear-gradient(135deg,#1A1A2E,#3D1A3D)'  },
      { img: 'foto4.jpg', emoji: '🌿', label: 'Pintado en menta',     sub: 'Estilo nórdico',           bg: 'linear-gradient(135deg,#F0FDF4,#D1FAE5)'  },
      { img: 'foto5.jpg', emoji: '📏', label: 'Detalle de precisión', sub: 'Calado a ±0.5mm',          bg: 'linear-gradient(135deg,#FDF4E7,#E8C99A)'  },
    ]
  },
  {
    emoji: '', title: 'Llaveros personalizados',
    desc: 'Llaveros en acrílico de colores o MDF, iniciales o diseño libre. Grabado permanente. Pedidos individuales o por mayoreo.',
    cat: 'ACCESORIOS', catColor: '#914aee', bg: 'linear-gradient(135deg,#F0F9FF,#BAE6FD)',
    mat: 'acrylic', matLabel: 'Acrílico 3mm/ MDF 3mm',
    imgFolder: 'portafolio/llavero',
    gallery: [
      { img: 'sinamec.jpeg' , emoji: '🗝️', label: 'DIseño',          sub: 'Con logo grabado',     bg: 'linear-gradient(135deg,#FFF0F3,#FFD6E0)' },
      { img: 'sinamec2.jpeg', emoji: '💙', label: 'MDF 3MM',    sub: 'Resultado',bg: 'linear-gradient(135deg,#E0F2FE,#BAE6FD)' },
      { img: 'foto3.jpg'    , emoji: '💚', label: 'Acrílico verde',         sub: 'Con coordenadas GPS',    bg: 'linear-gradient(135deg,#F0FDF4,#BBF7D0)' },
      { img: 'foto4.jpg'    , emoji: '⭐', label: 'Acrílico transparente',  sub: 'Letras de colores',      bg: 'linear-gradient(135deg,#FFFBEB,#FDE68A)' },
      { img: 'foto5.jpg'    , emoji: '🖤', label: 'Acrílico negro espejo',  sub: 'Grabado dorado',         bg: 'linear-gradient(135deg,#1A1A2E,#16213E)'  },
    ]
  },
  {
    emoji: '🎄', title: 'Decoración navideña',
    desc: 'Adornos de árbol, figuras, esferas personalizadas y centros de mesa navideños en MDF. Diseños clásicos y modernos.',
    cat: 'TEMPORADA', catColor: '#059669', bg: 'linear-gradient(135deg,#ECFDF5,#A7F3D0)',
    mat: 'mdf', matLabel: 'MDF 3mm',
    imgFolder: 'navidad',
    gallery: [
      { img: 'foto1.jpg', emoji: '🎄', label: 'Adornos de árbol',        sub: 'MDF 3mm · Diseños navideños', bg: 'linear-gradient(135deg,#ECFDF5,#A7F3D0)' },
      { img: 'foto2.jpg', emoji: '⭐', label: 'Estrella personalizada',  sub: 'Nombre de la familia',        bg: 'linear-gradient(135deg,#FFF0F3,#FFD6E0)' },
      { img: 'foto3.jpg', emoji: '🦌', label: 'Figuras de reno',         sub: 'Set de 4 piezas · Natural',   bg: 'linear-gradient(135deg,#FFFBEB,#FDE68A)' },
      { img: 'foto4.jpg', emoji: '❄️', label: 'Copos de nieve calados',  sub: 'Acrílico blanco · 10cm',      bg: 'linear-gradient(135deg,#EFF6FF,#BFDBFE)' },
      { img: 'foto5.jpg', emoji: '🎁', label: 'Centro de mesa navideño', sub: 'MDF pintado + glitter',       bg: 'linear-gradient(135deg,#F5F0FF,#DDD6FE)' },
    ]
  },
  {
    emoji: '🌙', title: 'Lámpara calada decorativa',
    desc: 'Lámpara de mesa con diseño calado en MDF que proyecta patrones de luz. Incluye base y kit LED.',
    cat: 'DECORACIÓN', catColor: '#C8853A', bg: 'linear-gradient(135deg,#FDF4E7,#F5D5A0)',
    mat: 'mdf', matLabel: 'MDF 5.5mm',
    imgFolder: 'lampara',
    gallery: [
      { img: 'foto1.jpg', emoji: '🌙', label: 'Vista apagada',       sub: 'MDF natural · Geométrico',  bg: 'linear-gradient(135deg,#FDF4E7,#F5D5A0)' },
      { img: 'foto2.jpg', emoji: '✨', label: 'Encendida · Ambiente', sub: 'Luz LED cálida integrada', bg: 'linear-gradient(135deg,#1A1207,#3D2B0E)'  },
      { img: 'foto3.jpg', emoji: '🌿', label: 'Diseño floral',       sub: 'Calado botánico · 30cm',   bg: 'linear-gradient(135deg,#2D1B0E,#5C3317)'  },
      { img: 'foto4.jpg', emoji: '🔮', label: 'Diseño mandala',      sub: 'Proyección en paredes',     bg: 'linear-gradient(135deg,#0F0A1E,#1E1040)'  },
      { img: 'foto5.jpg', emoji: '📐', label: 'Diseño geométrico',   sub: 'Hexágonos · Estilo moderno',bg: 'linear-gradient(135deg,#F0F0E8,#D8D4C4)'  },
    ]
  },
  {
    emoji: '🏆', title: 'Trofeos y reconocimientos',
    desc: 'Placas y trofeos corporativos en acrílico con grabado de logo, nombre y texto. Elegantes y modernos.',
    cat: 'CORPORATIVO', catColor: '#6D28D9', bg: 'linear-gradient(135deg,#F5F0FF,#DDD6FE)',
    mat: 'acrylic', matLabel: 'Acrílico transparente',
    imgFolder: 'trofeos',
    gallery: [
      { img: 'foto1.jpg', emoji: '🏆', label: 'Trofeo corporativo',   sub: 'Acrílico transparente · Base MDF', bg: 'linear-gradient(135deg,#F5F0FF,#DDD6FE)' },
      { img: 'foto2.jpg', emoji: '🥇', label: 'Placa dorada',         sub: 'Acrílico espejo dorado',           bg: 'linear-gradient(135deg,#FFFBEB,#FDE68A)' },
      { img: 'foto3.jpg', emoji: '⭐', label: 'Reconocimiento',       sub: 'Acrílico blanco 5mm',              bg: 'linear-gradient(135deg,#F0F0F0,#D4D4D4)' },
      { img: 'foto4.jpg', emoji: '📜', label: 'Diploma enmarcado',    sub: 'Marco MDF + acrílico',             bg: 'linear-gradient(135deg,#EFF6FF,#BFDBFE)' },
      { img: 'foto5.jpg', emoji: '💫', label: 'Placa pared negra',    sub: 'Grabado en plateado',              bg: 'linear-gradient(135deg,#1A1A2E,#16213E)'  },
    ]
  },
  {
    emoji: '🎂', title: 'Toppers para pastel',
    desc: 'Decoraciones para pastel con nombre, edad o frase especial. Perfectos para cumpleaños, bodas y XV años.',
    cat: 'FIESTA', catColor: '#D97706', bg: 'linear-gradient(135deg,#FFFBEB,#FDE68A)',
    mat: 'both', matLabel: 'MDF 3mm / Acrílico',
    imgFolder: 'toppers',
    gallery: [
      { img: 'foto1.jpg', emoji: '🎂', label: 'Topper de cumpleaños', sub: 'Nombre + edad · MDF dorado', bg: 'linear-gradient(135deg,#FFFBEB,#FDE68A)' },
      { img: 'foto2.jpg', emoji: '👑', label: 'Topper XV años',       sub: 'Corona + nombre · Rosa',     bg: 'linear-gradient(135deg,#FFF0F3,#FFD6E0)' },
      { img: 'foto3.jpg', emoji: '💍', label: 'Topper de boda',       sub: 'Pareja + fecha · MDF blanco',bg: 'linear-gradient(135deg,#F5F0FF,#DDD6FE)' },
      { img: 'foto4.jpg', emoji: '🦋', label: 'Diseño mariposa',      sub: 'Acrílico holográfico',       bg: 'linear-gradient(135deg,#ECFDF5,#A7F3D0)' },
      { img: 'foto5.jpg', emoji: '⭐', label: 'Set completo',         sub: 'Topper + estrellas + letras',bg: 'linear-gradient(135deg,#EFF6FF,#BFDBFE)' },
    ]
  },
];

/* ══════════════════════════════════════════════════
   RENDER DE PRODUCTOS
══════════════════════════════════════════════════ */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map((p, i) => {
    const pillClass = p.mat === 'mdf' ? 'pill-mdf' : p.mat === 'acrylic' ? 'pill-acrylic' : 'pill-both';
    const firstSlide = p.gallery[0];
    const imgPath = 'images/' + p.imgFolder + '/' + firstSlide.img;
    return `
      <div class="col-md-6 col-lg-4">
        <div class="product-card h-100" onclick="openGallery(${i})">
          <div class="product-card-header" style="background:${p.bg}">
            <img
              src="${imgPath}"
              alt="${p.title}"
              style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;"
              onerror="this.style.display='none'"
            />
            <span style="position:relative;z-index:1">${p.emoji}</span>
            <span class="product-cat-tag" style="background:${p.catColor}">${p.cat}</span>
            <span class="product-photo-count"><i class="bi bi-images"></i> ${p.gallery.length} fotos</span>
          </div>
          <div class="product-card-body">
            <h5>${p.title}</h5>
            <p>${p.desc}</p>
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
              <span class="${pillClass}">${p.matLabel}</span>
              <button class="btn-gallery" onclick="event.stopPropagation();openGallery(${i})">
                <i class="bi bi-images"></i> Ver galería
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════
   CARRUSEL AUTOMÁTICO
══════════════════════════════════════════════════ */
const AUTO_INTERVAL_MS = 3500;  // tiempo entre slides (ms)
const AUTO_RESUME_MS   = 6000;  // pausa tras acción manual antes de reanudar (ms)

let autoTimer   = null;
let resumeTimer = null;

function startAutoPlay() {
  stopAutoPlay();
  autoTimer = setInterval(() => galNext(true), AUTO_INTERVAL_MS);
}

function stopAutoPlay() {
  clearInterval(autoTimer);
  autoTimer = null;
}

/* Cuando el usuario toca una flecha/thumbnail, pausa y luego reanuda */
function pauseThenResume() {
  stopAutoPlay();
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(startAutoPlay, AUTO_RESUME_MS);
}

/* ══════════════════════════════════════════════════
   GALERÍA / MODAL CON CARRUSEL
══════════════════════════════════════════════════ */
let galProdIdx  = 0;
let galSlideIdx = 0;
let galAnimating = false;

function openGallery(prodIdx) {
  galProdIdx   = prodIdx;
  galSlideIdx  = 0;
  galAnimating = false;
  renderGallery();
  document.getElementById('gallery-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startAutoPlay();
}

function closeGallery() {
  stopAutoPlay();
  clearTimeout(resumeTimer);
  document.getElementById('gallery-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

function renderGallery() {
  const prod  = PRODUCTS[galProdIdx];
  const pillClass = prod.mat === 'mdf' ? 'pill-mdf' : prod.mat === 'acrylic' ? 'pill-acrylic' : 'pill-both';

  document.getElementById('gal-cat').textContent      = prod.cat;
  document.getElementById('gal-cat').style.background = prod.catColor;
  document.getElementById('gal-title').textContent    = prod.title;
  document.getElementById('gal-pill').className       = pillClass;
  document.getElementById('gal-pill').textContent     = prod.matLabel;
  document.getElementById('gal-desc').textContent     = prod.desc;
  document.getElementById('gal-counter').textContent  = '1 / ' + prod.gallery.length;

  renderSlide(prod.gallery[0], null);
  renderThumbs();
  renderDots();
}

/* ── Construye la ruta de imagen de un slide ── */
function slideImgPath(prod, slide) {
  return 'images/' + prod.imgFolder + '/' + slide.img;
}

/* ── Renderiza un slide (con imagen real + fallback emoji) ── */
function renderSlide(slide, animClass) {
  const wrap = document.getElementById('gal-slide-wrap');
  wrap.querySelectorAll('.gallery-slide.anim').forEach(el => el.remove());

  const prod   = PRODUCTS[galProdIdx];
  const imgSrc = slideImgPath(prod, slide);

  const el = document.createElement('div');
  el.className = 'gallery-slide' + (animClass ? ' anim ' + animClass : '');
  el.style.background = slide.bg;
  el.style.overflow = 'hidden';

  el.innerHTML = `
    <img
      src="${imgSrc}"
      alt="${slide.label}"
      class="gallery-slide-img"
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
    />
    <div class="gallery-slide-fallback" style="display:none;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;position:absolute;inset:0;">
      <span class="gallery-slide-emoji">${slide.emoji}</span>
    </div>
    <div style="position:absolute;bottom:0;left:0;right:0;padding:10px 14px;background:linear-gradient(transparent,rgba(0,0,0,.55));text-align:center;">
      <div class="slide-label">${slide.label}</div>
      <div class="slide-sub mt-1">${slide.sub}</div>
    </div>`;

  wrap.appendChild(el);
}

/* ── Thumbnails ── */
function renderThumbs() {
  const prod = PRODUCTS[galProdIdx];
  document.getElementById('gal-thumbs').innerHTML = prod.gallery.map((s, i) => {
    const imgSrc = slideImgPath(prod, s);
    return `
      <button class="thumb-btn${i === galSlideIdx ? ' active' : ''}"
              style="background:${s.bg}"
              onclick="jumpToSlide(${i})">
        <img src="${imgSrc}" alt="${s.label}"
             style="width:100%;height:100%;object-fit:cover;border-radius:8px;"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
        <span class="thumb-emoji" style="display:none">${s.emoji}</span>
        <span class="thumb-label" style="position:absolute;bottom:2px;left:0;right:0;text-align:center">${s.label}</span>
      </button>`;
  }).join('');
}

/* ── Dots ── */
function renderDots() {
  const prod = PRODUCTS[galProdIdx];
  document.getElementById('gal-dots').innerHTML = prod.gallery.map((_, i) =>
    `<button class="dot${i === galSlideIdx ? ' active' : ''}" onclick="jumpToSlide(${i})"></button>`
  ).join('');
}

/* ── Actualiza counter, dots y thumbs sin re-renderizar ── */
function updateControls() {
  const prod = PRODUCTS[galProdIdx];
  document.getElementById('gal-counter').textContent = (galSlideIdx + 1) + ' / ' + prod.gallery.length;
  document.getElementById('gal-dots').querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === galSlideIdx));
  document.getElementById('gal-thumbs').querySelectorAll('.thumb-btn').forEach((b, i) =>
    b.classList.toggle('active', i === galSlideIdx));
}

/* ── Animación entre slides ── */
function animateToSlide(newIdx, dir) {
  if (galAnimating || newIdx === galSlideIdx) return;
  galAnimating = true;

  const prod     = PRODUCTS[galProdIdx];
  const newSlide = prod.gallery[newIdx];
  const inClass  = dir === 'next' ? 'slide-in-left'  : 'slide-in-right';
  const outClass = dir === 'next' ? 'slide-out-left' : 'slide-out-right';

  const wrap  = document.getElementById('gal-slide-wrap');
  const oldEl = wrap.querySelector('.gallery-slide:not(.anim)');
  if (oldEl) {
    oldEl.classList.add(outClass);
    oldEl.addEventListener('animationend', () => oldEl.remove(), { once: true });
  }

  renderSlide(newSlide, inClass);
  galSlideIdx = newIdx;
  updateControls();

  setTimeout(() => { galAnimating = false; }, 350);
}

/* ── Navegación ── */
/* El parámetro `auto` indica si es avance automático (no pausar) */
function galPrev(auto) {
  if (!auto) pauseThenResume();
  const total  = PRODUCTS[galProdIdx].gallery.length;
  const newIdx = galSlideIdx === 0 ? total - 1 : galSlideIdx - 1;
  animateToSlide(newIdx, 'prev');
}
function galNext(auto) {
  if (!auto) pauseThenResume();
  const total  = PRODUCTS[galProdIdx].gallery.length;
  const newIdx = galSlideIdx === total - 1 ? 0 : galSlideIdx + 1;
  animateToSlide(newIdx, 'next');
}
function jumpToSlide(i) {
  if (i === galSlideIdx) return;
  pauseThenResume();
  const dir = i > galSlideIdx ? 'next' : 'prev';
  animateToSlide(i, dir);
}

function quoteProduct() {
  const prod = PRODUCTS[galProdIdx];
  closeGallery();
  openWhatsApp('¡Hola! Me interesa cotizar: *' + prod.title + '* (' + prod.matLabel + '). ¿Me pueden dar información y precio?');
}

/* ══════════════════════════════════════════════════
   FORMULARIO DE CONTACTO
══════════════════════════════════════════════════ */
function handleContactForm(e) {
  e.preventDefault();
  const f    = e.target;
  const name = f.querySelector('#cname').value.trim();
  const co   = f.querySelector('#ccompany').value.trim();
  const mail = f.querySelector('#cemail').value.trim();
  const prod = f.querySelector('#cproduct').value;
  const msg  = f.querySelector('#cmessage').value.trim();
  const via  = f.querySelector('input[name="chan"]:checked').value;

  if (!name || !mail) {
    showFormAlert('Por favor completa tu nombre y correo.', 'danger');
    return;
  }
  const text = 'Nombre: ' + name + '\nEmpresa: ' + co + '\nCorreo: ' + mail + '\nProducto: ' + prod + '\n\n' + (msg || 'Quiero saber más sobre sus productos.');
  if (via === 'wa') openWhatsApp(text);
  else               openEmail('Cotización de ' + name + ' — SINAMEC-Laser', text);
  showFormAlert('¡Gracias! En breve nos ponemos en contacto.', 'success');
  f.reset();
}

function showFormAlert(msg, type) {
  let el = document.getElementById('form-alert');
  if (!el) {
    el = document.createElement('div');
    el.id = 'form-alert';
    document.getElementById('contact-form').appendChild(el);
  }
  el.className = 'alert alert-' + type + ' mt-3';
  el.style.fontSize = '.875rem';
  el.textContent = msg;
  setTimeout(() => el.remove(), 5000);
}

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link-custom').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.page));
  });

  renderProducts();
  navigate('inicio');
  setupReveal();

  document.getElementById('gallery-overlay').addEventListener('click', function(e) {
    if (e.target === this) closeGallery();
  });

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleContactForm);

  document.addEventListener('keydown', e => {
    if (document.getElementById('gallery-overlay').style.display === 'flex') {
      if (e.key === 'Escape')     closeGallery();
      if (e.key === 'ArrowLeft')  galPrev(false);
      if (e.key === 'ArrowRight') galNext(false);
    }
  });
});
