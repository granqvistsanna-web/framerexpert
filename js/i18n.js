/* ============================================
   I18N.JS — Bilingual SV/EN Toggle
   ============================================ */

const translations = {
  sv: {
    // Nav
    'nav.portfolio': 'Projekt',
    'nav.services': 'Tjänster',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Boka samtal',

    // Hero
    'hero.badge': 'Tillgänglig för nya projekt',
    'hero.title.line1': 'Jag bygger webbplatser',
    'hero.title.line2': 'som konverterar',
    'hero.title.line3': ' i Framer.',
    'hero.subtitle': 'Sanna Granqvist \u2014 Sveriges ledande Framer-expert. Jag hjälper företag att lansera snabba, vackra webbplatser utan kod.',
    'hero.cta1': 'Se mitt arbete',
    'hero.cta2': 'Boka samtal',
    'hero.stat1': 'Levererade projekt',
    'hero.stat2': 'Framer-fokus',
    'hero.stat3': 'Baserad i',
    'hero.stat3.number': 'Sverige',

    // Portfolio
    'portfolio.pretitle': 'UTVALDA PROJEKT',
    'portfolio.title': 'Webbplatser som levererar resultat',
    'portfolio.description': 'Varje projekt byggt i Framer med fokus på prestanda, design och konvertering.',
    'portfolio.p1.title': 'Modebrand Stockholm',
    'portfolio.p1.desc': 'Komplett e-handelsupplevelse med Framer CMS. 40% ökning i konverteringsgrad efter lansering.',
    'portfolio.p2.title': 'TechStartup Landing',
    'portfolio.p2.desc': 'High-converting landningssida för SaaS-startup. Byggd på 2 veckor med fullständig SEO-optimering.',
    'portfolio.p3.tag': 'Byrå',
    'portfolio.p3.title': 'Kreativ Byrå Malmö',
    'portfolio.p3.desc': 'Portföljsida för kreativ byrå. Interaktiva animationer och smidig CMS-hantering för teamet.',
    'portfolio.p4.tag': 'Restaurang',
    'portfolio.p4.title': 'Restaurang Göteborg',
    'portfolio.p4.desc': 'Elegant webbplats med menyhantering via CMS. Mobilanpassad med fokus på bokning och kontakt.',

    // Services
    'services.pretitle': 'TJÄNSTER',
    'services.title': 'Allt du behöver i Framer',
    'services.s1.title': 'Webbdesign & utveckling',
    'services.s1.desc': 'Kompletta webbplatser byggda i Framer \u2014 från koncept till lansering. Responsiv design, snabb laddning, optimerad SEO.',
    'services.s2.title': 'Framer-migrering',
    'services.s2.desc': 'Flytta din befintliga webbplats till Framer. Behåll din design, få bättre prestanda och enklare hantering.',
    'services.s3.title': 'CMS & innehåll',
    'services.s3.desc': 'Framers CMS för dynamiskt innehåll \u2014 blogg, produkter, teammedlemmar. Du uppdaterar, sajten förblir snabb.',
    'services.s4.title': 'SEO & prestanda',
    'services.s4.desc': 'Optimerade sajter som rankar högt. Teknisk SEO, Core Web Vitals, metadata \u2014 allt inbyggt från start.',
    'services.s5.title': 'Workshops & utbildning',
    'services.s5.desc': 'Lär ditt team att arbeta i Framer. Praktiska workshops anpassade efter er nivå och behov.',
    'services.s6.title': 'Support & underhåll',
    'services.s6.desc': 'Löpande support för din Framer-sajt. Uppdateringar, fixar, nya sidor \u2014 jag finns här.',

    // Contact
    'contact.pretitle': 'KONTAKT',
    'contact.title': 'Redo att bygga något fantastiskt?',
    'contact.description': 'Berätta om ditt projekt. Jag återkommer inom 24 timmar.',
    'contact.email': 'Skicka mejl',

    // Footer
    'footer.tagline': 'Byggt med Framer-expertis'
  },

  en: {
    // Nav
    'nav.portfolio': 'Work',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.cta': 'Book a call',

    // Hero
    'hero.badge': 'Available for new projects',
    'hero.title.line1': 'I build websites',
    'hero.title.line2': 'that convert',
    'hero.title.line3': ' in Framer.',
    'hero.subtitle': 'Sanna Granqvist \u2014 Sweden\'s leading Framer expert. I help companies launch fast, beautiful websites without code.',
    'hero.cta1': 'View my work',
    'hero.cta2': 'Book a call',
    'hero.stat1': 'Projects delivered',
    'hero.stat2': 'Framer-focused',
    'hero.stat3': 'Based in',
    'hero.stat3.number': 'Sweden',

    // Portfolio
    'portfolio.pretitle': 'SELECTED WORK',
    'portfolio.title': 'Websites that deliver results',
    'portfolio.description': 'Every project built in Framer with a focus on performance, design, and conversion.',
    'portfolio.p1.title': 'Fashion Brand Stockholm',
    'portfolio.p1.desc': 'Complete e-commerce experience with Framer CMS. 40% increase in conversion rate after launch.',
    'portfolio.p2.title': 'TechStartup Landing',
    'portfolio.p2.desc': 'High-converting landing page for a SaaS startup. Built in 2 weeks with full SEO optimization.',
    'portfolio.p3.tag': 'Agency',
    'portfolio.p3.title': 'Creative Agency Malm\u00f6',
    'portfolio.p3.desc': 'Portfolio site for a creative agency. Interactive animations and smooth CMS management for the team.',
    'portfolio.p4.tag': 'Restaurant',
    'portfolio.p4.title': 'Restaurant Gothenburg',
    'portfolio.p4.desc': 'Elegant website with menu management via CMS. Mobile-first with focus on booking and contact.',

    // Services
    'services.pretitle': 'SERVICES',
    'services.title': 'Everything you need in Framer',
    'services.s1.title': 'Web design & development',
    'services.s1.desc': 'Complete websites built in Framer \u2014 from concept to launch. Responsive design, fast loading, optimized SEO.',
    'services.s2.title': 'Framer migration',
    'services.s2.desc': 'Move your existing website to Framer. Keep your design, get better performance and easier management.',
    'services.s3.title': 'CMS & content',
    'services.s3.desc': 'Framer\'s CMS for dynamic content \u2014 blog, products, team members. You update, the site stays fast.',
    'services.s4.title': 'SEO & performance',
    'services.s4.desc': 'Optimized sites that rank high. Technical SEO, Core Web Vitals, metadata \u2014 all built in from the start.',
    'services.s5.title': 'Workshops & training',
    'services.s5.desc': 'Teach your team to work in Framer. Hands-on workshops tailored to your level and needs.',
    'services.s6.title': 'Support & maintenance',
    'services.s6.desc': 'Ongoing support for your Framer site. Updates, fixes, new pages \u2014 I\'m here.',

    // Contact
    'contact.pretitle': 'CONTACT',
    'contact.title': 'Ready to build something great?',
    'contact.description': 'Tell me about your project. I\'ll get back to you within 24 hours.',
    'contact.email': 'Send email',

    // Footer
    'footer.tagline': 'Built with Framer expertise'
  }
};

let currentLang = localStorage.getItem('framerexpert-lang') || 'sv';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('framerexpert-lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update page title
  document.title = lang === 'sv'
    ? 'Sanna Granqvist | Framer Expert Sverige'
    : 'Sanna Granqvist | Framer Expert Sweden';

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = lang === 'sv'
      ? 'Sveriges ledande Framer-expert. Jag bygger snabba, vackra webbplatser i Framer som konverterar.'
      : 'Sweden\'s leading Framer expert. I build fast, beautiful websites in Framer that convert.';
  }

  // Highlight active toggle option
  document.querySelectorAll('[data-lang]').forEach((el) => {
    el.classList.toggle('is-active', el.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      setLanguage(currentLang === 'sv' ? 'en' : 'sv');
    });
  }
});
