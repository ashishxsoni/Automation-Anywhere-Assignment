/**
 * Author: Ashish Soni
 * Project: Automation Anywhere SDET Assignment
 * GitHub: https://github.com/ashishxsoni/Automation-Anywhere-Assignment
 * Copyright (c) 2025. All rights reserved.
 * Any reproduction without proper credit is unethical.
 */


class BotPage {
  elements = {
    createBotButton: () =>
      cy.contains('button', 'Create a bot…', { timeout: 15000 }),

    botNameInput: () =>
      cy.get('input[name="name"]', { timeout: 15000 }),

    createAndEditBtn: () =>
      cy.get('button[name="submit"]').contains('Create & edit', { timeout: 15000 }),

    errorMessage: () =>
      cy.get('.message__title', { timeout: 15000 }),

    createDialogTitle: () =>
      cy.contains("h1", "Create Task Bot", { timeout: 15000 }),

 platformWindowsOption: () =>
  cy.get('[data-value="WINDOWS"]:visible', { timeout: 15000 }).first(),

    automationSidebar: () =>
      cy.get('a[name="automations"]', { timeout: 15000 }),

    modalContent: () =>
      cy.get(".modal-form__content", { timeout: 15000 }),
  };

  clickCreateBot() {
   this.elements.createBotButton().click({ force: true }); // Fix overlap issue
    return this;
  }

  typeBotName(name) {
    this.elements.botNameInput().clear().type(name);
    return this;
  }

  submitBotCreation() {
     this.elements.platformWindowsOption().click({ force: true }); // Ensure platform selected
    this.elements.createAndEditBtn().click();
    return this;
  }

 assertCreateDialogVisible() {
  this.elements.createDialogTitle().should('contain.text', 'Create Task Bot', { timeout: 15000 });

  this.elements.modalContent().should("be.visible", { timeout: 15000 }).within(() => {
    cy.get('input[name="name"]', { timeout: 15000 }).should("have.attr", "placeholder", "Required");
    cy.get('input[name="description"]', { timeout: 15000 }).should("have.attr", "maxlength", "255");
    cy.contains("Create & edit", { timeout: 15000 }).should("be.visible");
  });

  return this;
}


assertBotNameErrorIfExists() {
  const expectedText = "Unable to create a file or folder with the name";
  
  return cy.get("body", { timeout: 5000 }).then(($body) => {
    if ($body.find(".message__title").length) {
      return cy.get(".message__title").invoke("text").then((text) => {
        return text.includes(expectedText);
      });
    }
    return false;
  });
}



}

export default BotPage;
