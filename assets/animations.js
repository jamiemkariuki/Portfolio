document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.hero-content, .about-section, .skills-section, .projects-section, .blog-section, .achievements-section, .contact-section, .skill-card, .project-card, .blog-post-card, .timeline-container, .achievement-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});
