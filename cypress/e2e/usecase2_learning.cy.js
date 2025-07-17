/**
 * Author: Ashish Soni
 * Project: Automation Anywhere SDET Assignment
 * GitHub: https://github.com/ashishxsoni/Automation-Anywhere-Assignment
 * Copyright (c) 2025. All rights reserved.
 * Any reproduction without proper credit is unethical.
 */


import LearningInstancePage from "../pages/learningInstancePage";
const learningInstancePage = new LearningInstancePage();

describe("Create Learning Instance with Field", () => {
  before(() => {
    cy.login(); // Custom login command
  });

  it("should create a learning instance and add field", () => {
    cy.fixture("testData").then((data) => {
      learningInstancePage
        .navigateToLearningInstances()
        .openCreateDialog()
        .fillBasicInfo(data.learningInstance.name, data.learningInstance.description)
        .selectUserDefinedType()
        .clickNext()
        .verifyCreation(data.learningInstance.name)
        .addCustomField(data.learningInstance.fieldName, data.learningInstance.fieldLabel)
        .goHomeAndVerify(data.learningInstance.name);

    });
  });

  // Uncomment if needed:
  after(() => {
    cy.logout();
  });
});