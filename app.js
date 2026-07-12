import { calculateWeightedAverage } from './calculator-core.mjs';
import { createSafeAnalyticsEvent } from './analytics-core.mjs';

const ANALYTICS_ID = 'G-RJ2WS9XR5F';
const GA_DISABLE_KEY = 'ga-disable-' + ANALYTICS_ID;
const STORAGE = {
  theme: 'calcumedia_theme',
  language: 'calcumedia_lang',
  consent: 'calcumedia_analytics_consent',
};

const translations = {
  es: {
    documentTitle: 'Calculadora de nota media universitaria ponderada por ECTS',
    metaDescription: 'Calcula gratis tu nota media universitaria ponderada por créditos ECTS. Resultado claro, privado y adaptado a móvil.',
    socialTitle: 'Calculadora de nota media universitaria',
    socialDescription: 'Calcula tu media ponderada por créditos ECTS de forma gratuita y clara.',
    brandLabel: 'Volver a CalcuMedia Uni',
    languageLabel: 'Seleccionar idioma',
    themeDarkLabel: 'Activar modo oscuro',
    themeLightLabel: 'Activar modo claro',
    formulaLabel: 'Fórmula de la media ponderada',
    eyebrow: 'Herramienta universitaria gratuita',
    title: 'Calculadora de nota media',
    subtitle: 'Calcula tu media ponderada usando la nota y los créditos ECTS de cada asignatura. Los créditos se utilizan únicamente como peso en el cálculo.',
    resultTitle: 'Resultado del cálculo',
    weightedLabel: 'Nota media ponderada',
    basedOn: 'Basada en',
    credits: 'créditos ECTS',
    statusLabel: 'Estado',
    emptyStatus: 'Sin calcular',
    emptyDetail: 'Añade al menos una nota y sus créditos.',
    readyStatus: 'Cálculo completo',
    readyDetail: 'Todas las filas iniciadas son válidas.',
    reviewStatus: 'Revisa los datos',
    reviewDetail: 'No mostramos una media provisional para evitar confusiones.',
    initialMessage: 'Introduce tus asignaturas para empezar.',
    readyMessage: 'Tu media ponderada está lista.',
    reviewMessage: 'Completa o corrige las filas marcadas.',
    subjectsTitle: 'Asignaturas incluidas',
    addSubject: 'Añadir asignatura',
    copySummary: 'Copiar resumen',
    copied: 'Resumen copiado',
    clearAll: 'Limpiar todo',
    warning: 'Revisa las filas marcadas. Cada fila iniciada necesita una nota entre 0 y 10 y créditos superiores a 0.',
    subject: 'Asignatura',
    grade: 'Nota',
    subjectPlaceholder: 'Ej.: Estadística',
    gradePlaceholder: '0,0',
    creditsPlaceholder: '6',
    subjectLabel: 'Nombre de la asignatura',
    gradeLabel: 'Nota entre 0 y 10',
    creditsLabel: 'Créditos ECTS superiores a 0',
    removeLabel: 'Eliminar asignatura',
    privacyTitle: 'Tus datos se quedan aquí.',
    privacyText: ' Las notas, los créditos y los nombres de asignatura no se envían a CalcuMedia ni a Google Analytics.',
    methodTitle: 'Qué calcula exactamente',
    methodText: 'La herramienta aplica una media ponderada: las asignaturas con más créditos tienen más peso en el resultado.',
    officialNote: 'El resultado es matemático, no una certificación oficial. Revisa las reglas de tu universidad, beca o convocatoria.',
    apaTitle: '¿Preparando un TFG, TFM o trabajo?',
    apaText: 'Crea una primera versión de tus referencias con el generador APA 7 de CalcuMedia y revísalas antes de entregar.',
    apaButton: 'Abrir generador APA',
    studentTitle: 'Ventaja para estudiantes',
    studentText: 'Prime Student puede ser útil para libros, material universitario, envíos y entretenimiento durante el curso.',
    studentButton: 'Ver Prime Student',
    affiliateNote: 'Enlace de afiliado: CalcuMedia puede recibir una comisión sin coste adicional para ti.',
    limitsTitle: 'Cómo interpretar el resultado',
    limitsText: 'La media se muestra sobre 10. Para un trámite oficial, comprueba qué asignaturas, reconocimientos y reglas de redondeo aplica la institución correspondiente.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: '¿Por qué se utilizan los créditos ECTS?',
    faq1a: 'Porque representan el peso o carga de cada asignatura. Una materia de 12 ECTS influye el doble que una de 6 ECTS en esta media.',
    faq2q: '¿Qué filas se incluyen en el cálculo?',
    faq2a: 'Se incluyen las filas que tienen nota y créditos válidos. Las filas totalmente vacías se ignoran; si empiezas una fila, debes completarla antes de obtener el resultado.',
    faq3q: '¿Puedo usar el resultado en una solicitud oficial?',
    faq3a: 'Puedes usarlo como comprobación personal. Para solicitudes oficiales debes seguir las reglas y documentos exigidos por la universidad o entidad convocante.',
    cookieSettings: 'Preferencias de analítica',
    consentTitle: 'Analítica opcional',
    consentText: 'Podemos medir visitas y clics para mejorar la herramienta. No enviamos tus notas, créditos ni asignaturas. Puedes aceptar o rechazar con la misma facilidad.',
    reject: 'Rechazar',
    accept: 'Aceptar',
    summary: (grade, credits) => 'Mi nota media ponderada es ' + grade + '/10, calculada sobre ' + credits + ' créditos ECTS con CalcuMedia Uni.',
  },
  en: {
    documentTitle: 'Weighted Grade Average Calculator by ECTS Credits',
    metaDescription: 'Calculate your weighted grade average by ECTS credits for free. Clear, private and mobile-friendly.',
    socialTitle: 'Weighted Grade Average Calculator',
    socialDescription: 'Calculate your weighted grade average by ECTS credits for free.',
    brandLabel: 'Back to CalcuMedia Uni',
    languageLabel: 'Select language',
    themeDarkLabel: 'Turn on dark mode',
    themeLightLabel: 'Turn on light mode',
    formulaLabel: 'Weighted average formula',
    eyebrow: 'Free university tool',
    title: 'Weighted Grade Average Calculator',
    subtitle: 'Calculate a weighted average using each subject grade and its ECTS credits. Credits are used only as the weight in the calculation.',
    resultTitle: 'Calculation result',
    weightedLabel: 'Weighted grade average',
    basedOn: 'Based on',
    credits: 'ECTS credits',
    statusLabel: 'Status',
    emptyStatus: 'Not calculated',
    emptyDetail: 'Add at least one grade and its credits.',
    readyStatus: 'Calculation complete',
    readyDetail: 'Every started row is valid.',
    reviewStatus: 'Check your data',
    reviewDetail: 'We hide provisional averages to avoid confusion.',
    initialMessage: 'Enter your subjects to begin.',
    readyMessage: 'Your weighted average is ready.',
    reviewMessage: 'Complete or correct the highlighted rows.',
    subjectsTitle: 'Included subjects',
    addSubject: 'Add subject',
    copySummary: 'Copy summary',
    copied: 'Summary copied',
    clearAll: 'Clear all',
    warning: 'Check the highlighted rows. Every started row needs a grade from 0 to 10 and credits greater than 0.',
    subject: 'Subject',
    grade: 'Grade',
    subjectPlaceholder: 'e.g. Statistics',
    gradePlaceholder: '0.0',
    creditsPlaceholder: '6',
    subjectLabel: 'Subject name',
    gradeLabel: 'Grade from 0 to 10',
    creditsLabel: 'ECTS credits greater than 0',
    removeLabel: 'Remove subject',
    privacyTitle: 'Your data stays here.',
    privacyText: ' Grades, credits and subject names are not sent to CalcuMedia or Google Analytics.',
    methodTitle: 'What this calculates',
    methodText: 'The tool applies a weighted average: subjects carrying more credits have more influence on the result.',
    officialNote: 'This is a mathematical result, not an official certificate. Check the rules used by your university, scholarship or application.',
    apaTitle: 'Working on an essay or dissertation?',
    apaText: 'Create a first draft of your references with CalcuMedia’s APA 7 generator and review them before submitting.',
    apaButton: 'Open APA generator',
    studentTitle: 'Student benefit',
    studentText: 'Prime Student may help with books, university supplies, delivery and entertainment during term.',
    studentButton: 'View Prime Student',
    affiliateNote: 'Affiliate link: CalcuMedia may receive a commission at no additional cost to you.',
    limitsTitle: 'How to interpret the result',
    limitsText: 'The average is shown on a 10-point scale. For an official application, check which subjects, recognised credits and rounding rules the relevant institution uses.',
    faqTitle: 'Frequently asked questions',
    faq1q: 'Why are ECTS credits used?',
    faq1a: 'They represent each subject’s weight or workload. A 12-credit subject influences this average twice as much as a 6-credit subject.',
    faq2q: 'Which rows are included in the calculation?',
    faq2a: 'Rows with a valid grade and credit value are included. Completely empty rows are ignored; once you start a row, complete it before a result is shown.',
    faq3q: 'Can I use this result in an official application?',
    faq3a: 'Use it as a personal check. For official applications, follow the rules and documents required by the university or awarding body.',
    cookieSettings: 'Analytics preferences',
    consentTitle: 'Optional analytics',
    consentText: 'We can measure visits and clicks to improve this tool. We do not send grades, credits or subject names. Accepting and rejecting are equally easy.',
    reject: 'Reject',
    accept: 'Accept',
    summary: (grade, credits) => 'My weighted grade average is ' + grade + '/10, calculated across ' + credits + ' ECTS credits with CalcuMedia Uni.',
  },
};

