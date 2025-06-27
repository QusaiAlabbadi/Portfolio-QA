'use strict';

// ------------------  GLOBAL TOGGLE HELPER  ------------------
const elementToggleFunc = (elem) => elem.classList.toggle('active');

// ------------------  SIDEBAR (mobile)  ------------------
const sidebar      = document.querySelector('[data-sidebar]');
const sidebarBtn   = document.querySelector('[data-sidebar-btn]');
sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));

// ------------------  TESTIMONIALS MODAL  ------------------
const testimonialsItem   = document.querySelectorAll('[data-testimonials-item]');
const modalContainer     = document.querySelector('[data-modal-container]');
const modalCloseBtn      = document.querySelector('[data-modal-close-btn]');
const overlay            = document.querySelector('[data-overlay]');
const modalImg           = document.querySelector('[data-modal-img]');
const modalTitle         = document.querySelector('[data-modal-title]');
const modalText          = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = () => {
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
};

testimonialsItem.forEach(item => {
  item.addEventListener('click', () => {
    modalImg.src   = item.querySelector('[data-testimonials-avatar]').src;
    modalImg.alt   = item.querySelector('[data-testimonials-avatar]').alt;
    modalTitle.textContent = item.querySelector('[data-testimonials-title]').textContent;
    modalText.innerHTML    = item.querySelector('[data-testimonials-text]').innerHTML;
    testimonialsModalFunc();
  });
});
modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

// ------------------  CUSTOM SELECT (Portfolio Filter)  ------------------
const select        = document.querySelector('[data-select]');
const selectItems   = document.querySelectorAll('[data-select-item]');
const selectValue   = document.querySelector('[data-selecct-value]');
const filterBtn     = document.querySelectorAll('[data-filter-btn]');
const filterItems   = document.querySelectorAll('[data-filter-item]');

select.addEventListener('click', () => elementToggleFunc(select));

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    if (selectedValue === 'all' || selectedValue === item.dataset.category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

selectItems.forEach(opt => {
  opt.addEventListener('click', () => {
    const val = opt.innerText.toLowerCase();
    selectValue.innerText = opt.innerText;
    elementToggleFunc(select);
    filterFunc(val);
  });
});

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.innerText.toLowerCase();
    selectValue.innerText = btn.innerText;
    filterFunc(val);
    lastClickedBtn.classList.remove('active');
    btn.classList.add('active');
    lastClickedBtn = btn;
  });
});

// ------------------  PORTFOLIO IMAGE POP‑UP MODAL  ------------------
const projectModal          = document.querySelector('.project-modal');
if (projectModal) {
  const projectModalImg   = document.getElementById('modal-img');
  const projectModalDesc  = document.getElementById('modal-desc');
  const projectModalClose = projectModal.querySelector('.modal-close');
  const projectLinks      = document.querySelectorAll('.project-item a');

  // open modal
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const img = link.querySelector('img');
      projectModalImg.src = img.src;
      projectModalImg.alt = img.alt;
      // prefer data-desc attribute; fallback to project title
      projectModalDesc.textContent = link.getAttribute('data-desc') || link.querySelector('.project-title').innerText;
      projectModal.style.display = 'flex';
    });
  });

  // close modal (x button)
  projectModalClose.addEventListener('click', () => {
    projectModal.style.display = 'none';
  });
  // close modal when clicking outside content
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.style.display = 'none';
  });
}

// ------------------  CONTACT FORM VALIDATION  ------------------
const form         = document.querySelector('[data-form]');
const formInputs   = document.querySelectorAll('[data-form-input]');
const formBtn      = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
  input.addEventListener('input', () => {
    formBtn.disabled = !form.checkValidity();
  });
});

/* ─────  SUBMIT CONTACT FORM  ───── */
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();                // stop default page reload

    // pull field values
    const name    = form.querySelector('[name="fullname"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    // build a mailto link
    const mailto = `mailto:qusaialabady584@gmail.com`
                 + `?subject=Message%20from%20${encodeURIComponent(name)}`
                 + `&body=${encodeURIComponent(message)}%0A%0AReply-to:%20${email}`;

    window.location.href = mailto;      // opens the user’s e-mail client
  });
}


// ------------------  PAGE NAVIGATION  ------------------
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages           = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    pages.forEach(page => page.classList.remove('active'));
    navigationLinks.forEach(nav => nav.classList.remove('active'));

    pages[idx].classList.add('active');
    link.classList.add('active');
    window.scrollTo(0, 0);

    // if portfolio tab, reset filter to All
    if (link.textContent.trim().toLowerCase() === 'portfolio') {
      filterBtn.forEach(fBtn => fBtn.classList.toggle('active', fBtn.innerText === 'All'));
      selectValue.innerText = 'All';
      filterFunc('all');
    }
  });
});
