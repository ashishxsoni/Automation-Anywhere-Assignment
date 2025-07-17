/**
 * Author: Ashish Soni
 * Project: Automation Anywhere SDET Assignment
 * GitHub: https://github.com/ashishxsoni/Automation-Anywhere-Assignment
 * Copyright (c) 2025. All rights reserved.
 * Any reproduction without proper credit is unethical.
 */

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
    forgotPasswordLink: () =>
      cy.contains("Forgot password?", { timeout: 10000 }),
    validationErrors: () => cy.get(".message__title", { timeout: 10000 }),
  };

  // 2. Page Actions
  visit() {
    cy.log("Base URL is: " + Cypress.config("baseUrl"));
    cy.visit("/#/login", {
      timeout: 90000,
     
      onBeforeLoad: () => {},
      onLoad: () => {},
    });

   
    cy.get('input[name="username"]', { timeout: 15000 }).should("be.visible");
   

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

  login(username, password) {
    this.visit()
    .typeUsername(username)
    .typePassword(password)
    .clickLogin();

    cy.url({ timeout: 15000 }).should("include", "/#/home");
    return this;
  }
  logout() {
    cy.get('button[name="mysettings"]', { timeout: 10000 }).click();
    cy.contains("Log out", { timeout: 10000 }).click();
    cy.url({ timeout: 15000 }).should("include", "/#/login");
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
