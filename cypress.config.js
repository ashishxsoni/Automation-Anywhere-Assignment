const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://your-app.com", // replace this with actual URL
    specPattern: "cypress/e2e/**/*.cy.js",
      watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node events here
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  }
});
