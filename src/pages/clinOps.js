const clinOpsDrugMechanismOfAction =
  require("../modules/clinOps/clinOpsDrugMechanismOfAction").clinOpsDrugMechanismOfAction;
const clinOpsIndustryTrialPanel =
  require("../modules/clinOps/clinOpsIndustryTrialPanel").clinOpsIndustryTrialPanel;

const truncateTables = [
  'TRUNCATE TABLE "clinOpsDrugMechanismOfAction"',
  'TRUNCATE TABLE "clinOpsIndustryTrialPanel"',
];

const functions = [clinOpsDrugMechanismOfAction, clinOpsIndustryTrialPanel];

const insertData = () => {
  functions.map(async (func) => {
    await func();
  });
};

Promise.all(
  truncateTables.map((table) => {
    return new Promise((resolve, reject) => {
      db.query(table)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  })
).then(() => {
  insertData();
});
