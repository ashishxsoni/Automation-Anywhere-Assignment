/**
 * Author: Ashish Soni
 * Project: Automation Anywhere SDET Assignment
 * GitHub: https://github.com/ashishxsoni/Automation-Anywhere-Assignment
 * Copyright (c) 2025. All rights reserved.
 * Any reproduction without proper credit is unethical.
 */



import LoginPage from '../pages/loginPage';
import testData from '../fixtures/textData.json';

export function login() {
  LoginPage.visit();
  LoginPage.enterUsername(testData.username);
  LoginPage.enterPassword(testData.password);
  LoginPage.submit();
  cy.url().should("include", "/dashboard");
}

export function logout() {
  cy.get("#userProfileIcon").click();
  cy.get("#logoutBtn").click();
  cy.url().should("include", "/login");
}




// Cypress.Commands.add("login", () => {
//   LoginPage.visit()
//     .typeUsername(testData.username)
//     .typePassword(testData.password)
//     .toggleRememberMe()
//     .clickLogin();
// });
