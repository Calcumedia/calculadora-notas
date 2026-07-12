import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const [index, app, calculator, analytics, styles, policy, policyScript] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'app.js'), 'utf8'),
  readFile(resolve(root, 'calculator-core.mjs'), 'utf8'),
  readFile(resolve(root, 'analytics-core.mjs'), 'utf8'),
  readFile(resolve(root, 'styles.css'), 'utf8'),
  readFile(resolve(root, 'politica-cookies.html'), 'utf8'),
  readFile(resolve(root, 'cookie-policy.js'), 'utf8'),
]);
const productionSource =
  index + '\n' + app + '\n' + calculator + '\n' + analytics + '\n' + policy + '\n' + policyScript;

test('la interfaz usa el mismo motor matemático que las pruebas', () => {
  assert.match(
    index,
    /<script(?=[^>]*\bsrc=["']app\.js["'])(?=[^>]*\btype=["']module["'])[^>]*>/,
  );
  assert.match(
    app,
    /import\s*\{[\s\S]*?calculateWeightedAverage[\s\S]*?\}\s*from\s*['"]\.\/calculator-core\.mjs['"]/,
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
  assert.doesNotMatch(policy, /googletagmanager|gtag\(/i);
  assert.doesNotMatch(policyScript, /googletagmanager|gtag\(/i);
  assert.match(app, /readStorage\(STORAGE\.consent\) !== 'granted'/);
  assert.match(app, /createSafeAnalyticsEvent\(eventName, state\.language, parameters\)/);
  assert.match(analytics, /SAFE_PARAMETERS_BY_EVENT/);
  assert.doesNotMatch(analytics, /\.\.\.candidateParameters/);
  assert.equal((app.match(/window\.gtag\('event'/g) || []).length, 1);
  assert.match(app, /window\.gtag\('event', event\.name, event\.parameters\)/);
});

test('la política de cookies está enlazada desde el aviso y el pie en ambos idiomas', () => {
  assert.match(
    index,
    /id="cookie-more-link"[^>]*href="politica-cookies\.html"[^>]*data-i18n="cookieMore"/,
  );
  assert.match(
    index,
    /id="cookie-policy-link"[^>]*href="politica-cookies\.html"[^>]*data-i18n="cookiePolicy"/,
  );
  assert.match(app, /cookieMore:\s*'Más información'/);
  assert.match(app, /cookieMore:\s*'More information'/);
  assert.match(app, /cookiePolicy:\s*'Política de cookies'/);
  assert.match(app, /cookiePolicy:\s*'Cookie policy'/);
  assert.match(app, /politica-cookies\.html\?lang=/);
  assert.match(policyScript, /URLSearchParams\(window\.location\.search\)/);
});

test('la segunda capa describe GA4 y no contiene marcadores legales ficticios', () => {
  assert.match(policy, /G-RJ2WS9XR5F/);
  assert.match(policy, /<code>_ga<\/code>/);
  assert.match(policy, /_ga_&lt;ID del contenedor&gt;/);
  assert.match(policy, /calcumedia_analytics_consent/);
  assert.match(policy, /support\.google\.com\/analytics\/answer\/11397207/);
  assert.match(policy, /developers\.google\.com\/tag-platform\/security\/concepts\/consent-mode/);
  assert.match(policy, /no se ha localizado una razón social/i);
  assert.match(policy, /No legal company name[^.]*was found/i);
  assert.equal((policy.match(/class="policy-table-wrap" tabindex="0"/g) || []).length, 2);
  assert.doesNotMatch(policy, /TODO|PENDIENTE|TBD|INSERTAR|NOMBRE AQU[IÍ]/i);
});

test('los límites técnicos y las operaciones finitas quedan protegidos', () => {
  assert.match(calculator, /MAX_CREDITS_PER_ROW\s*=\s*120/);
  assert.match(calculator, /MAX_TOTAL_CREDITS\s*=\s*1200/);
  assert.match(calculator, /Number\.isFinite\(result\)/);
  assert.match(app, /MAX_CREDITS_PER_ROW/);
  assert.match(app, /MAX_TOTAL_CREDITS/);
});

test('la tabla de cookies no ensancha la página móvil', () => {
  assert.match(styles, /\.policy-content\s*\{[^}]*min-width:\s*0/);
  assert.match(styles, /\.policy-content section\s*\{[^}]*min-width:\s*0/);
  assert.match(styles, /\.policy-table-wrap\s*\{[^}]*max-width:\s*100%[^}]*min-width:\s*0/);
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
