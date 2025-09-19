// main.js for Amazon Clone - Advanced Version
// main.js for Amazon Clone - Advanced Version

document.addEventListener('DOMContentLoaded', function() {
  // --- Offers Carousel ---
  const offers = [
    { text: 'Biggest Deals of the Season! Up to 70% off on Electronics, Fashion, Home & more', color: 'text-gray-900' },
    { text: 'Lightning Deals: Limited Time Offers!', color: 'text-red-700' },
    { text: 'Free Delivery on First Order!', color: 'text-green-700' },
    { text: 'Prime Day is Coming Soon!', color: 'text-blue-700' },
  ];
  let offerIndex = 0;
  const offersCarousel = document.getElementById('offers-carousel');
  function showOffer(idx) {
    offersCarousel.innerHTML = `<h2 class="text-2xl font-bold ${offers[idx].color}">${offers[idx].text}</h2>`;
  }
  showOffer(offerIndex);
  setInterval(() => {
    offerIndex = (offerIndex + 1) % offers.length;
    showOffer(offerIndex);
  }, 3500);

  // --- Take Over Now Button ---
  const offerBtn = document.getElementById('takeover-btn');
  if (offerBtn) {
    offerBtn.addEventListener('click', function() {
      alert('Welcome to the best deals! Shop now and save big!');
    });
  }

  // --- Product Data ---
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 1999,
      oldPrice: 3999,
      img: 'https://picsum.photos/200/200?random=2',
      desc: 'High quality wireless headphones with noise cancellation.',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 2499,
      oldPrice: 4999,
      img: 'https://picsum.photos/200/200?random=3',
      desc: 'Track your fitness and notifications on the go.',
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 999,
      oldPrice: 1999,
      img: 'https://picsum.photos/200/200?random=4',
      desc: 'Portable speaker with deep bass and long battery life.',
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      price: 799,
      oldPrice: 1599,
      img: 'https://picsum.photos/200/200?random=5',
      desc: 'Ergonomic mouse with customizable buttons.',
    },
    {
      id: 5,
      name: 'Fitness Band',
      price: 1299,
      oldPrice: 2599,
      img: 'https://picsum.photos/200/200?random=6',
      desc: 'Monitor your health and activity 24/7.',
    },
    {
      id: 6,
      name: 'Wireless Charger',
      price: 599,
      oldPrice: 1299,
      img: 'https://picsum.photos/200/200?random=7',
      desc: 'Fast wireless charging for all devices.',
    },
  ];

  // --- Product Grid Rendering ---
  const productGrid = document.getElementById('product-grid');
  let cartCount = 0;
  let wishlist = new Set();
  function renderProducts(filter = '') {
    let filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
    productGrid.innerHTML = filtered.map(product => `
      <div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative group">
        <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition" title="Add to Wishlist" data-wish="${product.id}">
          <svg class="w-6 h-6" fill="${wishlist.has(product.id) ? 'red' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/></svg>
        </button>
        <img src="${product.img}" alt="${product.name}" class="w-32 h-32 object-contain mb-2 cursor-pointer" data-quickview="${product.id}">
        <h3 class="font-semibold text-lg">${product.name}</h3>
        <p class="text-gray-600">₹${product.price} <span class="line-through text-sm text-gray-400">₹${product.oldPrice}</span></p>
        <div class="flex space-x-2 mt-2">
          <button class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition add-to-cart" data-id="${product.id}">Add to Cart</button>
          <button class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition text-sm quick-view" data-id="${product.id}">Quick View</button>
        </div>
      </div>
    `).join('');
  }
  renderProducts();

  // --- Search Filtering ---
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  function doSearch() {
    renderProducts(searchInput.value);
  }
  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keyup', e => { if (e.key === 'Enter') doSearch(); });

  // --- Add to Cart with Animation ---
  productGrid.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
      cartCount++;
      document.getElementById('cart-count').textContent = `Cart (${cartCount})`;
      e.target.classList.add('animate-bounce');
      setTimeout(() => e.target.classList.remove('animate-bounce'), 500);
    }
  });

  // --- Wishlist Button ---
  productGrid.addEventListener('click', function(e) {
    if (e.target.closest('[data-wish]')) {
      const id = +e.target.closest('[data-wish]').getAttribute('data-wish');
      if (wishlist.has(id)) wishlist.delete(id); else wishlist.add(id);
      renderProducts(searchInput.value);
    }
  });

  // --- Quick View Modal ---
  let modal = null;
  productGrid.addEventListener('click', function(e) {
    if (e.target.classList.contains('quick-view') || e.target.getAttribute('data-quickview')) {
      const id = +(e.target.getAttribute('data-id') || e.target.getAttribute('data-quickview'));
      const product = products.find(p => p.id === id);
      if (!modal) {
        modal = document.createElement('div');
        document.body.appendChild(modal);
      }
      modal.innerHTML = `
        <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-80 relative">
            <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl close-modal">&times;</button>
            <img src="${product.img}" alt="${product.name}" class="w-32 h-32 mx-auto mb-2">
            <h3 class="font-bold text-lg mb-1">${product.name}</h3>
            <p class="text-gray-600 mb-2">${product.desc}</p>
            <p class="mb-2">₹${product.price} <span class="line-through text-sm text-gray-400">₹${product.oldPrice}</span></p>
            <button class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-full add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      `;
      modal.querySelector('.close-modal').onclick = () => modal.innerHTML = '';
      modal.onclick = e => { if (e.target === modal.firstElementChild) modal.innerHTML = ''; };
    }
  });

  // --- Responsive Navigation (Hamburger) ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // --- Sticky Navbar (already sticky via Tailwind) ---

  // --- Light/Dark Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.getElementById('body');
  let darkMode = false;
  themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
      body.classList.remove('bg-gray-100');
      body.classList.add('bg-gray-900', 'text-white');
      themeToggle.textContent = '☀️';
    } else {
      body.classList.add('bg-gray-100');
      body.classList.remove('bg-gray-900', 'text-white');
      themeToggle.textContent = '🌙';
    }
  });

  // --- Newsletter Signup ---
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing! (Demo only)');
    newsletterForm.reset();
  });
});
