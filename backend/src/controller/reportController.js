const reportService = require("../services/reportService");
const { handleErrorResponse } = require("../utils/errorUtil");

const addReport = async (req, res) => {
  const hospitalId = req.user._id;
  const reportData = req.body;

  try {
    const report = await reportService.addReport(reportData, hospitalId);
    res.status(200).json(report);
  } catch (error) {
    return handleErrorResponse(res, 500, "Internal server error", error);
  }
};

const getReports = async (req, res) => {
  const { id } = req.params;

  try {
    const reports = await reportService.getReportsByPatientId(id);
    res.status(200).json(reports);
  } catch (error) {
      return handleErrorResponse(res, 404, "Reports not found");
  }
};

const getReportsByHospital = async (req, res) => {
  const hospitalId = req.user._id;
  const { id: patientId } = req.params;

  try {
    const reports = await reportService.getReportsByHospitalAndPatientId(
      hospitalId,
      patientId
    );
    res.status(200).json(reports);
  } catch (error) {
      return handleErrorResponse(res, 404, "Reports not found");
  }
};

const getReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await reportService.getReportById(id);
    res.status(200).json(report);
  } catch (error) {
      return handleErrorResponse(res, 404, "Reports not found");
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await reportService.updateReport(id, req.body);
    res.status(200).json(report);
  } catch (error) {
      return handleErrorResponse(res, 404, "Reports not found");
  }
};

const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await reportService.deleteReport(id);
    res.status(200).json(result);
  } catch (error) {
      return handleErrorResponse(res, 404, "Reports not found");
  }
};

const getUserReports = async (req, res) => {
  const userId = req.user._id;

  try {
    const reports = await reportService.getUserReports(userId);
    res.status(200).json(reports);
  } catch (error) {
      return handleErrorResponse(res, 404, "Reports not found");
  }
};

module.exports = {
  addReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  getReportsByHospital,
  getUserReports,
};
