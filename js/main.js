// ==================== MOBILE MENU TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== PRICING TABS ====================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.getAttribute('data-tab');
    
    // Update active states
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
  });
});

// ==================== QUOTE BUTTONS ====================
const quoteButtons = document.querySelectorAll('.quote-btn');
const serviceSelect = document.getElementById('serviceInterest');
const hiddenServiceInput = document.getElementById('selectedService');

quoteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const serviceName = button.getAttribute('data-service');
    if (serviceName && serviceSelect) {
      // Scroll to contact form smoothly
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      // Store service name
      if (hiddenServiceInput) {
        hiddenServiceInput.value = serviceName;
      }
      
      // Add visual feedback
      button.style.transform = 'scale(0.98)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    }
  });
});

// ==================== FAQ ACCORDION ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});

// ==================== FORM SUBMISSION HANDLER ====================
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const businessName = document.getElementById('businessName')?.value || '';
    const serviceInterest = document.getElementById('serviceInterest')?.value || '';
    const message = document.getElementById('message')?.value || '';
    const selectedService = document.getElementById('selectedService')?.value || '';
    
    if (!fullName || !email) {
      showFormMessage('Please fill in your name and email address.', 'error');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    const quoteRequest = {
      fullName,
      email,
      phone,
      businessName,
      serviceInterest,
      selectedService: selectedService || 'Not specified',
      message,
      timestamp: new Date().toISOString()
    };
    
    console.log('Quote Request Submitted:', quoteRequest);
    
    showFormMessage(
      'Thank you! We\'ve received your request and will respond within 24 hours.',
      'success'
    );
    
    quoteForm.reset();
    if (hiddenServiceInput) hiddenServiceInput.value = '';
  });
}

function showFormMessage(message, type) {
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.padding = '12px';
  messageDiv.style.borderRadius = '12px';
  messageDiv.style.marginTop = '20px';
  messageDiv.style.textAlign = 'center';
  messageDiv.style.fontWeight = '500';
  
  if (type === 'success') {
    messageDiv.style.backgroundColor = '#d4edda';
    messageDiv.style.color = '#155724';
    messageDiv.style.border = '1px solid #c3e6cb';
  } else {
    messageDiv.style.backgroundColor = '#f8d7da';
    messageDiv.style.color = '#721c24';
    messageDiv.style.border = '1px solid #f5c6cb';
  }
  
  const form = document.getElementById('quoteForm');
  if (form) {
    form.insertAdjacentElement('afterend', messageDiv);
  }
  
  setTimeout(() => {
    if (messageDiv) messageDiv.remove();
  }, 5000);
}

// Update footer year
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
}

console.log('Business Edge website loaded successfully (Clean Tech Blue Theme)');