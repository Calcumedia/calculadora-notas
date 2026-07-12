import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateWeightedAverage,
  parseAcademicNumber,
  validateAcademicRow,
} from '../calculator-core.mjs';

test('calcula la media ponderada conocida y se muestra como 7,33', () => {
  const result = calculateWeightedAverage([
    { subject: 'A', grade: '8', credits: '6' },
    { subject: 'B', grade: '6', credits: '3' },
  ]);

  assert.equal(result.status, 'valid');
  assert.equal(result.totalCredits, 9);
  assert.equal(result.average.toFixed(2), '7.33');
});

test('acepta la nota cero', () => {
  const row = validateAcademicRow({ grade: '0', credits: '6' });
  assert.equal(row.valid, true);

  const result = calculateWeightedAverage([{ grade: '0', credits: '6' }]);
  assert.equal(result.status, 'valid');
  assert.equal(result.average, 0);
});

test('rechaza notas superiores a 10', () => {
  const result = calculateWeightedAverage([{ grade: '10.01', credits: '6' }]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
});

test('acepta el límite 10 y rechaza notas negativas o no numéricas', () => {
  assert.equal(
    calculateWeightedAverage([{ grade: '10', credits: '6' }]).status,
    'valid',
  );
  assert.equal(
    calculateWeightedAverage([{ grade: '-0.01', credits: '6' }]).status,
    'invalid',
  );
  assert.equal(
    calculateWeightedAverage([{ grade: 'sobresaliente', credits: '6' }]).status,
    'invalid',
  );
});

test('rechaza créditos iguales o inferiores a cero', () => {
  for (const credits of ['0', '-1']) {
    const result = calculateWeightedAverage([{ grade: '8', credits }]);
    assert.equal(result.status, 'invalid');
    assert.equal(result.average, null);
  }
});

test('acepta coma y punto decimal', () => {
  assert.equal(parseAcademicNumber('8,5'), 8.5);
  assert.equal(parseAcademicNumber('8.5'), 8.5);

  const result = calculateWeightedAverage([
    { grade: '8,5', credits: '4,5' },
    { grade: '7.5', credits: '1.5' },
  ]);
  assert.equal(result.status, 'valid');
  assert.equal(result.average, 8.25);
});

test('una nota sin créditos bloquea el resultado', () => {
  const result = calculateWeightedAverage([{ grade: '8', credits: '' }]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
});

test('unos créditos sin nota bloquean el resultado', () => {
  const result = calculateWeightedAverage([{ grade: '', credits: '6' }]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
});

test('un nombre de asignatura sin datos numéricos cuenta como fila iniciada', () => {
  const result = calculateWeightedAverage([
    { subject: 'Estadística', grade: '', credits: '' },
  ]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
});

test('las filas totalmente vacías no bloquean el cálculo', () => {
  const result = calculateWeightedAverage([
    { subject: '', grade: '', credits: '' },
    { subject: 'Estadística', grade: '8', credits: '6' },
  ]);
  assert.equal(result.status, 'valid');
  assert.equal(result.average, 8);
});

test('una fila formada solo por espacios se considera vacía', () => {
  const result = calculateWeightedAverage([
    { subject: '   ', grade: ' ', credits: '\t' },
  ]);
  assert.equal(result.status, 'empty');
  assert.equal(result.average, null);
});

test('una fila inválida impide mostrar una media parcial de otras filas', () => {
  const result = calculateWeightedAverage([
    { subject: 'Completa', grade: '8', credits: '6' },
    { subject: 'Incompleta', grade: '9', credits: '' },
  ]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
  assert.equal(result.totalCredits, 0);
});