const state = {
  language: readStorage(STORAGE.language) === 'en' ? 'en' : 'es',
  valid: false,
  grade: null,
  credits: 0,
  rowId: 0,
  analyticsLoaded: false,
};

const elements = {};

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
    // The calculator still works when storage is unavailable.
  }
}

function t(key) {
  return translations[state.language][key];
}

function loadAnalytics() {
  if (readStorage(STORAGE.consent) !== 'granted') return;

  window[GA_DISABLE_KEY] = false;
  if (state.analyticsLoaded) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    return;
  }

  state.analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', ANALYTICS_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.dataset.calcumediaAnalytics = 'true';
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS_ID;
  script.addEventListener('error', () => {
    state.analyticsLoaded = false;
    script.remove();
  }, { once: true });
  document.head.appendChild(script);
}

function clearAnalyticsCookies() {
  try {
    const names = document.cookie
      .split(';')
      .map((cookie) => cookie.split('=')[0].trim())
      .filter((name) => name.startsWith('_ga'));
    const hostname = window.location.hostname;
    const domains = ['', hostname, '.' + hostname];

    names.forEach((name) => {
      domains.forEach((domain) => {
        const domainPart = domain ? '; domain=' + domain : '';
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domainPart;
      });
    });
  } catch {
    // Cookie access can be unavailable without affecting the calculator.
  }
}

