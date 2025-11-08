// Creación de comandos
Cypress.Commands.add('completarNombres', (nombre) => {
  cy.get('[data-cy="input-nombres"]').clear().type(nombre)
})

Cypress.Commands.add('completarApellidos', (apellido) => {
  cy.get('[data-cy="input-apellido"]').clear().type(apellido)
})

Cypress.Commands.add('completarTelefono', (telefono) => {
  cy.get('[data-cy="input-telefono"]').clear().type(telefono)
})

Cypress.Commands.add('completarDni', (dni) => {
  cy.get('[data-cy="input-dni"]').clear().type(dni)
})

Cypress.Commands.add('completarProvincia', (provincia) => {
  cy.get('[data-cy="select-provincia"]').clear().type(provincia)
  cy.get('ul > li > span').contains(provincia).click()
})

Cypress.Commands.add('completarLocalidad', (localidad) => {
  cy.get('[data-cy="select-localidad"]').clear().type(localidad)
  cy.get('ul > li > span').contains(localidad).click()
})

Cypress.Commands.add('completarFechaNacimiento', (dia, mes, anio) => {
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').clear().type(dia)
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').clear().type(mes)
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').clear().type(anio)
})

Cypress.Commands.add('completarEmail', (email) => {
  cy.get('[data-cy="input-email"]').clear().type(email)
})

Cypress.Commands.add('completarConfirmarEmail', (email) => {
  cy.get('[data-cy="input-confirmar-email"]').clear().type(email)
})

Cypress.Commands.add('completarPassword', (password) => {
  cy.get('[data-cy="input-password"]').clear().type(password)
})

Cypress.Commands.add('completarConfirmarPassword', (password) => {
  cy.get('[data-cy="input-repetir-password"]').clear().type(password)
})
