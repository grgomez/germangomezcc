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
            en: 'Germán Gómez Urbina, P.Eng., PMP - Systems Architect',
            fr: 'Germán Gómez Urbina, P.Eng., PMP - Architecte de Systèmes',
            es: 'Germán Gómez Urbina, P.Eng., PMP - Arquitecto de Sistemas'
        };
        
        const descriptions = {
            en: 'Systems Architect with 10+ years designing enterprise-scale distributed systems for critical infrastructure. Professional Engineer (P.Eng.) and PMP certified, specializing in C#, Python, DevOps and AI-assisted engineering in Calgary, Alberta.',
            fr: 'Architecte de systèmes avec plus de 10 ans d\'expérience en conception de systèmes distribués à l\'échelle d\'entreprise pour l\'infrastructure critique. Ingénieur professionnel (P.Eng.) et certifié PMP, spécialisé en C#, Python, DevOps et ingénierie assistée par IA à Calgary, Alberta.',
            es: 'Arquitecto de Sistemas con más de 10 años diseñando sistemas distribuidos a escala empresarial para infraestructura crítica. Ingeniero Profesional (P.Eng.) y certificado PMP, especializado en C#, Python, DevOps e ingeniería asistida por IA en Calgary, Alberta.'
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
