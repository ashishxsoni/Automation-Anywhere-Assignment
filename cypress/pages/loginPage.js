const url = `https://www.automationanywhere.com/`
class LoginPage {
  visit() {
    cy.visit(url);
  }

  enterUsername(username) {
    cy.get("#username").type(username);
  }

  enterPassword(password) {
    cy.get("#password").type(password);
  }

  submit() {
    cy.get("button[type='submit']").click();
  }
}

export default new LoginPage();

