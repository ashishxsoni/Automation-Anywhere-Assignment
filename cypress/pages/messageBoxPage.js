/**
 * Author: Ashish Soni
 * Project: Automation Anywhere SDET Assignment
 * GitHub: https://github.com/ashishxsoni/Automation-Anywhere-Assignment
 * Copyright (c) 2025. All rights reserved.
 * Any reproduction without proper credit is unethical.
 */


class MessageBoxPage {
  elements = {
    searchActionsInput: () =>
      cy.get('input[placeholder="Search actions"]', { timeout: 15000 }),

    messageBoxButton: () =>
      cy.get(
        ".editor-palette__accordion--is_active > .editor-palette-section > .editor-palette-section__scroller > .editor-palette-section__list > .editor-palette-group-container > .editor-palette-group__children > .editor-palette-item > .editor-palette-item__child > .rio-focus > .clipped-text > .clipped-text__string--for_presentation",
        { timeout: 10000 }
      ),

    messageBoxHeader: () =>
      cy.get("div.editor-details__header-title", { timeout: 10000 }),

    messageInput: () =>
      cy.get('div[contenteditable="true"][name="content"]', { timeout: 10000 }),

    saveButton: () =>
      cy.get('button[name="save"]', { timeout: 15000 }).should("be.visible"),

  canvasLabel: () =>
  cy.get('.taskbotnodelabel-details-string', { timeout: 15000 }),


    closeButton: () =>
  cy.get('button[name="close"]', { timeout: 15000 }).should("be.visible"),


    automationHeader: () =>
  cy.contains("span", "Automation", { timeout: 15000 }),

  };

  searchAndInsertMessageBox() {
    this.elements.searchActionsInput().clear().type("Message box");
    cy.wait(1000);
    this.elements.messageBoxButton().dblclick();
    this.elements.messageBoxHeader().should("be.visible");
    return this;
  }

  typeMessage(message) {
    this.elements.messageInput().clear().type(message);
    return this;
  }

  saveBot() {
    this.elements.saveButton().click();
    cy.wait(3000);
    return this;
  }

verifyMessageSaved(message) {
  this.elements.canvasLabel().should("contain.text", message);
  return this;
}


closeEditor() {
  this.elements.closeButton().click();
  this.elements.automationHeader().should("be.visible");
  return this;
}

}

export default MessageBoxPage;
