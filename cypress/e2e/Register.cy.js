//Test positivo
describe("Registro de cliente - positivo", () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerClient');
  });

  it("Registro exitoso con datos reales (fixture ok)", () => {
    cy.fixture("register.ok.json").then((data) => {

      cy.write("nombres", data.nombres);
      cy.write("apellido", data.apellido);
      cy.write("dni", data.dni);

      cy.setBirthDate(data.fechaNacimiento);

      cy.write("email", data.email);
      cy.write("password", data.password);
      cy.write("telefono", data.telefono);

      cy.selectCombo("provincia", data.provincia);
      cy.selectCombo("localidad", data.localidad);

      cy.submitForm();

      cy.contains("Registro completado").should("be.visible");

    });
  });
});

//Test negativo
describe("Registro de cliente - negativo", () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerClient');
  });

  it("Muestra errores de validación con datos inválidos (fixture bad)", () => {
    cy.fixture("register.bad.json").then((data) => {

      cy.write("nombres", data.nombres);
      cy.write("apellido", data.apellido);
      cy.write("dni", data.dni);

      cy.setBirthDate(data.fechaNacimiento);

      cy.write("email", data.email);
      cy.write("password", data.password);
      cy.write("telefono", data.telefono);

      cy.submitForm();

      cy.contains("El nombre es obligatorio").should("be.visible");
      cy.contains("El apellido es obligatorio").should("be.visible");
      cy.contains("DNI inválido").should("be.visible");
      cy.contains("Correo electrónico inválido").should("be.visible");
      cy.contains("Contraseña muy corta").should("be.visible");

    });
  });
});

