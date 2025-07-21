// Portfolio JavaScript - Interactive Features

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const typingText = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const skillsGrid = document.getElementById('skills-grid');

// Skills Data
const skillsData = {
  languages: [
    { name: 'Python', level: 'Advanced', progress: 90, icon: 'fab fa-python' },
    { name: 'JavaScript', level: 'Intermediate', progress: 75, icon: 'fab fa-js-square' },
    { name: 'PHP', level: 'Intermediate', progress: 70, icon: 'fab fa-php' },
    { name: 'HTML/CSS', level: 'Advanced', progress: 95, icon: 'fab fa-html5' },
    { name: 'SQL', level: 'Intermediate', progress: 65, icon: 'fas fa-database' },
    { name: 'C++', level: 'Beginner', progress: 40, icon: 'fas fa-code' }
  ],
  frameworks: [
    { name: 'Git/GitHub', level: 'Advanced', progress: 85, icon: 'fab fa-git-alt' },
    { name: 'VS Code', level: 'Advanced', progress: 90, icon: 'fas fa-code' },
    { name: 'MySQL', level: 'Intermediate', progress: 70, icon: 'fas fa-database' },
    { name: 'Responsive Design', level: 'Advanced', progress: 88, icon: 'fas fa-mobile-alt' },
    { name: 'Web Hosting', level: 'Intermediate', progress: 75, icon: 'fas fa-server' },
    { name: 'Linux', level: 'Beginner', progress: 45, icon: 'fab fa-linux' }
  ],
  soft: [
    { name: 'Leadership', level: 'Advanced', progress: 85, icon: 'fas fa-users' },
    { name: 'Problem Solving', level: 'Advanced', progress: 90, icon: 'fas fa-lightbulb' },
    { name: 'Communication', level: 'Intermediate', progress: 80, icon: 'fas fa-comments' },
    { name: 'Project Management', level: 'Intermediate', progress: 75, icon: 'fas fa-tasks' },
    { name: 'Mentoring', level: 'Intermediate', progress: 70, icon: 'fas fa-chalkboard-teacher' },
    { name: 'Research', level: 'Advanced', progress: 85, icon: 'fas fa-search' }
  ]
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeTypingEffect();
  initializeScrollAnimations();
  initializeParticles();
  initializeCounters();
  initializeSkills();
  initializeTheme();
  initializeContactForm();
  initializeSmoothScrolling();
});

// Navigation Functions
function initializeNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active navigation link
  window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Typing Effect
function initializeTypingEffect() {
  const texts = [
    'Building the Future from Kenya',
    'Innovating with Code',
    'Leading the Next Generation',
    'Dreaming of MIT EECS'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
  }
  
  typeText();
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  // Add scroll reveal to elements
  document.querySelectorAll('.project-card, .achievement-card, .blog-card, .skill-item').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}

// Particles Animation
function initializeParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random position
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  
  // Random animation delay
  particle.style.animationDelay = Math.random() * 6 + 's';
  
  // Random size
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  container.appendChild(particle);
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Skills Section
function initializeSkills() {
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    category.addEventListener('click', function() {
      // Remove active class from all categories
      skillCategories.forEach(cat => cat.classList.remove('active'));
      // Add active class to clicked category
      this.classList.add('active');
      
      // Update skills grid
      const categoryType = this.getAttribute('data-category');
      updateSkillsGrid(categoryType);
    });
  });

  // Initialize with first category
  updateSkillsGrid('languages');
}

function updateSkillsGrid(category) {
  const skills = skillsData[category];
  skillsGrid.innerHTML = '';

  skills.forEach((skill, index) => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-item scroll-reveal';
    skillElement.style.animationDelay = `${index * 0.1}s`;
    
    skillElement.innerHTML = `
      <div class="skill-icon">
        <i class="${skill.icon}"></i>
      </div>
      <div class="skill-name">${skill.name}</div>
      <div class="skill-level">${skill.level}</div>
      <div class="skill-progress">
        <div class="skill-progress-bar" style="width: 0%"></div>
      </div>
    `;
    
    skillsGrid.appendChild(skillElement);
    
    // Animate progress bar
    setTimeout(() => {
      const progressBar = skillElement.querySelector('.skill-progress-bar');
      progressBar.style.width = skill.progress + '%';
    }, index * 100 + 200);
  });
}

// Theme Toggle
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Contact Form
function initializeContactForm() {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#00FF88' : '#FF6B6B'};
    color: #0A1628;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Project Modal (for future enhancement)
function openProjectModal(projectId) {
  // This would open a detailed modal for each project
  console.log('Opening project modal for:', projectId);
}

// Add click handlers to project cards
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(updateActiveNavLink, 10));

// Preload images for better performance
function preloadImages() {
  const imageUrls = [
    'assets/images/hero_background.png',
    'assets/images/profile_illustration.png',
    'assets/images/project_workaligner.png',
    'assets/images/project_school_system.png',
    'assets/images/project_mit_ocw.png'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize image preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loading');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    showNotification('🎉 You found the secret! Jamie appreciates curious minds!', 'success');
    konamiCode = [];
  }
});

// Console message for developers
console.log(`
🚀 Welcome to Jamie Kariuki's Portfolio!
👨‍💻 Built with passion from Kenya
🎯 Targeting MIT EECS 2029
💡 Always learning, always building

Interested in the code? Check out the GitHub repo!
`);

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeNavigation,
    initializeTypingEffect,
    initializeScrollAnimations,
    updateSkillsGrid,
    showNotification
  };
}

