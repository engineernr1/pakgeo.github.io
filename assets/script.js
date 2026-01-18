// Small script: menu toggle, gallery modal, and simple filter
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu toggle for small screens (keeps nav accessible)
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'flex';
    });
  }

  // Modal for images
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.querySelector('.modal-close');

  function openModal(src, title, alt){
    modalImg.src = src;
    modalImg.alt = alt || title || '';
    modalCaption.textContent = title || '';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    modalCaption.textContent = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const full = btn.dataset.full;
      const title = btn.dataset.title || '';
      const alt = btn.querySelector('img')?.alt || '';
      if (full) openModal(full, title, alt);
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Simple filter for sketches (client-only)
  const filter = document.getElementById('filter');
  if (filter) {
    filter.addEventListener('change', (e) => {
      // For this template, we only show how to hook a filter.
      // Add data-category attributes to .thumb elements to make filtering work.
      const val = e.target.value;
      document.querySelectorAll('#gallery-grid .thumb').forEach(el => {
        const cat = el.dataset.category || 'all';
        el.style.display = (val === 'all' || cat === val) ? '' : 'none';
      });
    });
  }

// ===== MOBILE NAV TOGGLE =====
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

});
