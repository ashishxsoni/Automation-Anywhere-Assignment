import LearningInstancePage from "../pages/learningInstancePage";
const learningInstancePage = new LearningInstancePage();

describe("Create Learning Instance with Field", () => {
  before(() => {
    cy.login(); // ✅ Custom login command
  });

  it("should create a learning instance and add field", () => {
    cy.fixture("testData").then((data) => {
      learningInstancePage
        .navigateToLearningInstances()
        .openCreateDialog()
        .fillBasicInfo(data.learningInstance.name, data.learningInstance.description)
        .selectUserDefinedType()
        .clickNext()
        .verifyCreation(data.learningInstance.name)
        .addCustomField(data.learningInstance.fieldName, data.learningInstance.fieldLabel);
        // .goHomeAndVerify(data.learningInstance.name);
    });
  });

  // Uncomment if needed:
  // after(() => {
  //   cy.logout();
  // });
});




// import LearningInstancePage from "../pages/learningInstancePage";

// const learningInstancePage = new LearningInstancePage();

// describe("Simple Learning Instance Test", () => {
//   before(() => {
//     cy.login(); // your custom login command
//   });

//   it("creates learning instance with custom field", () => {
//     cy.fixture("testData").then((data) => {
//       learningInstancePage
//         .navigateToLearningInstances()
//         .openCreateDialog()
//         .fillBasicInfo(data.learningInstance.name, data.learningInstance.description)
//         .selectUserDefinedType()
//         .addCustomField(data.learningInstance.fieldName, data.learningInstance.fieldLabel)
//         .verifyCreation(data.learningInstance.name)
//         .goHomeAndVerify(data.learningInstance.name);
//     });
//   });

//   // after(() => {
//   //   cy.logout();
//   // });
// });
