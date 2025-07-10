class LearningInstancePage {
  getIframeBody() {
    cy.log("📦 Getting iframe body...");
    return cy
      .get('iframe.modulepage-frame', { timeout: 20000 })
      .its('0.contentDocument.body').should('not.be.empty')
      .then(cy.wrap);
  }

  elements = {
    aiButton: () => cy.get('button[name="ai"]', { timeout: 15000 }),
    documentAutomationLink: () => cy.get('a[name="module-cognitive-iqbot-learning-instances"]', { timeout: 15000 }),
    createButton: () => this.getIframeBody().find('#create-learning-instance-button button'),
    dialogTitle: () => this.getIframeBody().contains('.clipped-text__string--for_presentation', 'Create Learning Instance'),
    nameField: () => this.getIframeBody().find('input[name="name"]', { timeout: 10000 }),
    descriptionField: () => this.getIframeBody().find('textarea[name="description"]'),
    dropdownToggle: () => this.getIframeBody().find('div.rio-select-input-query__controls button'),
    userDefinedOption: () => this.getIframeBody().contains('span', 'User-defined'),
    nextButton: () => this.getIframeBody().contains('button', 'Next'),
    closeButton: () => this.getIframeBody().contains('button', 'Close'),
    instanceHeader: () => this.getIframeBody().find('.rio-header__label'),
    addFieldButton: () => this.getIframeBody().contains('button', 'Add a field'),
    fieldNameInput: () => this.getIframeBody().find('input[placeholder="Field name"]'),
    fieldLabelInput: () => this.getIframeBody().find('input[placeholder="Field label"]'),
    confidenceInput: () => this.getIframeBody().find('input[name="confidenceThreshold"]'),
    createFieldButton: () => this.getIframeBody().contains('button', 'Create'),
    homeButton: () => this.getIframeBody().find('a[name="dashboard"]'),
    instanceInList: (name) => this.getIframeBody().contains('.datatable-row', name),
  };

  navigateToLearningInstances() {
    cy.log("🧠 Navigating to Document Automation > Learning Instances");

    this.elements.aiButton().click();
    this.elements.documentAutomationLink().click();

    cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');

    this.elements.createButton()
      .should('be.visible')
      .should('not.have.class', 'command-button__button--is_disabled');

    return this;
  }

  openCreateDialog() {
    cy.log("📤 Clicking 'Create Learning Instance' button");

    this.elements.createButton()
      .should('be.visible')
      .should('not.have.class', 'command-button__button--is_disabled')
      .click();

    cy.log("🪟 Waiting for 'Create Learning Instance' dialog to appear...");

    this.elements.dialogTitle()
      .should('be.visible');

    cy.log("✏️ Waiting for 'Name' input to exist and be visible...");

    this.elements.nameField()
      .should('exist')
      .and('be.visible');

    return this;
  }

  fillBasicInfo(name, description) {
    cy.log(`📝 Filling basic info: ${name}, ${description}`);
    this.elements.nameField().clear().type(name);
    this.elements.descriptionField().clear().type(description);
    return this;
  }

  selectUserDefinedType() {
    cy.log("🔽 Selecting 'User-defined' type from dropdown");
    this.elements.dropdownToggle().click({ force: true });
    this.elements.userDefinedOption().click({ force: true });
    return this;
  }

  clickNext() {
    cy.log("➡️ Clicking 'Next' button");
    this.elements.nextButton().should('be.visible').click();
    return this;
  }

  verifyCreation(name) {
    cy.log(`✅ Verifying creation of learning instance: ${name}`);
    this.elements.instanceHeader().should('contain.text', name);
    return this;
  }

  addCustomField(fieldName, fieldLabel) {
    cy.log(`➕ Adding custom field: ${fieldName} - ${fieldLabel}`);
    this.elements.addFieldButton().click();
    this.elements.fieldNameInput().should('be.visible').type(fieldName);
    this.elements.fieldLabelInput().type(fieldLabel);
    this.elements.confidenceInput().click(); // optional focus
    this.elements.createFieldButton().click();
    return this;
  }

  goHomeAndVerify(name) {
    cy.log("🏠 Navigating home and verifying instance in list");
    this.elements.homeButton().click();
    this.elements.instanceInList(name).should('exist');
    return this;
  }

  closeModal() {
    cy.log("❌ Closing modal (if visible)");
    this.elements.closeButton().should('be.visible').click();
    return this;
  }
}

export default LearningInstancePage;









// class LearningInstancePage {
//   getIframeBody() {
//     return cy
//       .get('iframe.modulepage-frame', { timeout: 20000 })
//       .its('0.contentDocument.body').should('not.be.empty')
//       .then(cy.wrap);
//   }

