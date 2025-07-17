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
    homeButton: () => cy.get('a[name="dashboard"]', { timeout: 10000 }),
    instanceInList: (name) => cy.contains(name)
  };

  navigateToLearningInstances() {
    this.elements.aiButton().click();
    this.elements.documentAutomationLink().click();

    cy.url().should('include', '/modules/cognitive/iqbot/pages/learning-instances');

    
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
        errorMsg: "Create button still disabled after waiting",
        timeout: 20000,
        interval: 1000
      }
    );

    return this;
  }

  openCreateDialog() {
   
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
    
    
    cy.wait(500); // Allow time for form validation
 this.elements.createFieldButton()
  .scrollIntoView()
  .wait(300)
  .should('have.attr', 'data-input-status', 'INTERACTIVE')
  .then(($btn) => {
    if ($btn.is(':visible')) {
      cy.wrap($btn).click();
    } else {
      cy.log('Button not fully visible, clicking with force');
      cy.wrap($btn).click({ force: true });
    }
  });
    
    cy.wait(1000);
    return this;
  }

  goHomeAndVerify(name) {    
    
    cy.get('a[name="dashboard"]')
      .should('be.visible')
      .click();
    
   
    cy.wait(3000);
    
   
    cy.get('body').then(($body) => {
      if ($body.find('iframe').length) {
       
        cy.get('iframe')
          .its('0.contentDocument.body')
          .should('not.be.empty')
          .then(cy.wrap)
          .within(() => {
            cy.contains(name, { timeout: 15000 })
              .should('exist')
              .and('be.visible');
          });
      } else {
       
        cy.contains(name, { timeout: 15000 })
          .should('exist')
          .and('be.visible');
      }
    });
    
 
    return this;
  }

  closeModal() {
    this.elements.closeButton().should('be.visible').click();
    return this;
  }
}

export default LearningInstancePage;


