import LoginPage from '../../pages/loginPage';

describe('Login Functionality Tests', () => {
  const loginPage = new LoginPage();
  const { username, password } = Cypress.env();

  beforeEach(() => {
    loginPage.visit();
  });

  // 1. Visibility Tests (OPTIONAL)
  // it('should display all login form elements', () => {
  //   loginPage.elements.usernameInput().should('be.visible');
  //   loginPage.elements.passwordInput().should('be.visible');
  //   loginPage.elements.eyeIcon().should('be.visible');
  //   loginPage.elements.rememberCheckbox().should('exist');
  //   loginPage.elements.loginButton().should('be.visible');
  //   loginPage.elements.forgotPasswordLink().should('be.visible');
  // });

  // 2. Login with valid credentials
  it('should login successfully with valid credentials', () => {
    loginPage
      .typeUsername(username)
      .typePassword(password)
      .clickLogin();

    cy.url({ timeout: 15000 }).should('include', '/#/home');
  });

  // 3. Username Remember Me Test (OPTIONAL)
  // it('should remember username when checkbox is checked', () => {
  //   loginPage
  //     .typeUsername(username)
  //     .typePassword(password)
  //     .toggleRememberMe(true)
  //     .clickLogin();

  //   cy.url({ timeout: 10000 }).should('include', '/#/home');

  //   // Reusable logout step
  //   loginPage.logout();

  //   loginPage.visit();
  //   loginPage.elements.usernameInput().should('have.value', username);
  // });

  // 4. Password Visibility Test (OPTIONAL)
  // it('should toggle password visibility', () => {
  //   loginPage
  //     .typePassword(password)
  //     .assertPasswordIsMasked()
  //     .togglePasswordVisibility()
  //     .assertPasswordIsVisible()
  //     .togglePasswordVisibility()
  //     .assertPasswordIsMasked();
  // });

  // 5. Invalid credentials test (OPTIONAL)
  // it('should show error for invalid credentials', () => {
  //   loginPage
  //     .typeUsername('invalid_user')
  //     .typePassword('wrong_password')
  //     .clickLogin()
  //     .assertValidationError('Either your username or your password is incorrect');
  // });
});
