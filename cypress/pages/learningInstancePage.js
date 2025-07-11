class LearningInstancePage {
  getIframeBody() {
    
    return cy
      .get('iframe.modulepage-frame', { timeout: 20000 })
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap);
  }

  elements = {
    aiButton: () => cy.get('button[name="ai"]', { timeout: 15000 }),
    documentAutomationLink: () => cy.get('a[name="module-cognitive-iqbot-learning-instances"]', { timeout: 15000 }),
    createButton: () => this.getIframeBody().find('#create-learning-instance-button button'),
    dialogTitle: () => this.getIframeBody().contains('.clipped-text__string--for_presentation', 'Create Learning Instance'),
    nameField: () => this.getIframeBody().find('input[name="name"]'),
    descriptionField: () => this.getIframeBody().find('textarea[name="description"]'),

    upgradeBannerClose: () => cy.get('.main-layout-upgrade-banner__close'),
      domainDropdown: () => this.getIframeBody().find('div[data-name="domainId"]').first(),
  dropdownToggle: () => this.elements.domainDropdown().find('button[data-path="RioSelectInputQuery.toggle-button"]'),
  dropdownOptions: () => this.getIframeBody().find('div[data-name="domainId"] div.rio-select-input-dropdown').first(),
  userDefinedOption: () => this.elements.dropdownOptions().find('span.clipped-text__string--for_presentation').contains('User-defined'),


    nextButton: () => this.getIframeBody().contains('button', 'Next'),
    closeButton: () => this.getIframeBody().contains('button', 'Close'),
    instanceHeader: () => this.getIframeBody().find('.rio-header__label'),
    addFieldButton: () => this.getIframeBody().contains('button', 'Add a field'),
    fieldNameInput: () => this.getIframeBody().find('input[placeholder="Field name"]'),
    fieldLabelInput: () => this.getIframeBody().find('input[placeholder="Field label"]'),
    confidenceInput: () => this.getIframeBody().find('input[name="confidenceThreshold"]'),
   createFieldButton: () => this.getIframeBody().find('button[aria-label="Create"].command-button__button--is_solid'),
    homeButton: () => this.getIframeBody().find('a[name="dashboard"]', { timeout: 10000 }),
    instanceInList: (name) => this.getIframeBody().contains('.datatable-row', name)
  };


  navigateToLearningInstances() {
  
  this.elements.aiButton().click();
  this.elements.documentAutomationLink().click();

  cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');

  // Close the upgrade banner if it exists
  cy.get('body').then(($body) => {
    if ($body.find('.main-layout-upgrade-banner').length) {
      
      this.elements.upgradeBannerClose().click();
    }
  });

  cy.waitUntil(() =>
    this.getIframeBody()
      .find('#create-learning-instance-button button')
      .then($btn => !$btn.hasClass('command-button__button--is_disabled')),
    {
      errorMsg: "❌ Create button still disabled after waiting",
      timeout: 20000,
      interval: 1000
    }
  );

  return this;
}

openCreateDialog() {
  // Close the upgrade banner if it exists
  cy.get('body').then(($body) => {
    if ($body.find('.main-layout-upgrade-banner').length) {
     
      this.elements.upgradeBannerClose().click();
    }
  });

 
  this.elements.createButton().click({ force: true });

  
  this.elements.nameField().should('exist').and('be.visible');
  return this;
}

  fillBasicInfo(name, description) {
    
    this.elements.nameField().clear().type(name);
    this.elements.descriptionField().clear().type(description);
    return this;
  }


selectUserDefinedType() {


  this.getIframeBody()
    .find('div[data-name="domainId"] button[data-path="RioSelectInputQuery.toggle-button"]')
    .first()
    .should('be.visible')
    .click({ force: true });

  cy.wait(2000); // wait for dropdown to render

  this.getIframeBody()
    .find('.rio-select-input-dropdown-option-label-line__text-label-line')
    .contains('User-defined')
    .should('be.visible')
    .click({ force: true });

  // ✅ Instead of waitUntil, just assert the final state directly
  this.getIframeBody()
    .find('div[data-name="domainId"] .clipped-text__string--for_presentation')
    .first()
    .should('contain.text', 'User-defined');

  return this;
}

  clickNext() {
    
    this.elements.nextButton().should('be.visible').click();
    return this;
  }

  verifyCreation(name) {
  
    this.elements.instanceHeader().should('contain.text', name);
    return this;
  }
addCustomField(fieldName, fieldLabel) {
    
    this.elements.addFieldButton().click();
    this.elements.fieldNameInput().should('be.visible').type(fieldName);
    this.elements.fieldLabelInput().type(fieldLabel);
    this.elements.confidenceInput().click();
    
    // Wait for form to be ready, then click create
    cy.wait(500); // Allow time for form validation
    this.elements.createFieldButton()
        .should('be.visible')
        .should('have.attr', 'data-input-status', 'INTERACTIVE')
        .click();
    
    cy.wait(1000);
    return this;
}


  goHomeAndVerify(name) {

  
  // First ensure the iframe is fully loaded
  this.getIframeBody().should('exist');
  
  // Add more specific selector if possible
  this.elements.homeButton()
    .should('be.visible')
    .click({ force: true });
  
  // Add a wait for the page to transition
  cy.wait(2000);
  
  // Verify the instance exists in the list
  this.elements.instanceInList(name).should('exist');
  return this;
}

  closeModal() {
    
    this.elements.closeButton().should('be.visible').click();
    return this;
  }
}

// export default LearningInstancePage;
export default LearningInstancePage;


