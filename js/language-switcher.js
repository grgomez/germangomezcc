// Language management system
class LanguageSwitcher {
    constructor() {
        this.translations = {};
        this.currentLanguage = localStorage.getItem('preferred-language') || 'en';
        this.supportedLanguages = ['en', 'fr', 'es'];
    }

    async loadTranslations() {
        // Load all translation files
        for (const lang of this.supportedLanguages) {
            try {
                const response = await fetch(`./translations/${lang}.json`);
                this.translations[lang] = await response.json();
            } catch (error) {
                console.error(`Failed to load ${lang} translations:`, error);
            }
        }
    }

    updateContent(lang) {
        const translation = this.translations[lang];
        if (!translation) return;
        
        // Update all elements with data-translate attributes
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translation[key]) {
                element.textContent = translation[key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update meta tags
        this.updateMetaTags(lang);
        
        // Save preference
        localStorage.setItem('preferred-language', lang);
        this.currentLanguage = lang;
    }

    updateMetaTags(lang) {
        const titles = {
            en: 'Germán Gómez Urbina, P.Eng., PMP - Systems Integration Engineer',
            fr: 'Germán Gómez Urbina, P.Eng., PMP - Ingénieur d\'Intégration de Systèmes',
            es: 'Germán Gómez Urbina, P.Eng., PMP - Ingeniero de Integración de Sistemas'
        };
        
        const descriptions = {
            en: 'Systems Integration Engineer with 9+ years developing enterprise-scale distributed systems for critical infrastructure. Professional Engineer (P.Eng.) and PMP certified, specializing in C#, Python, and DevOps practices in Calgary, Alberta.',
            fr: 'Ingénieur d\'intégration de systèmes avec 9+ années d\'expérience développant des systèmes distribués à l\'échelle d\'entreprise pour l\'infrastructure critique. Ingénieur professionnel (P.Eng.) et certifié PMP, spécialisé en C#, Python et pratiques DevOps à Calgary, Alberta.',
            es: 'Ingeniero de Integración de Sistemas con más de 9 años desarrollando sistemas distribuidos a escala empresarial para infraestructura crítica. Ingeniero Profesional (P.Eng.) y certificado PMP, especializado en C#, Python y prácticas DevOps en Calgary, Alberta.'
        };

        document.title = titles[lang];
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.content = descriptions[lang];
        }
    }

    async initialize() {
        await this.loadTranslations();
        
        // Set initial language
        this.updateContent(this.currentLanguage);
        
        // Update active button
        this.updateActiveButton();
        
        // Add event listeners
        this.attachEventListeners();
    }

    updateActiveButton() {
        document.querySelectorAll('.language-switcher .btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
    }

    attachEventListeners() {
        document.querySelectorAll('.language-switcher .btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                
                // Update active state
                document.querySelectorAll('.language-switcher .btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                // Update content
                this.updateContent(lang);
            });
        });
    }
}

// Export for use in main.js
window.LanguageSwitcher = LanguageSwitcher;