function disableAnalytics() {
  window[GA_DISABLE_KEY] = true;
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }
  clearAnalyticsCookies();
}

function track(eventName, parameters = {}) {
  if (readStorage(STORAGE.consent) !== 'granted' || typeof window.gtag !== 'function') return;
  const event = createSafeAnalyticsEvent(eventName, state.language, parameters);
  if (!event) return;
  window.gtag('event', event.name, event.parameters);
}

function setConsent(value) {
  writeStorage(STORAGE.consent, value);
  elements.consent.hidden = true;

  if (value === 'granted') {
    loadAnalytics();
    track('analytics_consent_granted');
  } else {
    disableAnalytics();
  }
}

function showConsentSettings() {
  elements.consent.hidden = false;
  elements.reject.focus();
}

function updateThemeControl() {
  const dark = document.documentElement.classList.contains('dark');
  elements.theme.textContent = dark ? '☀️' : '🌙';
  elements.theme.setAttribute('aria-pressed', String(dark));
  elements.theme.setAttribute('aria-label', dark ? t('themeLightLabel') : t('themeDarkLabel'));
}

function applyTheme() {
  const saved = readStorage(STORAGE.theme);
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = saved === 'dark' || (saved !== 'light' && systemDark);
  document.documentElement.classList.toggle('dark', dark);
  updateThemeControl();
}

function toggleTheme() {
  const dark = !document.documentElement.classList.contains('dark');
  document.documentElement.classList.toggle('dark', dark);
  writeStorage(STORAGE.theme, dark ? 'dark' : 'light');
  updateThemeControl();
  track('theme_changed', { theme: dark ? 'dark' : 'light' });
}

