TP – Automatización de Registro de Cliente (Cypress)

Este proyecto automatiza el formulario de registro de cliente del sitio ticketazo.com.ar, cumpliendo los requisitos del trabajo práctico:

Uso de 2 fixtures: register.ok.json y register.bad.json

Creación de custom commands reutilizables

Casos positivos y negativos

Tests independientes de la capa de red

Configuración de baseUrl → https://ticketazo.com.ar

Instrucciones de ejecución:
- npm install
- npx cypress open

Estructura:
cypress/
  e2e/register/
  fixtures/
  support/
  utils/
cypress.config.js
README.md