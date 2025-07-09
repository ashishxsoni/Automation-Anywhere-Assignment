class BotPage {
  navigateToBotSection() {
    cy.get("#botMenu").click();
  }

  clickCreateBot() {
    cy.get("#createBotBtn").click();
  }

  enterBotName(name) {
    cy.get("#botNameInput").type(name);
  }

  selectMessageBoxTask() {
    cy.get("#taskTypeDropdown").select("Message Box");
  }

  saveBot() {
    cy.get("#saveBotBtn").click();
  }

  assertBotCreated(name) {
    cy.contains(name).should("exist");
  }
}

export default new BotPage();
