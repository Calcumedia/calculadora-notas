const isTheme = (value) => value === 'dark' || value === 'light';
const isLanguage = (value) => value === 'es' || value === 'en';
const isSmallCount = (value) =>
  Number.isInteger(value) && value >= 0 && value <= 100;

const SAFE_PARAMETERS_BY_EVENT = Object.freeze({
  analytics_consent_granted: {},
  theme_changed: { theme: isTheme },
  language_changed: { selected_language: isLanguage },
  subject_row_added: { visible_rows: isSmallCount },
  subject_row_removed: { visible_rows: isSmallCount },
  summary_copied: {},
  calculator_cleared: {},
  faq_opened: { faq_number: isSmallCount },
  open_apa: {},
  open_prime: {},
});

export function createSafeAnalyticsEvent(eventName, language, candidateParameters = {}) {
  if (!Object.prototype.hasOwnProperty.call(SAFE_PARAMETERS_BY_EVENT, eventName)) {
    return null;
  }

  const parameters = {
    tool: 'weighted_grade_calculator',
    language: language === 'en' ? 'en' : 'es',
  };

  Object.entries(SAFE_PARAMETERS_BY_EVENT[eventName]).forEach(([key, validator]) => {
    const value = candidateParameters[key];
    if (validator(value)) parameters[key] = value;
  });

  return {
    name: eventName,
    parameters,
  };
}
