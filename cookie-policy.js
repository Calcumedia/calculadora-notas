(() => {
  'use strict';

  const STORAGE = {
    theme: 'calcumedia_theme',
    language: 'calcumedia_lang',
  };

  const copy = {
    es: {
      title: 'Política de cookies | CalcuMedia Uni',
      description: 'Información sobre las cookies, Google Analytics y las preferencias de analítica de la calculadora de CalcuMedia Uni.',
      brandLabel: 'Volver a la calculadora',
      languageLabel: 'Seleccionar idioma',
      themeDarkLabel: 'Activar modo oscuro',
      themeLightLabel: 'Activar modo claro',
    },
    en: {
      title: 'Cookie policy | CalcuMedia Uni',
      description: 'Information about cookies, Google Analytics and analytics preferences for the CalcuMedia Uni calculator.',
      brandLabel: 'Back to the calculator',
      languageLabel: 'Select language',
      themeDarkLabel: 'Turn on dark mode',
      themeLightLabel: 'Turn on light mode',
    },
  };

  const elements = {};
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  let language = requestedLanguage === 'en' || requestedLanguage === 'es'
    ? requestedLanguage
    : readStorage(STORAGE.language) === 'en' ? 'en' : 'es';

  function readStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // The policy remains readable when storage is unavailable.
    }
  }

  function updateThemeControl() {
    const dark = document.documentElement.classList.contains('dark');
    elements.theme.textContent = dark ? '☀️' : '🌙';
    elements.theme.setAttribute('aria-pressed', String(dark));
    elements.theme.setAttribute(
      'aria-label',
      dark ? copy[language].themeLightLabel : copy[language].themeDarkLabel,
    );
  }

  function applyTheme() {
    const saved = readStorage(STORAGE.theme);
    const systemDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (saved !== 'light' && systemDark);
    document.documentElement.classList.toggle('dark', dark);
    updateThemeControl();
  }

  function toggleTheme() {
    const dark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', dark);
    writeStorage(STORAGE.theme, dark ? 'dark' : 'light');
    updateThemeControl();
  }

  function applyLanguage() {
    document.documentElement.lang = language;
    document.title = copy[language].title;
    elements.metaDescription.content = copy[language].description;
    elements.language.value = language;
    elements.language.setAttribute('aria-label', copy[language].languageLabel);
    elements.brand.setAttribute('aria-label', copy[language].brandLabel);
    document.querySelectorAll('[data-policy-language]').forEach((article) => {
      article.hidden = article.dataset.policyLanguage !== language;
    });
    updateThemeControl();
  }

  function initialize() {
    elements.metaDescription = document.getElementById('policy-meta-description');
    elements.brand = document.getElementById('policy-brand-link');
    elements.language = document.getElementById('policy-language');
    elements.theme = document.getElementById('policy-theme-toggle');

    elements.language.addEventListener('change', () => {
      language = elements.language.value === 'en' ? 'en' : 'es';
      writeStorage(STORAGE.language, language);
      applyLanguage();
    });
    elements.theme.addEventListener('click', toggleTheme);

    applyTheme();
    applyLanguage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
