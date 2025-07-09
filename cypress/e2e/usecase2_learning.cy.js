import { login, logout } from '../utils/commonSteps';
import LearningPage from '../pages/learningPage';
import testData from '../fixtures/testData.json';

describe("Use Case 2: Learning Instance", () => {
  it("Should create a learning instance with custom field", () => {
    login();
    LearningPage.goToLearningSection();
    LearningPage.createNewInstance(testData.learningInstanceName);
    LearningPage.addCustomField(testData.customField);
    LearningPage.saveInstance();
    LearningPage.verifyInstanceCreated(testData.learningInstanceName);
    logout();
  });
});
