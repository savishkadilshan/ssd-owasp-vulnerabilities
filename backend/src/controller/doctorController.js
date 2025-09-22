const doctorService = require("../services/doctorService");
const mongoose = require("mongoose");
const { handleErrorResponse } = require("../utils/errorUtil");

const addDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    handleErrorResponse(res, 400, error.message);
  }
};

const getDoctorsByHospital = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctorsByHospital(req.params.hospitalId);
    res.status(200).json(doctors);
  } catch (error) {
    handleErrorResponse(res, 404, 'Doctor not found');
  }
};

const getDoctorById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, "Invalid doctor ID format.");
  }

  try {
    const doctor = await doctorService.getDoctorById(id);
    res.status(200).json(doctor);
  } catch (error) {
    handleErrorResponse(res, 404, 'Doctor not found');
  }
};

const updateDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, 'Invalid Doctor ID');
  }

  try {
    const doctor = await doctorService.updateDoctor(id, req.body);
    res.status(200).json(doctor);
  } catch (error) {
    handleErrorResponse(res, 500, 'Internal server error', error);
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return handleErrorResponse(res, 400, 'Invalid Doctor ID');
  }

  try {
    const result = await doctorService.deleteDoctor(id);
    res.status(200).json(result);
  } catch (error) {
    handleErrorResponse(res, 500, 'Internal server error', error);
  }
};

module.exports = {
  addDoctor,
  getDoctorsByHospital,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
