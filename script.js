// ===== PRODUCTS DATA =====
const products = [
  { id: 1, cat: 'helmet', name: 'XOR Full Face Helmet', desc: 'Aerodynamic full-face with anti-scratch visor and ventilation system.', price: '৳3,500', emoji: '🪖', badge: 'Best Seller' },
  { id: 2, cat: 'helmet', name: 'Open Face Retro Helmet', desc: 'Classic retro-style open face with comfortable inner lining.', price: '৳2,200', emoji: '⛑️', badge: null },
  { id: 3, cat: 'gloves', name: 'Racing Gloves Pro', desc: 'Knuckle-protected full-finger riding gloves with grippy palm.', price: '৳850', emoji: '🧤', badge: 'Popular' },
  { id: 4, cat: 'gloves', name: 'Summer Mesh Gloves', desc: 'Breathable mesh gloves for hot weather urban riding.', price: '৳550', emoji: '🤚', badge: null },
  { id: 5, cat: 'lights', name: 'LED DRL Strip Light', desc: 'Universal daytime running light strip — bright, waterproof, easy install.', price: '৳650', emoji: '💡', badge: null },
  { id: 6, cat: 'lights', name: 'H4 LED Headlight Bulb', desc: 'High-lumen LED H4 bulb with dual beam — 6000K white light.', price: '৳780', emoji: '🔦', badge: 'Hot' },
  { id: 7, cat: 'parts', name: 'CNC Brake & Clutch Lever', desc: 'Adjustable CNC machined levers — universal fit, multiple colors.', price: '৳950', emoji: '🔩', badge: null },
  { id: 8, cat: 'parts', name: 'Exhaust Silencer Cover', desc: 'Heat-resistant stainless exhaust shield for all bike types.', price: '৳1,100', emoji: '⚙️', badge: null },
  { id: 9, cat: 'accessories', name: 'Phone Mount (360°)', desc: 'Universal rotating phone holder with vibration dampener.', price: '৳480', emoji: '📱', badge: null },
  { id: 10, cat: 'accessories', name: 'USB Charger Port', desc: 'Weatherproof dual USB quick-charge port for 12V bikes.', price: '৳380', emoji: '🔌', badge: null },
  { id: 11, cat: 'accessories', name: 'Handlebar Grip Set', desc: 'Anti-slip ergonomic grips with bar-end mirror compatibility.', price: '৳320', emoji: '🎛️', badge: null },
  { id: 12, cat: 'accessories', name: 'Bike Cover (Waterproof)', desc: 'Heavy-duty waterproof cover for all bike sizes.', price: '৳750', emoji: '🛡️', badge: 'New' },
];

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <span>${p.emoji}</span>
      </div>
      <div class="product-body">
        <p class="product-cat">${p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price">${p.price}</div>
          <button class="product-btn" onclick="quickOrder('${p.name}', '${p.price}')">Order</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Quick order from product card
function quickOrder(name, price) {
  const section = document.getElementById('order');
  section.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const field = document.getElementById('fproduct');
    if (field) field.value = `${name} (${price}) — Qty: 1`;
    field.focus();
  }, 700);
}

// Category tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.cat);
  });
});

renderProducts();

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

// ===== WHATSAPP ORDER =====
document.getElementById('orderBtn').addEventListener('click', () => {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const address = document.getElementById('faddress').value.trim();
  const product = document.getElementById('fproduct').value.trim();
  const notes = document.getElementById('fnotes').value.trim();

  if (!name || !phone || !address || !product) {
    alert('Please fill in all required fields (Name, Phone, Address, Product).');
    return;
  }

  const msg = encodeURIComponent(
    `🏍️ *New Order – GearShift BD*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `📍 *Address:* ${address}\n` +
    `🛒 *Product(s):* ${product}\n` +
    `📝 *Notes:* ${notes || 'None'}\n\n` +
    `_Sent via GearShiftBD.com_`
  );

  window.open(`https://wa.me/8801941911517?text=${msg}`, '_blank');
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id], div[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${cur}` ? 'var(--red)' : '';
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .service-card, .stat, .contact-card, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
