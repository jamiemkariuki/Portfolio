document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply animation to the section itself
                entry.target.classList.add('visible');

                // Staggered animation for children
                const animatedChildren = entry.target.querySelectorAll('.animate-item');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100); // Stagger by 100ms
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe sections for animation
    const sectionsToAnimate = document.querySelectorAll('.hero-content, .about-section, .skills-section, .projects-section, .blog-section, .achievements-section, .contact-section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // Hamburger menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
});
