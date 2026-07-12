# Calculadora de nota media — CalcuMedia Uni

Calculadora web estática de nota media universitaria ponderada por créditos ECTS. Las notas y asignaturas se procesan dentro del navegador.

## Estructura

- index.html: contenido y estructura de la página.
- styles.css: diseño, modo oscuro y adaptación a móvil.
- app.js: comportamiento de la interfaz, idioma, consentimiento y accesibilidad.
- politica-cookies.html: segunda capa de información sobre cookies, analítica y retirada del consentimiento.
- cookie-policy.js: idioma y tema de la política de cookies; no carga analítica.
- calculator-core.mjs: validación y cálculo matemático compartido con las pruebas.
- analytics-core.mjs: lista cerrada de eventos y parámetros permitidos en Analytics.
- test/: pruebas de cálculo, privacidad y regresiones del código público.

## Ejecutar las pruebas

Se necesita Node.js 20 o posterior. No hay dependencias que instalar.

~~~sh
npm test
~~~

También pueden ejecutarse directamente:

~~~sh
node --test
~~~

La comprobación completa utilizada antes de proponer cambios valida además la sintaxis:

~~~sh
npm run check
~~~

## Límites técnicos de seguridad

Para impedir cálculos desbordados o resultados no finitos, el motor admite como máximo 120 créditos por fila y 1.200 créditos en total. Son límites técnicos de esta aplicación, no reglas académicas ni institucionales.

Además, el cálculo rechaza cualquier entrada u operación que produzca `Infinity`, `-Infinity` o `NaN`. Una fila iniciada, incompleta o inválida bloquea siempre el resultado definitivo.

## Comprobar el consentimiento

Después de ejecutar `npm run check`, revisa manualmente estos recorridos en español e inglés:

1. Sin una decisión guardada, aparece el aviso y Analytics no se carga.
2. Rechazar oculta el aviso, mantiene Analytics desactivado y no impide calcular.
3. El enlace «Más información» abre `politica-cookies.html`.
4. «Preferencias de analítica», en el pie, vuelve a abrir el aviso y enfoca la opción de rechazar.
5. Aceptar carga Analytics solo después del clic.
6. Reabrir las preferencias y rechazar retira el consentimiento sin impedir calcular.
7. La política y la calculadora siguen siendo legibles y utilizables en móvil y escritorio.

## Comprobar la página en local

Como la interfaz usa módulos JavaScript, debe abrirse mediante un servidor HTTP:

~~~sh
python3 -m http.server 4173
~~~

Después, abre http://127.0.0.1:4173/ y comprueba la versión de escritorio y la móvil.