//   elements = {
//     aiButton: () => cy.get('button[name="ai"]', { timeout: 15000 }),
//     documentAutomationLink: () => cy.get('a[name="module-cognitive-iqbot-learning-instances"]', { timeout: 15000 }),
//     createButton: () => this.getIframeBody().find('#create-learning-instance-button button'),
//     dialogContainer: () => this.getIframeBody().find('.clipped-text__string--for_presentation').contains('Create Learning Instance'),
//     nameField: () => this.getIframeBody().find('input[name="name"]', { timeout: 10000 }),
//     descriptionField: () => this.getIframeBody().find('textarea[name="description"]'),
//     dropdownToggle: () => this.getIframeBody().find('div.rio-select-input-query__controls button'),
//     userDefinedOption: () => this.getIframeBody().contains('span', 'User-defined'),
//     nextButton: () => this.getIframeBody().contains('button', 'Next'),
//     closeButton: () => this.getIframeBody().contains('button', 'Close'),
//     instanceHeader: () => this.getIframeBody().find('.rio-header__label'),
//     addFieldButton: () => this.getIframeBody().contains('button', 'Add a field'),
//     fieldNameInput: () => this.getIframeBody().find('input[placeholder="Field name"]'),
//     fieldLabelInput: () => this.getIframeBody().find('input[placeholder="Field label"]'),
//     confidenceInput: () => this.getIframeBody().find('input[name="confidenceThreshold"]'),
//     createFieldButton: () => this.getIframeBody().contains('button', 'Create'),
//     homeButton: () => this.getIframeBody().find('a[name="dashboard"]'),
//     instanceInList: (name) => this.getIframeBody().contains('.datatable-row', name)
//   };

//   navigateToLearningInstances() {
//     this.elements.aiButton().click();
//     this.elements.documentAutomationLink().click();
//     cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');

//     // Wait for iframe + button to be visible
//     this.elements.createButton().should('be.visible').should('not.be.disabled');

//     return this;
//   }

// openCreateDialog() {
//   // Step 1: Click the Create button
//   this.elements.createButton().should('be.visible').click();

//   // Step 2: Wait for the dialog title to appear
//   this.getIframeBody().contains('.clipped-text__string--for_presentation', 'Create Learning Instance', { timeout: 15000 })
//     .should('be.visible');

//   // Step 3: Now the name input field should exist
//   this.getIframeBody()
//     .find('input[name="name"]', { timeout: 10000 })
//     .should('exist')
//     .and('be.visible');

//   return this;
// }



//   fillBasicInfo(name, description) {
//     this.elements.nameField().clear().type(name);
//     this.elements.descriptionField().clear().type(description);
//     return this;
//   }

//   selectUserDefinedType() {
//     this.elements.dropdownToggle().click({ force: true });
//     this.elements.userDefinedOption().click({ force: true });
//     return this;
//   }

//   clickNext() {
//     this.elements.nextButton().should('be.visible').click();
//     return this;
//   }

//   addCustomField(fieldName, fieldLabel) {
//     this.elements.addFieldButton().click();
//     this.elements.fieldNameInput().should('be.visible').type(fieldName);
//     this.elements.fieldLabelInput().type(fieldLabel);
//     this.elements.confidenceInput().click(); // optional focus
//     this.elements.createFieldButton().click();
//     return this;
//   }

//   verifyCreation(name) {
//     this.elements.instanceHeader().should('contain.text', name);
//     return this;
//   }

//   goHomeAndVerify(name) {
//     this.elements.homeButton().click();
//     this.elements.instanceInList(name).should('exist');
//     return this;
//   }

//   closeModal() {
//     this.elements.closeButton().should('be.visible').click();
//     return this;
//   }
// }

// export default LearningInstancePage;





// class LearningInstancePage {
//   elements = {
//     // AI Button from sidebar
//     aiButton: () => cy.get('button[name="ai"]', { timeout: 15000 }),
    
//     // Document Automation link
//     documentAutomationLink: () => cy.get('a[name="module-cognitive-iqbot-learning-instances"]', { timeout: 15000 }),
    
//     // Create Learning Instance button - multiple reliable selectors
//     createButton: () => cy.get('#create-learning-instance-button button, button[name="create-button"]', { timeout: 15000 }),
    
//     // Page header - using multiple selector strategies for reliability
//     pageHeader: () => cy.get('[data-path="RioHeader"] .rio-header__label, .rio-header__label, .view-li-page__header', { timeout: 20000 }),
    
//     // Alternative header selectors
//     headerSpan: () => cy.get('.rio-header__label span', { timeout: 15000 }),
    
//     // 4. Dialog title verification
//     dialogTitle: () => cy.contains('Create Learning Instance'),
    
//     // 5. Name field
//     nameField: () => cy.get('input[name="name"]'),
    
//     // 6. Description field
//     descriptionField: () => cy.get('textarea[name="description"]'),
    
//     // 7. Document Type dropdown
//     docTypeDropdown: () => cy.get('div[data-name="domainId"]'),
    
//     // 8. User-defined option
//     userDefinedOption: () => cy.contains('User-defined'),
    
//     // 9. Next button
//     nextButton: () => cy.contains('button', 'Next'),
    
//     // 10. Add Field button
//     addFieldButton: () => cy.contains('button', 'Add a field'),
    
