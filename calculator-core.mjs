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
    credits: creditsText === '' || !Number.isFinite(credits) || credits <= 0,
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

  const totalCredits = startedRows.reduce((sum, row) => sum + row.credits, 0);
  const weightedTotal = startedRows.reduce(
    (sum, row) => sum + row.grade * row.credits,
    0,
  );

  return {
    status: 'valid',
    average: weightedTotal / totalCredits,
    totalCredits,
    completedRows: startedRows.length,
    rows: validatedRows,
  };
}
