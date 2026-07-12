import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const [index, app, calculator, analytics, styles] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'app.js'), 'utf8'),
  readFile(resolve(root, 'calculator-core.mjs'), 'utf8'),
  readFile(resolve(root, 'analytics-core.mjs'), 'utf8'),
  readFile(resolve(root, 'styles.css'), 'utf8'),
]);
const productionSource = index + '\n' + app + '\n' + calculator + '\n' + analytics;

test('la interfaz usa el mismo motor matemático que las pruebas', () => {
  assert.match(
    index,
    /<script(?=[^>]*\bsrc=["']app\.js["'])(?=[^>]*\btype=["']module["'])[^>]*>/,
  );
  assert.match(
    app,
    /import\s*\{\s*calculateWeightedAverage\s*\}\s*from\s*['"]\.\/calculator-core\.mjs['"]/,
  );
  assert.match(app, /calculateWeightedAverage\s*\(\s*rows\s*\)/);
  assert.doesNotMatch(app, /function parseNumber\(/);
  assert.doesNotMatch(app, /weightedTotal \+=/);
});

test('no reaparecen textos ni reglas de conversión fija', () => {
  assert.match(app, /Weighted Grade Average Calculator/);
  assert.doesNotMatch(productionSource, /\bGPA\b/i);
  assert.doesNotMatch(
    productionSource,
    /equivalenc|ECTS letters|letras ECTS|A,\s*B,\s*C/i,
  );
  assert.doesNotMatch(
    productionSource,
    /(?:grade|nota|average|media)[\s\S]{0,160}>=\s*9[\s\S]{0,160}['"]A['"]/i,
  );
  assert.doesNotMatch(productionSource, /['"][A-F]['"]/);
  assert.doesNotMatch(productionSource, /ects-equivalent|equivalencia_ects|labelErasmus/i);
});

test('Analytics no se carga desde el HTML y usa una lista cerrada', () => {
  assert.doesNotMatch(index, /googletagmanager|gtag\(/i);
  assert.match(app, /readStorage\(STORAGE\.consent\) !== 'granted'/);
  assert.match(app, /createSafeAnalyticsEvent\(eventName, state\.language, parameters\)/);
  assert.match(analytics, /SAFE_PARAMETERS_BY_EVENT/);
  assert.doesNotMatch(analytics, /\.\.\.candidateParameters/);
  assert.equal((app.match(/window\.gtag\('event'/g) || []).length, 1);
  assert.match(app, /window\.gtag\('event', event\.name, event\.parameters\)/);
});

test('aceptar y rechazar tienen exactamente la misma clase visual', () => {
  const reject = index.match(/<button id="reject-analytics"([^>]*)>/);
  const accept = index.match(/<button id="accept-analytics"([^>]*)>/);
  assert.ok(reject);
  assert.ok(accept);

  const rejectClass = reject[1].match(/class="([^"]+)"/)[1];
  const acceptClass = accept[1].match(/class="([^"]+)"/)[1];
  assert.equal(rejectClass, acceptClass);
  assert.match(styles, /\.button\.consent-choice/);
});

test('se conservan accesibilidad, reducción de movimiento y enlaces de producto', () => {
  assert.match(app, /label\.htmlFor = id/);
  assert.match(app, /aria-describedby/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(index, /\son[a-z]+=/i);
  assert.match(index, /https:\/\/calcumedia\.github\.io\/generador-apa\//);
  assert.match(index, /https:\/\/www\.amazon\.es\/joinstudent\?tag=calcumedia-21/);
  assert.match(index, /rel="noopener noreferrer sponsored"/);
  assert.match(index, /Enlace de afiliado/);
});

test('la versión pública no depende de Tailwind Play CDN', () => {
  assert.doesNotMatch(productionSource, /cdn\.tailwindcss\.com/i);
});
