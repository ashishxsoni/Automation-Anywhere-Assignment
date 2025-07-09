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
