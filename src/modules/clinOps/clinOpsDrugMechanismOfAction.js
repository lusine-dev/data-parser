const readCsvFile = require("../../readCsvFile").readCsvFile;
const db = require("../../connection").db;
const pgp = require("pg-promise")();

function clinOpsDrugMechanismOfAction() {
  readCsvFile("../dataCsv/clinOps/drugMechanismOfAction.csv", (csvData) => {
    const cs = new pgp.helpers.ColumnSet(
      ["drugId", "HRCHY1", "HRCHY2", "HRCHY3", "HRCHY4", "HRCHY5", "HRCHY6"],
      {
        table: "clinOpsDrugMechanismOfAction",
      }
    );
    const values = csvData.map((data) => {
      return {
        drugId: data["drugId"],
        HRCHY1: data["HRCHY_1"],
        HRCHY2: data["HRCHY_2"],
        HRCHY3: data["HRCHY_3"],
        HRCHY4: data["HRCHY_4"],
        HRCHY5: data["HRCHY_5"],
        HRCHY6: data["HRCHY_6"],
      };
    });

    const query = pgp.helpers.insert(values, cs);
    db.none(query);
  });
}

exports.clinOpsDrugMechanismOfAction = clinOpsDrugMechanismOfAction;
