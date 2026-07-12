# Calculadora de nota media — CalcuMedia Uni

Calculadora web estática de nota media universitaria ponderada por créditos ECTS. Las notas y asignaturas se procesan dentro del navegador.

## Estructura

- index.html: contenido y estructura de la página.
- styles.css: diseño, modo oscuro y adaptación a móvil.
- app.js: comportamiento de la interfaz, idioma, consentimiento y accesibilidad.
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

## Comprobar la página en local

Como la interfaz usa módulos JavaScript, debe abrirse mediante un servidor HTTP:

~~~sh
python3 -m http.server 4173
~~~

Después, abre http://127.0.0.1:4173/ y comprueba la versión de escritorio y la móvil.