function updateMetadata() {
  document.title = t('documentTitle');
  elements.metaDescription.content = t('metaDescription');
  elements.ogTitle.content = t('socialTitle');
  elements.ogDescription.content = t('socialDescription');
  elements.twitterTitle.content = t('socialTitle');
  elements.twitterDescription.content = t('socialDescription');
}

function updateRowLanguage(row) {
  row.querySelector('.subject-input').placeholder = t('subjectPlaceholder');
  row.querySelector('.grade-input').placeholder = t('gradePlaceholder');
  row.querySelector('.credits-input').placeholder = t('creditsPlaceholder');
  row.querySelector('.subject-label').textContent = t('subjectLabel');
  row.querySelector('.grade-label').textContent = t('gradeLabel');
  row.querySelector('.credits-label').textContent = t('creditsLabel');
  const remove = row.querySelector('.remove');
  remove.setAttribute('aria-label', t('removeLabel'));
  remove.title = t('removeLabel');
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  elements.language.value = state.language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (typeof value === 'string') element.textContent = value;
  });
  document.querySelectorAll('.subject-row').forEach(updateRowLanguage);
  elements.brand.setAttribute('aria-label', t('brandLabel'));
  elements.language.setAttribute('aria-label', t('languageLabel'));
  elements.formula.setAttribute('aria-label', t('formulaLabel'));
  updateMetadata();
  updateThemeControl();
  calculate();
}

function changeLanguage() {
  state.language = elements.language.value === 'en' ? 'en' : 'es';
  writeStorage(STORAGE.language, state.language);
  applyLanguage();
  track('language_changed', { selected_language: state.language });
}

function associateLabel(label, input, id) {
  input.id = id;
  label.htmlFor = id;
}

function addRow(manual = true) {
  state.rowId += 1;
  const fragment = elements.template.content.cloneNode(true);
  const row = fragment.querySelector('.subject-row');
  const subjectInput = row.querySelector('.subject-input');
  const gradeInput = row.querySelector('.grade-input');
  const creditsInput = row.querySelector('.credits-input');

  row.dataset.rowId = String(state.rowId);
  associateLabel(row.querySelector('.subject-label'), subjectInput, 'subject-' + state.rowId);
  associateLabel(row.querySelector('.grade-label'), gradeInput, 'grade-' + state.rowId);
  associateLabel(row.querySelector('.credits-label'), creditsInput, 'credits-' + state.rowId);
  updateRowLanguage(row);

  row.querySelectorAll('input').forEach((input) => input.addEventListener('input', calculate));
  row.querySelector('.remove').addEventListener('click', () => {
    const focusTarget =
      row.nextElementSibling?.querySelector('.subject-input') ||
      row.previousElementSibling?.querySelector('.subject-input');
    row.remove();
    if (!elements.rows.children.length) addRow(false);
    calculate();
    track('subject_row_removed', { visible_rows: elements.rows.children.length });
    (focusTarget?.isConnected ? focusTarget : elements.rows.querySelector('.subject-input') || elements.add).focus();
  });

  elements.rows.appendChild(fragment);
  if (manual) {
    track('subject_row_added', { visible_rows: elements.rows.children.length });
    subjectInput.focus();
  }
}

function setFieldValidity(field, valid) {
  field.classList.toggle('invalid', !valid);
  if (valid) {
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  } else {
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', 'input-warning');
  }
}

