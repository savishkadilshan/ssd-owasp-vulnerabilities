const prescriptionService = require("../services/prescriptionService");
const { handleErrorResponse } = require("../utils/errorUtil");

const addPrescription = async (req, res) => {
  const { patientName, date, description, image, patientId } = req.body;

  try {
    const prescription = await prescriptionService.addPrescription({
      patientName,
      date,
      description,
      image,
      patientId,
    });
    return res.status(200).json(prescription);
  } catch (error) {
    return handleErrorResponse(res, 500, "Unable to create prescription", error);  }
};

const getPrescriptions = async (req, res) => {
  const { id } = req.params;

  try {
    const prescriptions = await prescriptionService.getPrescriptionsByPatientId(id);
    if (!prescriptions || prescriptions.length === 0) {
      return handleErrorResponse(res, 404, "Prescriptions not found");
    }
    return res.status(200).json(prescriptions);
  } catch (error) {
    return handleErrorResponse(res, 500, "Unable to fetch prescription", error);
  }
};

const getPrescription = async (req, res) => {
  const { id } = req.params;

  try {
    const prescription = await prescriptionService.getPrescriptionById(id);
    if (!prescription) {
      return handleErrorResponse(res, 404, "Prescription not found");
    }
    return res.status(200).json(prescription);
  } catch (error) {
    return handleErrorResponse(res, 500, "Unable to fetch prescription", error);
  }
};

const getUserPrescriptions = async (req, res) => {
  const userId = req.user._id;

  try {
    const prescriptions = await prescriptionService.getUserPrescriptions(userId);
    if (!prescriptions || prescriptions.length === 0) {
      return handleErrorResponse(res, 404, "Prescriptions not found");
    }
    return res.status(200).json(prescriptions);
  } catch (error) {
    return handleErrorResponse(res, 500, "Unable to fetch prescription", error);
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
  getPrescription,
  getUserPrescriptions,
};
