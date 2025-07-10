// automationPage.js

class AutomationPage {
  elements = {
    automationSidebar: () =>
      cy.get('a[name="automations"]', { timeout: 15000 }),

    automationHeader: () =>
      cy.contains("span", "Automation", { timeout: 15000 }),

    searchInput: () =>
      cy.get('input[placeholder="Search"]', { timeout: 10000 }),

    searchIcon: () =>
      cy.get("button.datafiltersearch-icon", { timeout: 10000 }),

    // Fixing the botResultLink element
    botResultLink: (botName) =>
      cy.get("span.rio-link__label", { timeout: 15000 }).contains(botName),
  };

  navigateToAutomation() {
    this.elements.automationSidebar().click({ force: true });
    this.elements.automationHeader().should("be.visible");
    return this;
  }

  searchAndOpenBot(botName) {
    this.elements.searchInput().type(botName);
    this.elements.searchIcon().click();
    this.elements.botResultLink(botName).click({ force: true });
    cy.url({ timeout: 15000 }).should("include", "/files/task/");
    return this;
  }

  openAutomationBotPage(bot) {
    this.navigateToAutomation()
        .searchAndOpenBot(bot);
         cy.url({ timeout: 15000 }).should("include", "/bots/repository/private");
    return this;
  }

}

export default AutomationPage;