function calculate() {
  const rowElements = Array.from(document.querySelectorAll('.subject-row'));
  const rows = rowElements.map((row) => ({
    subject: row.querySelector('.subject-input').value,
    grade: row.querySelector('.grade-input').value,
    credits: row.querySelector('.credits-input').value,
  }));
  const result = calculateWeightedAverage(rows);

  result.rows.forEach((validatedRow, index) => {
    const row = rowElements[index];
    setFieldValidity(
      row.querySelector('.grade-input'),
      !validatedRow.started || !validatedRow.errors.grade,
    );
    setFieldValidity(
      row.querySelector('.credits-input'),
      !validatedRow.started || !validatedRow.errors.credits,
    );
  });

  elements.warning.hidden = result.status !== 'invalid';
  state.valid = result.status === 'valid';
  state.grade = result.average;
  state.credits = result.totalCredits;
  elements.copy.disabled = !state.valid;
  elements.status.classList.remove('ready', 'review');

  if (result.status === 'valid') {
    elements.grade.textContent = result.average.toFixed(2);
    elements.totalCredits.textContent = Number(result.totalCredits.toFixed(2)).toString();
    elements.status.textContent = t('readyStatus');
    elements.status.classList.add('ready');
    elements.statusDetail.textContent = t('readyDetail');
    elements.message.textContent = t('readyMessage');
  } else if (result.status === 'invalid') {
    elements.grade.textContent = '—';
    elements.totalCredits.textContent = '0';
    elements.status.textContent = t('reviewStatus');
    elements.status.classList.add('review');
    elements.statusDetail.textContent = t('reviewDetail');
    elements.message.textContent = t('reviewMessage');
  } else {
    elements.grade.textContent = '—';
    elements.totalCredits.textContent = '0';
    elements.status.textContent = t('emptyStatus');
    elements.statusDetail.textContent = t('emptyDetail');
    elements.message.textContent = t('initialMessage');
  }
}

async function copySummary() {
  if (!state.valid) return;
  const summary = t('summary')(
    state.grade.toFixed(2),
    Number(state.credits.toFixed(2)),
  );

  try {
    await navigator.clipboard.writeText(summary);
    const original = elements.copy.textContent;
    elements.copy.textContent = t('copied');
    window.setTimeout(() => {
      elements.copy.textContent = original;
    }, 1600);
    track('summary_copied');
  } catch {
    elements.copy.textContent = t('copySummary');
  }
}

function clearAll() {
  elements.rows.textContent = '';
  state.rowId = 0;
  addRow(false);
  addRow(false);
  calculate();
  track('calculator_cleared');
  elements.rows.querySelector('.subject-input').focus();
}

function cacheElements() {
  elements.metaDescription = document.getElementById('meta-description');
  elements.ogTitle = document.getElementById('og-title');
  elements.ogDescription = document.getElementById('og-description');
  elements.twitterTitle = document.getElementById('twitter-title');
  elements.twitterDescription = document.getElementById('twitter-description');
  elements.brand = document.getElementById('brand-link');
  elements.language = document.getElementById('language');
  elements.theme = document.getElementById('theme-toggle');
  elements.formula = document.getElementById('formula');
  elements.grade = document.getElementById('final-grade');
  elements.totalCredits = document.getElementById('total-credits');
  elements.status = document.getElementById('calculation-status');
  elements.statusDetail = document.getElementById('status-detail');
  elements.message = document.getElementById('motivational-message');
  elements.rows = document.getElementById('rows');
  elements.template = document.getElementById('row-template');
  elements.warning = document.getElementById('input-warning');
  elements.add = document.getElementById('add-row');
  elements.copy = document.getElementById('copy-summary');
  elements.consent = document.getElementById('analytics-consent');
  elements.accept = document.getElementById('accept-analytics');
  elements.reject = document.getElementById('reject-analytics');
}

function bindEvents() {
  elements.language.addEventListener('change', changeLanguage);
  elements.theme.addEventListener('click', toggleTheme);
  elements.add.addEventListener('click', () => addRow(true));
  elements.copy.addEventListener('click', copySummary);
  document.getElementById('clear-all').addEventListener('click', clearAll);
  elements.accept.addEventListener('click', () => setConsent('granted'));
  elements.reject.addEventListener('click', () => setConsent('denied'));
  document.getElementById('cookie-settings').addEventListener('click', showConsentSettings);
  document.querySelectorAll('[data-event]').forEach((element) => {
    element.addEventListener('click', () => track(element.dataset.event));
  });
  document.querySelectorAll('details').forEach((detail, index) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) track('faq_opened', { faq_number: index + 1 });
    });
  });
}

function initializeConsent() {
  const consent = readStorage(STORAGE.consent);
  if (consent === 'granted') {
    loadAnalytics();
  } else if (consent === 'denied') {
    disableAnalytics();
  } else {
    elements.consent.hidden = false;
  }
}

function initialize() {
  cacheElements();
  bindEvents();
  addRow(false);
  addRow(false);
  applyTheme();
  applyLanguage();
  initializeConsent();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
