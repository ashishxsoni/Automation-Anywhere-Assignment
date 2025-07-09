import { login, logout } from '../utils/commonSteps';
import BotPage from '../pages/botPage';
import testData from '../fixtures/testData.json';

describe("Use Case 1: Bot Creation", () => {
  it("Should create a message box bot and verify", () => {
    login();
    BotPage.navigateToBotSection();
    BotPage.clickCreateBot();
    BotPage.enterBotName(testData.botName);
    BotPage.selectMessageBoxTask();
    BotPage.saveBot();
    BotPage.assertBotCreated(testData.botName);
    logout();
  });
});
