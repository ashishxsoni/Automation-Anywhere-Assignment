class LearningPage {
  goToLearningSection() {
    cy.get("#learningMenu").click();
  }

  createNewInstance(name) {
    cy.get("#createLearningInstanceBtn").click();
    cy.get("#instanceName").type(name);
  }

  addCustomField(field) {
    cy.get("#addFieldBtn").click();
    cy.get("#customFieldInput").type(field);
    cy.get("#saveFieldBtn").click();
  }

  saveInstance() {
    cy.get("#saveInstanceBtn").click();
  }

  verifyInstanceCreated(name) {
    cy.contains(name).should("exist");
  }
}

export default new LearningPage();
