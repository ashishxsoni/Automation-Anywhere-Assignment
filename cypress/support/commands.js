/**
 * Author: Ashish Soni
 * Project: Automation Anywhere SDET Assignment
 * GitHub: https://github.com/ashishxsoni/Automation-Anywhere-Assignment
 * Copyright (c) 2025. All rights reserved.
 * Any reproduction without proper credit is unethical.
 */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPage from '../pages/loginPage';
import AutomationPage from '../pages/automationPage';

Cypress.Commands.add('login', () => {
    const loginPage = new LoginPage();
    const { username, password } = Cypress.env();

    // Alternatively, we can use the following code if you want to keep the login logic inline:/   
  loginPage.login(username, password); //Reusing the method
    // or we can use the following code if we want to keep the login logic 
/*     login
     cy.visit('/#/login');
     loginPage
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();

    cy.url({ timeout: 15000 }).should('include', '/#/home'); */
  
});

Cypress.Commands.add('logout', () => {
  cy.url().then((url) => {
    if (url.includes('/login')) {
      cy.log('Already logged out.');
    } else if (url === 'about:blank') {
      cy.log('Cypress is on blank page. Skipping logout.');
    } else {
      const loginPage = new LoginPage();
      loginPage.logout();
    }
  });
});

Cypress.Commands.add('openAutomationBotPage', (botName) => {
    
    const automationPage = new AutomationPage();
    automationPage
    .openAutomationBotPage(botName);
    
  });

