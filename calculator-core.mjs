// Technical safety limits only. They are not academic or institutional rules.
export const MAX_CREDITS_PER_ROW = 120;
export const MAX_TOTAL_CREDITS = 1200;

function totalCreditsTolerance(value) {
  return Number.EPSILON * Math.max(Math.abs(value), MAX_TOTAL_CREDITS) * 16;
}

function exceedsTotalCreditsLimit(value) {
  return value - MAX_TOTAL_CREDITS > totalCreditsTolerance(value);
}

function normalizeTotalCredits(value) {
  return Math.abs(value - MAX_TOTAL_CREDITS) <= totalCreditsTolerance(value)
    ? MAX_TOTAL_CREDITS
    : value;
}

export function finiteProduct(left, right) {
  const result = left * right;
  return Number.isFinite(result) ? result : null;
}

export function finiteSum(left, right) {
  const result = left + right;
  return Number.isFinite(result) ? result : null;
}

export function finiteQuotient(numerator, denominator) {
  if (!Number.isFinite(denominator) || denominator <= 0) return null;
  const result = numerator / denominator;
  return Number.isFinite(result) ? result : null;
}

export function parseAcademicNumber(value) {
  const normalized = String(value ?? '').trim().replace(',', '.');
  if (normalized === '') return Number.NaN;
  return Number(normalized);
}

export function validateAcademicRow(row) {
  const subject = String(row.subject ?? '').trim();
  const gradeText = String(row.grade ?? '').trim();
  const creditsText = String(row.credits ?? '').trim();
  const started = subject !== '' || gradeText !== '' || creditsText !== '';

  if (!started) {
    return {
      started: false,
      valid: false,
      subject,
      grade: Number.NaN,
      credits: Number.NaN,
      errors: {},
    };
  }

  const grade = parseAcademicNumber(gradeText);
  const credits = parseAcademicNumber(creditsText);
  const errors = {
    grade: gradeText === '' || !Number.isFinite(grade) || grade < 0 || grade > 10,
    credits:
      creditsText === '' ||
      !Number.isFinite(credits) ||
      credits <= 0 ||
      credits > MAX_CREDITS_PER_ROW,
  };

  return {
    started: true,
    valid: !errors.grade && !errors.credits,
    subject,
    grade,
    credits,
    errors,
  };
}

export function calculateWeightedAverage(rows) {
  const validatedRows = rows.map(validateAcademicRow);
  const startedRows = validatedRows.filter((row) => row.started);

  if (startedRows.length === 0) {
    return {
      status: 'empty',
      average: null,
      totalCredits: 0,
      completedRows: 0,
      rows: validatedRows,
    };
  }

  const invalidRows = startedRows.filter((row) => !row.valid);
  if (invalidRows.length > 0) {
    return {
      status: 'invalid',
      average: null,
      totalCredits: 0,
      completedRows: startedRows.filter((row) => row.valid).length,
      rows: validatedRows,
    };
  }

  let totalCredits = 0;
  let weightedTotal = 0;

  for (const row of startedRows) {
    const weightedValue = finiteProduct(row.grade, row.credits);
    const nextTotalCredits = finiteSum(totalCredits, row.credits);
    const nextWeightedTotal =
      weightedValue === null ? null : finiteSum(weightedTotal, weightedValue);

    if (
      weightedValue === null ||
      nextTotalCredits === null ||
      nextWeightedTotal === null ||
      exceedsTotalCreditsLimit(nextTotalCredits)
    ) {
      return {
        status: 'invalid',
        average: null,
        totalCredits: 0,
        completedRows: startedRows.length,
        rows: validatedRows,
      };
    }

    totalCredits = normalizeTotalCredits(nextTotalCredits);
    weightedTotal = nextWeightedTotal;
  }

  const average = finiteQuotient(weightedTotal, totalCredits);
  if (average === null) {
    return {
      status: 'invalid',
      average: null,
      totalCredits: 0,
      completedRows: startedRows.length,
      rows: validatedRows,
    };
  }

  return {
    status: 'valid',
    average,
    totalCredits,
    completedRows: startedRows.length,
    rows: validatedRows,
  };
}
