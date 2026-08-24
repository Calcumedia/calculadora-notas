import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateWeightedAverage,
  finiteProduct,
  finiteQuotient,
  finiteSum,
  MAX_CREDITS_PER_ROW,
  MAX_TOTAL_CREDITS,
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

test('rechaza créditos superiores al máximo técnico por fila', () => {
  const boundary = calculateWeightedAverage([
    { grade: '8', credits: String(MAX_CREDITS_PER_ROW) },
  ]);
  assert.equal(boundary.status, 'valid');

  const result = calculateWeightedAverage([
    { grade: '8', credits: String(MAX_CREDITS_PER_ROW + 0.01) },
  ]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
});

test('rechaza un total de créditos superior al máximo técnico', () => {
  const rowsAtBoundary = Array.from(
    { length: MAX_TOTAL_CREDITS / MAX_CREDITS_PER_ROW },
    () => ({ grade: '8', credits: String(MAX_CREDITS_PER_ROW) }),
  );
  const boundary = calculateWeightedAverage(rowsAtBoundary);
  assert.equal(boundary.status, 'valid');
  assert.equal(boundary.totalCredits, MAX_TOTAL_CREDITS);

  const result = calculateWeightedAverage([
    ...rowsAtBoundary,
    { grade: '8', credits: '1' },
  ]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
  assert.equal(result.totalCredits, 0);
  assert.equal(result.rows.every((row) => row.valid), true);
});

test('rechaza valores capaces de convertirse en Infinity o -Infinity', () => {
  for (const row of [
    { grade: '1e309', credits: '6' },
    { grade: '-1e309', credits: '6' },
    { grade: '8', credits: '1e309' },
    { grade: '8', credits: '-1e309' },
  ]) {
    const result = calculateWeightedAverage([row]);
    assert.equal(result.status, 'invalid');
    assert.equal(result.average, null);
  }
});

test('nunca devuelve productos, sumas o resultados no finitos', () => {
  const result = calculateWeightedAverage([
    { grade: '1e309', credits: '1e309' },
    { grade: 'NaN', credits: '120' },
  ]);
  assert.equal(result.status, 'invalid');
  assert.equal(result.average, null);
  assert.equal(Number.isFinite(result.totalCredits), true);
});

test('las operaciones defensivas rechazan desbordamientos y divisiones inválidas', () => {
  assert.equal(finiteProduct(Number.MAX_VALUE, 2), null);
  assert.equal(finiteProduct(Number.NaN, 2), null);
  assert.equal(finiteSum(Number.MAX_VALUE, Number.MAX_VALUE), null);
  assert.equal(finiteSum(Number.POSITIVE_INFINITY, 1), null);
  assert.equal(finiteQuotient(Number.MAX_VALUE, Number.MIN_VALUE), null);
  assert.equal(finiteQuotient(10, 0), null);
  assert.equal(finiteQuotient(10, Number.NaN), null);

  assert.equal(finiteProduct(8, 6), 48);
  assert.equal(finiteSum(48, 18), 66);
  assert.equal(finiteQuotient(66, 9), 66 / 9);
});

test('el máximo técnico sigue produciendo un resultado finito', () => {
  const result = calculateWeightedAverage(
    Array.from(
      { length: MAX_TOTAL_CREDITS / MAX_CREDITS_PER_ROW },
      () => ({ grade: '10', credits: String(MAX_CREDITS_PER_ROW) }),
    ),
  );
  assert.equal(result.status, 'valid');
  assert.equal(result.average, 10);
  assert.equal(Number.isFinite(result.average), true);
  assert.equal(Number.isFinite(result.totalCredits), true);
});

test('no confunde el redondeo binario decimal con un exceso del límite total', () => {
  const exactBoundary = calculateWeightedAverage([
    ...Array.from({ length: 10 }, () => ({ grade: '8', credits: '108.2' })),
    { grade: '8', credits: '118' },
  ]);
  assert.equal(exactBoundary.status, 'valid');
  assert.equal(exactBoundary.totalCredits, MAX_TOTAL_CREDITS);
  assert.equal(exactBoundary.average.toFixed(2), '8.00');

  const actualExcess = calculateWeightedAverage([
    ...Array.from({ length: 10 }, () => ({ grade: '8', credits: '108.2' })),
    { grade: '8', credits: '118.000001' },
  ]);
  assert.equal(actualExcess.status, 'invalid');
  assert.equal(actualExcess.average, null);
});
