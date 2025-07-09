class LoginPage {
  // 1. Page Elements
  elements = {
    usernameInput: () => cy.get('input[name="username"]', { timeout: 10000 }),
    passwordInput: () => cy.get('input[name="password"]', { timeout: 10000 }),
    eyeIcon: () =>
      cy.get('.textinput-cell--after button[type="button"]', {
        timeout: 10000,
      }),

    rememberCheckbox: () =>
      cy.get('input[name="rememberUsername"]', { timeout: 10000 }),
    loginButton: () => cy.get('button[name="submitLogin"]', { timeout: 10000 }),
    forgotPasswordLink: () => cy.contains("Forgot password?", { timeout: 10000 }),
    validationErrors: () => cy.get('.message__title', { timeout: 10000 }),
  };

  // 2. Page Actions
visit() {
  cy.log("Base URL is: " + Cypress.config("baseUrl"));
  cy.visit('/#/login', {
    timeout: 90000,
    // Skip waiting for window.onload
    onBeforeLoad: () => {},
    onLoad: () => {},
  });

  // Instead of relying on URL load or event,
  // wait for the actual login form to appear
  cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible');
  //  cy.url().should("include", "/#/login"); // or we an use this

  return this;
}

  typeUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  typePassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  togglePasswordVisibility() {
    this.elements.eyeIcon().click();
    return this;
  }

  toggleRememberMe(shouldCheck = true) {
    this.elements.rememberCheckbox().then(($el) => {
      if (!$el.is(":disabled")) {
        shouldCheck
          ? cy.wrap($el).check({ force: true })
          : cy.wrap($el).uncheck({ force: true });
      }
    });
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }

  clickForgotPassword() {
    this.elements.forgotPasswordLink().click();
    return this;
  }

    logout() {
    cy.get('button[name="mysettings"]', { timeout: 10000 }).click();
    cy.contains('Log out', { timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should('include', '/#/login');
    return this;
  }

  // 3. Assertions
  assertPasswordIsMasked() {
    this.elements.passwordInput().should("have.attr", "type", "password");
    return this;
  }

  assertPasswordIsVisible() {
    this.elements.passwordInput().should("have.attr", "type", "text");
    return this;
  }

  assertValidationError(message) {
    this.elements.validationErrors().should("contain.text", message);
    return this;
  }
}

export default LoginPage;
