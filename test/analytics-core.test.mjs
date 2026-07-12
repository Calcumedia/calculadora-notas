import test from 'node:test';
import assert from 'node:assert/strict';

import { createSafeAnalyticsEvent } from '../analytics-core.mjs';

test('Analytics descarta notas, créditos, asignaturas y medias', () => {
  const event = createSafeAnalyticsEvent('theme_changed', 'es', {
    theme: 'dark',
    grade: 9,
    nota_media: 9,
    credits: 240,
    creditos_totales: 240,
    subject: 'Dato privado',
    average: 9,
    user_input: 'Dato privado',
  });

  assert.deepEqual(event, {
    name: 'theme_changed',
    parameters: {
      tool: 'weighted_grade_calculator',
      language: 'es',
      theme: 'dark',
    },
  });
});

test('Analytics solo acepta eventos incluidos expresamente', () => {
  assert.equal(
    createSafeAnalyticsEvent('evento_inventado', 'es', { value: 'privado' }),
    null,
  );
});

test('los eventos sin parámetros no reenvían contenido candidato', () => {
  const event = createSafeAnalyticsEvent('summary_copied', 'en', {
    summary: 'Texto copiado por el usuario',
    credits: 60,
  });

  assert.deepEqual(event, {
    name: 'summary_copied',
    parameters: {
      tool: 'weighted_grade_calculator',
      language: 'en',
    },
  });
});

test('los únicos parámetros de interacción permitidos son primitivos seguros', () => {
  const event = createSafeAnalyticsEvent('subject_row_added', 'es', {
    visible_rows: 3,
  });
  assert.equal(event.parameters.visible_rows, 3);

  const rejected = createSafeAnalyticsEvent('subject_row_added', 'es', {
    visible_rows: { private: true },
  });
  assert.equal('visible_rows' in rejected.parameters, false);

  const secretDisguisedAsTheme = createSafeAnalyticsEvent('theme_changed', 'es', {
    theme: 'Nombre de asignatura privado',
  });
  assert.equal('theme' in secretDisguisedAsTheme.parameters, false);
});
