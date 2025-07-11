import BotPage from "../pages/botPage";
import AutomationPage from "../pages/automationPage";
import MessageBoxPage from "../pages/messageBoxPage";

const botPage = new BotPage();
const automationPage = new AutomationPage();
const messageBoxPage = new MessageBoxPage();

let createdBotName = "BotByAshish"; // Variable to store the created bot name

describe("Bot Creation Test - Message Box Task Bot", () => {
  before(() => {
    cy.login(); // custom command from Cypress/support/commands.js
  });

  //1. Visibility Tests (OPTIONAL)
  // it("should open and verify Create Task Bot modal", () => {
  //   botPage
  //     .clickCreateBot()
  //     .assertCreateDialogVisible(); 
  // });


  //2. Bot Creation
   it("should tries each bot name until one is accepted", () => {
    cy.fixture("testData").then(({ botNames }) => {
      // create a recursive function to try each bot name
      function tryNext(index) {
        if (index >= botNames.length) {
          throw new Error("All bot names already exist. Test failed.");
        }

        const name = botNames[index];
        cy.log(`Trying with bot name: ${name}`);

        botPage
          .clickCreateBot()
          .assertCreateDialogVisible()
          .typeBotName(name)
          .submitBotCreation()

          cy.wait(3000); 
         botPage.assertBotNameErrorIfExists().then((isDuplicate) => {
            if (isDuplicate) {
              cy.log(`'${name}' already exists. Trying next...`);
              tryNext(index + 1); 
            } else {
              cy.log(` Bot '${name}' created successfully.`);
              createdBotName = name; 
             
            cy.url({ timeout: 15000 }).then((url) => {
              if (url.includes("/login")) {
                throw new Error(" Redirected to login — session expired.");
              } else if (url.includes("/bots/repository/private/files/task/")) {
                cy.log(" Redirected to correct bot task page.");
              } else {
                throw new Error(` Unexpected redirect URL: ${url}`);
              }
            });
            }
          });
      }

      tryNext(0); // Begin with the first bot name
    });
  });

 //3.search Bot and verify it  (OPTIONAL)
//  it("should verify Automation section, search and open bot", () => {
//     cy.fixture("testData").then(({ botNames }) => {
//       const botName = createdBotName || botNames[0];

//     automationPage
//     .navigateToAutomation()
//     .searchAndOpenBot(botName)
     
//     cy.url({ timeout: 15000 }).should("include", "/bots/repository/private");

//     });
//   });

  it("should insert Message Box step and validate", () => {
    cy.fixture("testData").then(({ bot_message }) => {

    cy.openAutomationBotPage(createdBotName); // custom Cypress command

    // Insert and Validate Message Box
    messageBoxPage
      .searchAndInsertMessageBox()
      .typeMessage(bot_message)
      .saveBot()
      .verifyMessageSaved(bot_message)
      .closeEditor();
    });
});

})
