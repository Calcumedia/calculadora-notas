# CalcuMedia Uni — reglas de trabajo

Estas reglas se aplican a cualquier cambio realizado por Codex o por otro colaborador en este repositorio.

## Exactitud académica

- No presentar una conversión de notas como oficial sin una fuente institucional concreta y vigente.
- No convertir automáticamente una nota de 0–10 a letras ECTS.
- Explicar que los créditos ECTS se usan como peso para calcular la media, no como una escala universal de calificaciones.
- Las afirmaciones sobre becas, universidades o convocatorias deben indicar su fuente y fecha de vigencia.
- El resultado debe identificarse como un cálculo matemático que no sustituye al documento oficial de una institución.

## Privacidad y analítica

- No enviar notas, créditos, nombres de asignaturas, medias ni texto introducido por el usuario a Analytics.
- Analytics solo puede cargarse después de un consentimiento explícito.
- Aceptar y rechazar la analítica deben tener la misma visibilidad y facilidad de uso.
- Todo evento de Analytics debe pasar por la lista cerrada de eventos y parámetros de analytics-core.mjs.
- La calculadora debe seguir funcionando aunque el almacenamiento local o Analytics no estén disponibles.

## Código y calidad

- La lógica de cálculo de producción debe usar calculator-core.mjs; no duplicarla dentro de la interfaz.
- Una fila totalmente vacía se ignora. Cualquier fila iniciada, incompleta o inválida bloquea el resultado definitivo.
- Mantener separados estructura (index.html), presentación (styles.css) y comportamiento (app.js).
- No usar Tailwind Play CDN ni dependencias declaradas solo para desarrollo en producción.
- Conservar navegación por teclado, etiquetas accesibles, mensajes de error comprensibles y prefers-reduced-motion.
- Toda corrección de cálculo, privacidad o terminología debe incluir una prueba de regresión.
- Ejecutar npm test y una comprobación real en navegador antes de proponer una integración en main.
- No hacer merge ni publicar cambios en main sin revisión.
