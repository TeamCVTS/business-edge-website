// ==================== SCROLL PROGRESS BAR ====================
const createScrollProgressBar = () => {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

// // ==================== STICKY CTA BAR ====================
// const createStickyCTA = () => {
//   if (document.querySelector('.sticky-cta')) return;
  
//   const ctaBar = document.createElement('div');
//   ctaBar.className = 'sticky-cta';
//   ctaBar.innerHTML = `
//     <div class="container">
//       // <p>🚀 <strong>Ready to grow your business?</strong> Get a custom quote today.</p>
//       // <a href="#contact" class="btn-blue">Request Quote →</a>
//     </div>
//   `;
//   document.body.appendChild(ctaBar);
  
//   window.addEventListener('scroll', () => {
//     const pricingSection = document.getElementById('pricing');
//     if (pricingSection) {
//       const pricingBottom = pricingSection.offsetTop + pricingSection.offsetHeight;
//       const scrollPosition = window.scrollY + window.innerHeight;
      
//       if (scrollPosition > pricingBottom + 100) {
//         ctaBar.classList.add('visible');
//       } else {
//         ctaBar.classList.remove('visible');
//       }
//     }
//   });
// };

// ==================== BACK TO TOP BUTTON ====================
const createBackToTop = () => {
  if (document.querySelector('.back-to-top')) return;
  
  const backBtn = document.createElement('div');
  backBtn.className = 'back-to-top';
  backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backBtn);
  
  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });
};

// ==================== SCROLL REVEAL ANIMATIONS ====================
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.pricing-card, .step, .feature, .bundle-card, .faq-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
};

// ==================== RIPPLE EFFECT ON BUTTONS ====================
const initRippleEffect = () => {
  const buttons = document.querySelectorAll('.btn-blue, .btn-outline, .quote-btn, .tab-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.transition = 'width 0.4s ease, height 0.4s ease';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
      }, 10);
      
      setTimeout(() => {
        ripple.remove();
      }, 400);
    });
  });
};

// ==================== HEADER SHADOW ON SCROLL ====================
const initHeaderShadow = () => {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
      } else {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      }
    });
  }
};

// ==================== ACTIVE NAV LINK HIGHLIGHT ====================
const initActiveNavHighlight = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
        link.style.color = 'var(--blue)';
      } else {
        link.style.color = '';
      }
    });
  });
};

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
  createScrollProgressBar();
  createStickyCTA();
  createBackToTop();
  initScrollReveal();
  initRippleEffect();
  initHeaderShadow();
  initActiveNavHighlight();
});