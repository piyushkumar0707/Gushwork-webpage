/* ====================================================
   script.js — All interactive JS for Mangalam HDPE Pipes
   ==================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. STICKY HEADER
     Appears when scrolling beyond the first fold
  -------------------------------------------------- */
  const navElement = document.querySelector('.nav');
  const stickyBar  = document.getElementById('sticky-bar');
  const heroSection = document.getElementById('hero');

  if (navElement && heroSection) {
    const observer = new IntersectionObserver(([entry]) => {
      const isOut = !entry.isIntersecting;
      // Only apply sticky behavior on screens >= 768px
      const isDesktop = window.innerWidth >= 768;
      
      navElement.classList.toggle('is-sticky', isOut && isDesktop);
      if (stickyBar) stickyBar.classList.toggle('is-active', isOut && isDesktop);
    }, { threshold: 0.0 });
    observer.observe(heroSection);
  }

  /* --------------------------------------------------
     2. HERO IMAGE CAROUSEL & ZOOM
  -------------------------------------------------- */
  const mainImage = document.querySelector('.hero__media img');
  const thumbs = document.querySelectorAll('.hero__thumbs span');
  const heroMedia = document.querySelector('.hero__media');

  // Carousel logic
  const heroImages = [
    'assets/hero-main.png',
    'assets/process-raw-material.png',
    'assets/portfolio-pert-heating.png',
    'assets/portfolio-hdpe-fittings.png',
    'assets/portfolio-installation-services.png',
    'assets/application-fishnet-1.png'
  ];

  let currentHeroIdx = 0;

  function updateHeroImage(index) {
    if (index < 0) index = heroImages.length - 1;
    if (index >= heroImages.length) index = 0;
    currentHeroIdx = index;

    if (mainImage) mainImage.src = heroImages[currentHeroIdx];
    
    // Update thumbs opacity
    thumbs.forEach((t, i) => {
      t.style.opacity = (i === currentHeroIdx) ? '1' : '0.5';
      t.style.borderColor = (i === currentHeroIdx) ? '#3B4D8C' : 'transparent';
    });
  }

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => updateHeroImage(idx));
  });

  const arrowLeft = document.querySelector('.hero__arrow--left');
  const arrowRight = document.querySelector('.hero__arrow--right');

  arrowLeft?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateHeroImage(currentHeroIdx - 1);
  });

  arrowRight?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateHeroImage(currentHeroIdx + 1);
  });

  // Enhanced Zoom logic
  if (heroMedia && mainImage) {
    heroMedia.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = heroMedia.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      mainImage.style.transformOrigin = `${x}% ${y}%`;
      mainImage.style.transform = 'scale(2.4)'; // Increased for better detail
    });

    heroMedia.addEventListener('mouseleave', () => {
      mainImage.style.transform = 'scale(1)';
      mainImage.style.transformOrigin = 'center center';
    });
  }

  /* --------------------------------------------------
     2. HAMBURGER MENU (mobile navigation)
  -------------------------------------------------- */
  const nav       = document.querySelector('.nav');
  const hamburger = document.getElementById('hamburger-btn');
  const navLinks  = document.getElementById('nav-links');

  if (nav && hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      navLinks.classList.toggle('is-open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --------------------------------------------------
     3. FAQ ACCORDION
     One item open at a time; respects scroll height
  -------------------------------------------------- */
  // Set initial open item heights
  document.querySelectorAll('.faq__item.is-open .faq__answer').forEach((answer) => {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  });

  document.querySelectorAll('.faq__trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('is-open');

      // Close everyone first
      document.querySelectorAll('.faq__item').forEach((otherItem) => {
        otherItem.classList.remove('is-open');
        otherItem.querySelector('.faq__answer').style.maxHeight = null;
        otherItem.querySelector('.faq__trigger').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq__icon').textContent = '⌄';
      });

      // If it WAS closed, open it now
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        item.querySelector('.faq__icon').textContent = '⌃';
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* --------------------------------------------------
     4. APPLICATIONS CAROUSEL — Prev / Next buttons
  -------------------------------------------------- */
  const appTrack = document.getElementById('applications-track');
  const appPrev  = document.getElementById('applications-prev');
  const appNext  = document.getElementById('applications-next');

  if (appTrack && appPrev && appNext) {
    const getStep = () => {
      const firstCard = appTrack.querySelector('.application-card');
      if (!firstCard) return 300;
      const gap = Number.parseFloat(getComputedStyle(appTrack).gap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    };

    appPrev.addEventListener('click', () => {
      const scrollAmount = appTrack.clientWidth;
      appTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    appNext.addEventListener('click', () => {
      const scrollAmount = appTrack.clientWidth;
      appTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------
     5. PROCESS SECTION TABS & CAROUSEL
  -------------------------------------------------- */
  const processTabs  = document.querySelectorAll('.process__tabs button');
  const processTitle = document.getElementById('process-title');
  const processDesc  = document.getElementById('process-desc');
  const processList  = document.getElementById('process-list');
  const processImg   = document.getElementById('process-img');
  const processPrev  = document.getElementById('process-prev');
  const processNext  = document.getElementById('process-next');

  // Hardcoded data matching the tabs
  const processData = [
    {
      title: 'High-Grade Raw Material Selection',
      desc: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
      list: ['PE100 grade material', 'Optimal molecular weight distribution'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Precision Extrusion',
      desc: 'Our advanced extruders melt the raw material to a precise consistency, ensuring a smooth and strong pipe wall.',
      list: ['High-capacity single-screw extruders', 'Uniform melt temperature control'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Controlled Cooling',
      desc: 'Multi-stage vacuum sizing and cooling tanks guarantee accurate dimensions and perfect roundness.',
      list: ['Efficient water-spray cooling tanks', 'Continuous vacuum sizing'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Accurate Sizing',
      desc: 'Continuous real-time measuring systems guarantee dimension adherence across every inch of the pipe.',
      list: ['Laser diameter measurement', 'Ultrasonic wall thickness tracking'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Stringent Quality Control',
      desc: 'Every batch undergoes rigorous lab testing to meet and exceed international standards.',
      list: ['Hydrostatic pressure testing', 'Tensile strength verification'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Permanent Marking',
      desc: 'Inkjet or hot stamping equipment prints vital specifications permanently along the length of each pipe.',
      list: ['Clear identification and tracing', 'Standard compliance markings'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Clean Cutting',
      desc: 'Planetary saws perform dust-free and perfectly perpendicular cuts to exact required lengths.',
      list: ['Smooth chamfered edges', 'Automated length measurement'],
      img: 'assets/process-raw-material.png'
    },
    {
      title: 'Secure Packaging',
      desc: 'Pipes are carefully bundled or coiled to ensure they reach the site in perfect condition.',
      list: ['Durable strapping for straight pipes', 'Stretch-wrapped coils for smaller diameters'],
      img: 'assets/process-raw-material.png'
    }
  ];

  let currentProcessIndex = 0;

  function updateProcessSection(index) {
    if (index < 0) index = processData.length - 1;
    if (index >= processData.length) index = 0;
    currentProcessIndex = index;

    // Update active tab
    processTabs.forEach((tab, i) => {
      tab.classList.toggle('is-active', i === currentProcessIndex);
    });

    // Update content
    const data = processData[currentProcessIndex];
    if (processTitle) processTitle.textContent = data.title;
    if (processDesc)  processDesc.textContent  = data.desc;
    if (processImg)   processImg.src           = data.img;

    if (processList) {
      processList.innerHTML = '';
      data.list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        processList.appendChild(li);
      });
    }
  }

  if (processTabs.length > 0) {
    processTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => updateProcessSection(index));
    });
  }

  if (processPrev) {
    processPrev.addEventListener('click', () => updateProcessSection(currentProcessIndex - 1));
  }
  if (processNext) {
    processNext.addEventListener('click', () => updateProcessSection(currentProcessIndex + 1));
  }

  /* --------------------------------------------------
     6. MODAL SYSTEM (Catalogue & Call Back)
  -------------------------------------------------- */
  const catalogueModal = document.getElementById('catalogue-modal');
  const requestCallModal = document.getElementById('request-call-modal');
  
  // Triggers
  const openCatalogueBtns = document.querySelectorAll('.open-catalogue-btn');
  const openRequestBtns   = document.querySelectorAll('.open-request-btn');
  
  // Handlers
  const openModal = (modal) => {
    if (!modal) return;
    modal.removeAttribute('aria-hidden');
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  };

  // Setup catalogue triggers
  openCatalogueBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(catalogueModal);
  }));

  // Setup request call triggers
  openRequestBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(requestCallModal);
  }));

  // Close buttons logic
  document.querySelectorAll('.modal__close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(catalogueModal);
      closeModal(requestCallModal);
    });
  });

  // Click outside to close
  [catalogueModal, requestCallModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Escape key closes both modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(catalogueModal);
      closeModal(requestCallModal);
    }
  });

  // Handle all modal form submissions
  document.querySelectorAll('.modal__form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        form.reset();
        closeModal(catalogueModal);
        closeModal(requestCallModal);
      } else {
        form.reportValidity();
      }
    });
  });

  /* --------------------------------------------------
     7. CTA FORM submission
  -------------------------------------------------- */
  const ctaForm = document.getElementById('cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (ctaForm.checkValidity()) {
        ctaForm.reset();
      } else {
        ctaForm.reportValidity();
      }
    });
  }

  /* --------------------------------------------------
     8. CATALOGUE FORM submission
  -------------------------------------------------- */
  const catalogueForm = document.getElementById('catalogue-form');
  if (catalogueForm) {
    catalogueForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (catalogueForm.checkValidity()) {
        catalogueForm.reset();
      } else {
        catalogueForm.reportValidity();
      }
    });
  }

  /* --------------------------------------------------
     9. DEBOUNCED RESIZE HANDLER
     Re-calculates open FAQ heights after resize
  -------------------------------------------------- */
  const debounce = (fn, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  };

  window.addEventListener('resize', debounce(() => {
    // Re-check sticky status on resize
    const rect = heroSection.getBoundingClientRect();
    const isOut = rect.bottom < 0;
    const isDesktop = window.innerWidth >= 768;
    
    navElement.classList.toggle('is-sticky', isOut && isDesktop);
    if (stickyBar) stickyBar.classList.toggle('is-active', isOut && isDesktop);

    document.querySelectorAll('.faq__item.is-open .faq__answer').forEach((answer) => {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  }, 100));

});