//     // 11. Field name input
//     fieldNameInput: () => cy.get('input[placeholder="Field name"]'),
    
//     // 12. Field label input
//     fieldLabelInput: () => cy.get('input[placeholder="Field label"]'),
    
//     // 13. Create Field button
//     createFieldButton: () => cy.contains('button', 'Create'),
    
//     // 14. Header after creation
//     instanceHeader: () => cy.get('.rio-header__label'),
    
//     // 15. Home button
//     homeButton: () => cy.get('a[name="dashboard"]'),
    
//     // 16. Instance in list
//     instanceInList: (name) => cy.contains('.datatable-row', name)
//   };

//   navigateToLearningInstances() {
//     // Click AI button
//     this.elements.aiButton().click();
    
//     // Click Document Automation
//     this.elements.documentAutomationLink().click();
    
//     // Verify URL first
//     cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');
    
//     // Wait for page to load with multiple fallback strategies
//     cy.wait(2000); // Give page time to load
    
//     // Try multiple approaches to verify the page loaded
//     cy.get('body').then(($body) => {
//       // First, try to find the header with multiple selectors
//       if ($body.find('.rio-header__label span').length > 0) {
//         cy.get('.rio-header__label span', { timeout: 10000 }).should('be.visible');
//       } else if ($body.find('.rio-header__label').length > 0) {
//         cy.get('.rio-header__label', { timeout: 10000 }).should('be.visible');
//       } else {
//         // Fallback: just verify the create button is visible
//         cy.get('#create-learning-instance-button', { timeout: 10000 }).should('be.visible');
//       }
//     });
    
//     return this;
//   }

//   // Alternative navigation method with more robust waiting
//   navigateToLearningInstancesRobust() {
//     // Click AI button
//     this.elements.aiButton().click();
    
//     // Click Document Automation
//     this.elements.documentAutomationLink().click();
    
//     // Verify URL
//     cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');
    
//     // Wait for all API calls to complete before looking for the button
//     cy.intercept('POST', '**/learninginstances/list').as('learningInstancesList');
//     cy.intercept('GET', '**/cognitive/v3/domains').as('domains');
//     cy.intercept('POST', '**/userdevices').as('userDevices');
    
//     // Wait for key API calls to complete
//     cy.wait(['@learningInstancesList', '@domains'], { timeout: 30000 });
    
//     // Now wait for the create button to appear and be interactive
//     cy.get('#create-learning-instance-button', { timeout: 20000 })
//       .should('be.visible')
//       .should('not.be.disabled');
    
//     // Wait for the button to be fully interactive
//     cy.get('#create-learning-instance-button button[data-input-status="INTERACTIVE"]', { timeout: 10000 })
//       .should('exist');
    
//     return this;
//   }

//   openCreateDialog() {
//     // Wait for create button to be ready
//     cy.get('#create-learning-instance-button button', { timeout: 15000 })
//       .should('be.visible')
//       .should('not.be.disabled');
    
//     // Click create button
//     cy.get('#create-learning-instance-button button').click();
    
//     // Verify dialog appears with better selector
//     cy.get('.clipped-text__string--for_presentation', { timeout: 10000 })
//       .contains('Create Learning Instance')
//       .should('be.visible');
      
//     return this;
//   }

//   fillBasicInfo(name, description) {
//     this.elements.nameField().type(name);
//     this.elements.descriptionField().type(description);
//     return this;
//   }

//   selectUserDefinedType() {
//     this.elements.docTypeDropdown().click();
//     this.elements.userDefinedOption().click();
//     return this;
//   }

//   addCustomField(fieldName, fieldLabel) {
//     this.elements.addFieldButton().click();
//     this.elements.fieldNameInput().type(fieldName);
//     this.elements.fieldLabelInput().type(fieldLabel);
//     this.elements.createFieldButton().click();
//     return this;
//   }

//   // Even more robust navigation method
//   navigateToLearningInstancesWithRetry() {
//     // Click AI button
//     this.elements.aiButton().click();
    
//     // Click Document Automation
//     this.elements.documentAutomationLink().click();
    
//     // Verify URL
//     cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');
    
//     // Wait for page header to appear first
//     cy.get('[data-header-label="Learning Instances"]', { timeout: 20000 })
//       .should('be.visible');
    
//     // Wait for the create button container to appear
//     cy.get('.rio-header__static-content', { timeout: 15000 })
//       .should('be.visible');
    
//     // Now wait for the specific create button with retry logic
//     cy.get('#create-learning-instance-button', { timeout: 20000 })
//       .should('be.visible')
//       .within(() => {
//         cy.get('button[data-input-status="INTERACTIVE"]', { timeout: 10000 })
//           .should('exist');
//       });
    
//     return this;
//   }

//   verifyCreation(name) {
//     this.elements.instanceHeader().should('contain', name);
//     return this;
//   }


//   goHomeAndVerify(name) {
//     this.elements.homeButton().click();
//     this.elements.instanceInList(name).should('exist');
//     return this;
//   }
// }
// export default LearningInstancePage;