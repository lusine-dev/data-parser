const readCsvFile = require("../../readCsvFile").readCsvFile;
const db = require("../../connection").db;
const pgp = require("pg-promise")();
const moment = require("moment");

function clinOpsIndustryTrialPanel() {
  readCsvFile("../dataCsv/clinOps/industryTrialPanel.csv",
    (csvData) => {
    const cs = new pgp.helpers.ColumnSet(
      [
        "recordUrl",
        "trialId",
        "trialTitle",
        "trialStatus",
        "trialPhase",
        "trialStartDate",
        "trialTargetAccrual",
        "trialIdentifiedSites",
        "trialPrimaryCompletionDate",
        "trialPrimaryEndpointsReported",
        "trialReportedSites",
        "trialPatientsPerSitePerMonth",
        "totalTrialDuration",
        "trialEnrollmentDuration",
        "trialEnrollmentDurationPct",
      ],
      {
        table: "clinOpsIndustryTrialPanel",
      }
    );
      const values = csvData.map((data) => {
        
        if (data["trialStartDate"] === "") {
          data["trialStartDate"] = null;
        } else {
          data["trialStartDate"] = moment(data["trialStartDate"], "DD/MM/YYYY").format("YYYY-MM-DD");
        }
        if (data["trialTargetAccrual"] === "") {
          data["trialTargetAccrual"] = null;
        }
        if (data["trialIdentifiedSites"] === "") {
          data["trialIdentifiedSites"] = null;
        }
        if (data["trialPrimaryCompletionDate"] === "") {
          data["trialPrimaryCompletionDate"] = null;
        } else {
          data["trialPrimaryCompletionDate"] = moment(data["trialPrimaryCompletionDate"], "DD/MM/YYYY").format("YYYY-MM-DD");
        }
        if (data["trialPrimaryEndpointsReported"] === "") {
          data["trialPrimaryEndpointsReported"] = null;
        } else {
          data["trialPrimaryEndpointsReported"] = moment(data["trialPrimaryEndpointsReported"], "DD/MM/YYYY").format("YYYY-MM-DD");
        }
        if (data["trialReportedSites"] === "") {
          data["trialReportedSites"] = null;
        }
        if (data["trialPatientsPerSitePerMonth"] === "") {
          data["trialPatientsPerSitePerMonth"] = null;
        }
        if (data["totalTrialDuration"] === "") {
          data["totalTrialDuration"] = null;
        }
        if (data["trialEnrollmentDuration"] === "") {
          data["trialEnrollmentDuration"] = null;
        }
        if (data["trialEnrollmentDurationPct"] === "") {
          data["trialEnrollmentDurationPct"] = null;
        }

      return {
        recordUrl: data["recordUrl"],
        trialId: data["trialId"],
        trialTitle: data["trialTitle"],
        trialStatus: data["trialStatus"],
        trialPhase: data["trialPhase"],
        trialStartDate: data["trialStartDate"],
        trialTargetAccrual: data["trialTargetAccrual"],
        trialIdentifiedSites: data["trialIdentifiedSites"],
        trialPrimaryCompletionDate: data["trialPrimaryCompletionDate"],
        trialPrimaryEndpointsReported: data["trialPrimaryEndpointsReported"],
        trialReportedSites: data["trialReportedSites"],
        trialPatientsPerSitePerMonth: data["trialPatientsPerSitePerMonth"],
        totalTrialDuration: data["totalTrialDuration"],
        trialEnrollmentDuration: data["trialEnrollmentDuration"],
        trialEnrollmentDurationPct: data["trialEnrollmentDurationPct"],
      };
    });

    const query = pgp.helpers.insert(values, cs);
    db.none(query);
  });
}

exports.clinOpsIndustryTrialPanel = clinOpsIndustryTrialPanel;
