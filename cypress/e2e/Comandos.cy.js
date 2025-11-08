//EJERCICIO 1 - Custom commands

describe('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser') 
  })

  it('Completa todos los campos y presiona Registrar', () => {

    cy.log('Ingresando nombres, apellidos, celular y dni')
    cy.get('[data-cy="input-nombres"]').clear().type('Juan')
    cy.get('[data-cy="input-apellido"]').clear().type('Pérez')
    cy.get('[data-cy="input-telefono"]').clear().type('3511234567')
    cy.get('[data-cy="input-dni"]').clear().type('20268800')

    cy.log('Seleccionar provincia y localidad')
    cy.get('[data-cy="select-provincia"]').clear().type('Córdoba')
    cy.get('ul > li > span').contains('Córdoba').click()
    cy.get('[data-cy="select-localidad"]').clear().type('Córdoba')
    cy.get('ul > li > span').contains('Córdoba').click()


    cy.log('Ingresando fecha de nacimiento')
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').clear().type('15')
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').clear().type('08')
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').clear().type('1995')


    cy.log('Ingresando mail y confirmación')
    cy.get('[data-cy="input-email"]').clear().type('juan.perez90@example.com')
    cy.get('[data-cy="input-confirmar-email"]').clear().type('juan.perez90@example.com')

    cy.log('Ingresando contraseña y confirmación')
    cy.get('[data-cy="input-password"]').clear().type('P@ssw0rd123')
    cy.get('[data-cy="input-repetir-password"]').clear().type('P@ssw0rd123')


    cy.log('Enviar formulario')
    // cy.get('[data-cy="btn-registrarse"]').click().wait(2000)

  })

//EJERCICIO 2 - Email ya existente o registrado

  it('Debería mostrar un error al intentar registrar un email ya existente', () => {

    cy.log('Completar datos personales')
    cy.completarDatosPersonales('Juan', 'Pérez', '3511234567', '20268800')

    cy.log('Seleccionar provincia y localidad')
    cy.seleccionarUbicacion('Córdoba', 'Córdoba')

    cy.log('Completar fecha de nacimiento')
    cy.completarFechaNacimiento('15', '08', '1995')

    cy.log('Completar email ya registrado')
    cy.completarEmail('juan.perez90@example.com')

    cy.log('Completar contraseña')
    cy.completarPassword('P@ssw0rd123')

    cy.log('Enviar formulario')
    cy.enviarFormulario()

    cy.log('Verificar mensaje de error')
    cy.contains(/email ya registrado|correo ya existe|ya está en uso/i).should('be.visible')
  })

// EJERCICIO 3 - DNI ya existente 
  it('Debería mostrar un error al intentar registrar un DNI ya existente', () => {

    cy.log('Completar datos personales con DNI duplicado')
    
    cy.completarDatosPersonales('Juan', 'Pérez', '3511234567', '20268800')

    cy.log('Seleccionar provincia y localidad')
    cy.seleccionarUbicacion('Córdoba', 'Córdoba')

    cy.log('Completar fecha de nacimiento')
    cy.completarFechaNacimiento('15', '08', '1995')

    cy.log('Completar email válido')
    cy.completarEmail('juan.perez90@example.com')

    cy.log('Completar contraseña')
    cy.completarPassword('P@ssw0rd123')

    cy.log('Enviar formulario')
    cy.enviarFormulario()

    cy.log('Verificar mensaje de error por DNI duplicado')
    cy.contains(/dni ya registrado|dni existente|ya está en uso/i).should('be.visible')
  })

  // EJERCICIO 4 - Redirección con éxito 
  it('Redirige correctamente al login tras registro exitoso', () => {
    cy.log('Completando formulario con datos nuevos')

    cy.completarNombres('Juan')
    cy.completarApellidos('Pérez')
    cy.completarTelefono('3511234567')
    cy.completarDni('20999888')
    cy.completarProvincia('Córdoba')
    cy.completarLocalidad('Córdoba')
    cy.completarFechaNacimiento('15', '08', '1995')

    const emailNuevo = `juan.${Date.now()}@example.com` //Creo un DNI
    cy.completarEmail(emailNuevo)
    cy.completarConfirmarEmail(emailNuevo)

    cy.completarPassword('P@ssw0rd123')
    cy.completarConfirmarPassword('P@ssw0rd123')

    cy.log('Enviar formulario')
    cy.get('[data-cy="btn-registrarse"]').click()
    cy.wait(4000)

    cy.log('Verificar redirección a login')
    cy.url().should('eq', 'https://ticketazo.com.ar/auth/login')
  })

  // EJERCICIO 5 - Validación de requisitos de contraseña
  it('Muestra error si la contraseña no cumple los requisitos', () => {
    cy.log('Completando datos válidos excepto la contraseña')

    cy.completarNombres('Juan')
    cy.completarApellidos('Pérez')
    cy.completarTelefono('3511234567')
    cy.completarDni('20887766')
    cy.completarProvincia('Córdoba')
    cy.completarLocalidad('Córdoba')
    cy.completarFechaNacimiento('15', '08', '1995')
    cy.completarEmail('juan.pass.test@example.com')
    cy.completarConfirmarEmail('juan.pass.test@example.com')

    cy.log('Ingresar una contraseña inválida')
    cy.completarPassword('12345')
    cy.completarConfirmarPassword('12345')

    cy.log('Intentar enviar formulario')
    cy.get('[data-cy="btn-registrarse"]').click()

    cy.log('Verificar mensaje de error de contraseña')
    cy.contains('contraseña').should('be.visible')
  })
})
