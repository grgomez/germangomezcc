// Main application initialization
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize language switcher
    const languageSwitcher = new LanguageSwitcher();
    await languageSwitcher.initialize();
    
    // Initialize back to top button
    const backToTop = new BackToTop();
    backToTop.initialize();
    
    console.log('Application initialized successfully');
});