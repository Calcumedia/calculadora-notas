(() => {
  'use strict';

  const ANALYTICS_ID = 'G-RJ2WS9XR5F';
  const STORAGE = {
    theme: 'calcumedia_theme',
    language: 'calcumedia_lang',
    consent: 'calcumedia_analytics_consent'
  };

  const translations = {
    es: {
      eyebrow: 'Herramienta universitaria gratuita',
      title: 'Calculadora de nota media',
      subtitle: 'Calcula tu media ponderada usando la nota y los créditos ECTS de cada asignatura. Sin convertirla a una escala europea universal que no existe.',
      resultTitle: 'Resultado del cálculo',
      weightedLabel: 'Nota media ponderada', basedOn: 'Basada en', credits: 'créditos ECTS',
      statusLabel: 'Estado', emptyStatus: 'Sin calcular', emptyDetail: 'Añade al menos una nota y sus créditos.',
      readyStatus: 'Cálculo completo', readyDetail: 'Todas las filas iniciadas son válidas.',
      reviewStatus: 'Revisa los datos', reviewDetail: 'No mostramos una media provisional para evitar confusiones.',
      initialMessage: 'Introduce tus asignaturas para empezar.', readyMessage: 'Tu media ponderada está lista.', reviewMessage: 'Completa o corrige las filas marcadas.',
      subjectsTitle: 'Asignaturas incluidas', addSubject: 'Añadir asignatura', copySummary: 'Copiar resumen', copied: 'Resumen copiado', clearAll: 'Limpiar todo',
      warning: 'Revisa las filas marcadas. Cada fila iniciada necesita una nota entre 0 y 10 y créditos superiores a 0.',
      subject: 'Asignatura', grade: 'Nota', subjectPlaceholder: 'Ej.: Estadística', gradePlaceholder: '0,0', creditsPlaceholder: '6',
      subjectLabel: 'Nombre de la asignatura', gradeLabel: 'Nota entre 0 y 10', creditsLabel: 'Créditos ECTS superiores a 0', removeLabel: 'Eliminar asignatura',
      privacyTitle: 'Tus datos se quedan aquí.', privacyText: ' Las notas, los créditos y los nombres de asignatura no se envían a CalcuMedia ni a Google Analytics.',
      methodTitle: 'Qué calcula exactamente', methodText: 'La herramienta aplica una media ponderada: las asignaturas con más créditos tienen más peso en el resultado.',
      officialNote: 'El resultado es matemático, no una certificación oficial. Revisa las reglas de tu universidad, beca o convocatoria.',
      apaTitle: '¿Preparando un TFG, TFM o trabajo?', apaText: 'Crea una primera versión de tus referencias con el generador APA 7 de CalcuMedia y revísalas antes de entregar.', apaButton: 'Abrir generador APA',
      studentTitle: 'Ventaja para estudiantes', studentText: 'Prime Student puede ser útil para libros, material universitario, envíos y entretenimiento durante el curso.', studentButton: 'Ver Prime Student', affiliateNote: 'Enlace de afiliado: CalcuMedia puede recibir una comisión sin coste adicional para ti.',
      limitsTitle: 'Límites importantes', limitsText: 'No convertimos automáticamente tu resultado a letras ECTS, GPA u otras escalas. Esas conversiones dependen del sistema, la institución y, en ocasiones, de tablas de distribución concretas.',
      faqTitle: 'Preguntas frecuentes', faq1q: '¿Por qué se utilizan los créditos ECTS?', faq1a: 'Porque representan el peso o carga de cada asignatura. Una materia de 12 ECTS influye el doble que una de 6 ECTS en esta media.',
      faq2q: '¿Por qué ya no aparece una letra A, B, C, D, E o F?', faq2a: 'Porque no existe una tabla universal vigente que permita convertir cualquier nota de 0 a 10 directamente a una letra ECTS. Mostrarla podría inducir a error.',
      faq3q: '¿Puedo usar el resultado en una solicitud oficial?', faq3a: 'Puedes usarlo como comprobación personal. Para solicitudes oficiales debes seguir las reglas y documentos exigidos por la universidad o entidad convocante.',
      cookieSettings: 'Preferencias de analítica', consentTitle: 'Analítica opcional', consentText: 'Podemos medir visitas y clics para mejorar la herramienta. No enviamos tus notas, créditos ni asignaturas. Puedes aceptar o rechazar con la misma facilidad.', reject: 'Rechazar', accept: 'Aceptar',
      summary: (grade, credits) => `Mi nota media ponderada es ${grade}/10, calculada sobre ${credits} créditos ECTS con CalcuMedia Uni.`
    },
    en: {
      eyebrow: 'Free university tool',
      title: 'Weighted grade average calculator',
      subtitle: 'Calculate a weighted average using each subject grade and its ECTS credits. We do not convert it into a supposed universal European grading scale.',
      resultTitle: 'Calculation result',
      weightedLabel: 'Weighted grade average', basedOn: 'Based on', credits: 'ECTS credits',
      statusLabel: 'Status', emptyStatus: 'Not calculated', emptyDetail: 'Add at least one grade and its credits.',
      readyStatus: 'Calculation complete', readyDetail: 'Every started row is valid.',
      reviewStatus: 'Check your data', reviewDetail: 'We hide provisional averages to avoid confusion.',
      initialMessage: 'Enter your subjects to begin.', readyMessage: 'Your weighted average is ready.', reviewMessage: 'Complete or correct the highlighted rows.',
      subjectsTitle: 'Included subjects', addSubject: 'Add subject', copySummary: 'Copy summary', copied: 'Summary copied', clearAll: 'Clear all',
      warning: 'Check the highlighted rows. Every started row needs a grade from 0 to 10 and credits greater than 0.',
      subject: 'Subject', grade: 'Grade', subjectPlaceholder: 'e.g. Statistics', gradePlaceholder: '0.0', creditsPlaceholder: '6',
      subjectLabel: 'Subject name', gradeLabel: 'Grade from 0 to 10', creditsLabel: 'ECTS credits greater than 0', removeLabel: 'Remove subject',
      privacyTitle: 'Your data stays here.', privacyText: ' Grades, credits and subject names are not sent to CalcuMedia or Google Analytics.',
      methodTitle: 'What this calculates', methodText: 'The tool applies a weighted average: subjects carrying more credits have more influence on the result.',
      officialNote: 'This is a mathematical result, not an official certificate. Check the rules used by your university, scholarship or application.',
      apaTitle: 'Working on an essay or dissertation?', apaText: 'Create a first draft of your references with CalcuMedia’s APA 7 generator and review them before submitting.', apaButton: 'Open APA generator',
      studentTitle: 'Student benefit', studentText: 'Prime Student may help with books, university supplies, delivery and entertainment during term.', studentButton: 'View Prime Student', affiliateNote: 'Affiliate link: CalcuMedia may receive a commission at no additional cost to you.',
      limitsTitle: 'Important limitations', limitsText: 'We do not automatically convert the result into ECTS letters, GPA or other scales. Those conversions depend on the grading system, institution and sometimes specific distribution tables.',
      faqTitle: 'Frequently asked questions', faq1q: 'Why are ECTS credits used?', faq1a: 'They represent each subject’s weight or workload. A 12-credit subject influences this average twice as much as a 6-credit subject.',
      faq2q: 'Why is there no A, B, C, D, E or F letter?', faq2a: 'There is no current universal table that converts every 0–10 grade directly into an ECTS letter. Displaying one could be misleading.',
      faq3q: 'Can I use this result in an official application?', faq3a: 'Use it as a personal check. For official applications, follow the rules and documents required by the university or awarding body.',
      cookieSettings: 'Analytics preferences', consentTitle: 'Optional analytics', consentText: 'We can measure visits and clicks to improve this tool. We do not send grades, credits or subject names. Accepting and rejecting are equally easy.', reject: 'Reject', accept: 'Accept',
      summary: (grade, credits) => `My weighted grade average is ${grade}/10, calculated across ${credits} ECTS credits with CalcuMedia Uni.`
    }
  };

  const state = {
    language: localStorage.getItem(STORAGE.language) === 'en' ? 'en' : 'es',
    valid: false,
    grade: null,
    credits: 0,
    rowId: 0,
    analyticsLoaded: false
  };

  const elements = {};

  function parseNumber(value) {
    const normalized = String(value).trim().replace(',', '.');
    if (!normalized) return Number.NaN;
    return Number(normalized);
  }

  function isValidGrade(value) {
    return Number.isFinite(value) && value >= 0 && value <= 10;
  }

  function isValidCredits(value) {
    return Number.isFinite(value) && value > 0;
  }

  function t(key) {
    return translations[state.language][key];
  }

  function loadAnalytics() {
    if (state.analyticsLoaded || localStorage.getItem(STORAGE.consent) !== 'granted') return;
    state.analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID, { anonymize_ip: true });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
    document.head.appendChild(script);
  }

  function track(eventName, parameters = {}) {
    if (localStorage.getItem(STORAGE.consent) !== 'granted' || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, {
      tool: 'weighted_grade_calculator',
      language: state.language,
      ...parameters
    });
  }

  function setConsent(value) {
    localStorage.setItem(STORAGE.consent, value);
    elements.consent.hidden = true;
    if (value === 'granted') {
      loadAnalytics();
      track('analytics_consent_granted');
    }
  }

  function showConsentSettings() {
    elements.consent.hidden = false;
    elements.reject.focus();
  }

  function applyTheme() {
    const saved = localStorage.getItem(STORAGE.theme);
    const dark = saved === 'dark';
    document.documentElement.classList.toggle('dark', dark);
    elements.theme.textContent = dark ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const dark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(STORAGE.theme, dark ? 'dark' : 'light');
    elements.theme.textContent = dark ? '☀️' : '🌙';
    track('theme_changed', { theme: dark ? 'dark' : 'light' });
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
      const key = element.dataset.i18n;
      const value = t(key);
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('.subject-row').forEach(updateRowLanguage);
    calculate();
  }

  function changeLanguage() {
    state.language = elements.language.value === 'en' ? 'en' : 'es';
    localStorage.setItem(STORAGE.language, state.language);
    applyLanguage();
    track('language_changed', { selected_language: state.language });
  }

  function addRow(manual = true) {
    state.rowId += 1;
    const fragment = elements.template.content.cloneNode(true);
    const row = fragment.querySelector('.subject-row');
    row.dataset.rowId = String(state.rowId);
    updateRowLanguage(row);

    row.querySelectorAll('input').forEach((input) => input.addEventListener('input', calculate));
    row.querySelector('.remove').addEventListener('click', () => {
      row.remove();
      if (!elements.rows.children.length) addRow(false);
      calculate();
      track('subject_row_removed', { visible_rows: elements.rows.children.length });
    });

    elements.rows.appendChild(fragment);
    if (manual) {
      track('subject_row_added', { visible_rows: elements.rows.children.length });
      row.querySelector('.subject-input').focus();
    }
  }

  function setFieldValidity(field, valid) {
    field.classList.toggle('invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
  }

  function calculate() {
    let weightedTotal = 0;
    let creditTotal = 0;
    let validRows = 0;
    let invalidRows = 0;
    let anyInput = false;

    document.querySelectorAll('.subject-row').forEach((row) => {
      const gradeInput = row.querySelector('.grade-input');
      const creditsInput = row.querySelector('.credits-input');
      const gradeText = gradeInput.value.trim();
      const creditsText = creditsInput.value.trim();
      const started = Boolean(gradeText || creditsText);

      gradeInput.classList.remove('invalid');
      creditsInput.classList.remove('invalid');
      gradeInput.removeAttribute('aria-invalid');
      creditsInput.removeAttribute('aria-invalid');

      if (!started) return;
      anyInput = true;
      const grade = parseNumber(gradeText);
      const credits = parseNumber(creditsText);
      const gradeValid = isValidGrade(grade);
      const creditsValid = isValidCredits(credits);

      setFieldValidity(gradeInput, gradeValid);
      setFieldValidity(creditsInput, creditsValid);

      if (gradeValid && creditsValid) {
        weightedTotal += grade * credits;
        creditTotal += credits;
        validRows += 1;
      } else {
        invalidRows += 1;
      }
    });

    elements.warning.hidden = invalidRows === 0;
    state.valid = validRows > 0 && invalidRows === 0;
    state.grade = state.valid ? weightedTotal / creditTotal : null;
    state.credits = state.valid ? creditTotal : 0;
    elements.copy.disabled = !state.valid;

    elements.status.classList.remove('ready', 'review');

    if (state.valid) {
      elements.grade.textContent = state.grade.toFixed(2);
      elements.totalCredits.textContent = Number(state.credits.toFixed(2)).toString();
      elements.status.textContent = t('readyStatus');
      elements.status.classList.add('ready');
      elements.statusDetail.textContent = t('readyDetail');
      elements.message.textContent = t('readyMessage');
    } else if (anyInput) {
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
    const summary = t('summary')(state.grade.toFixed(2), Number(state.credits.toFixed(2)));
    try {
      await navigator.clipboard.writeText(summary);
      const original = elements.copy.textContent;
      elements.copy.textContent = t('copied');
      setTimeout(() => { elements.copy.textContent = original; }, 1600);
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
  }

  function cacheElements() {
    elements.language = document.getElementById('language');
    elements.theme = document.getElementById('theme-toggle');
    elements.grade = document.getElementById('final-grade');
    elements.totalCredits = document.getElementById('total-credits');
    elements.status = document.getElementById('calculation-status');
    elements.statusDetail = document.getElementById('status-detail');
    elements.message = document.getElementById('motivational-message');
    elements.rows = document.getElementById('rows');
    elements.template = document.getElementById('row-template');
    elements.warning = document.getElementById('input-warning');
    elements.copy = document.getElementById('copy-summary');
    elements.consent = document.getElementById('analytics-consent');
    elements.accept = document.getElementById('accept-analytics');
    elements.reject = document.getElementById('reject-analytics');
  }

  function bindEvents() {
    elements.language.addEventListener('change', changeLanguage);
    elements.theme.addEventListener('click', toggleTheme);
    document.getElementById('add-row').addEventListener('click', () => addRow(true));
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
    const consent = localStorage.getItem(STORAGE.consent);
    if (consent === 'granted') loadAnalytics();
    if (consent !== 'granted' && consent !== 'denied') elements.consent.hidden = false;
  }

  function initialize() {
    cacheElements();
    bindEvents();
    applyTheme();
    applyLanguage();
    addRow(false);
    addRow(false);
    calculate();
    initializeConsent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
