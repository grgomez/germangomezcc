// Back to top button functionality
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.scrollThreshold = 300;
    }

    initialize() {
        if (!this.button) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > this.scrollThreshold) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when button is clicked
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Export for use in main.js
window.BackToTop = BackToTop;