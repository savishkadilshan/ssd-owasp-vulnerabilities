const paymentService = require('../services/paymentService');
const { handleErrorResponse } = require('../utils/errorUtil');

// Add a new payment
const addPayment = async (req, res) => {
  const { appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip } = req.body;

  try {
    const newPayment = await paymentService.createPayment(
      appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip
    );
    res.status(201).json(newPayment);
    console.log("New payment successfully created");
  } catch (error) {
      return handleErrorResponse(res, 500, 'Unable to create payment', error);

  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await paymentService.findPaymentById(id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(200).json(payment);
    console.log("Payment fetched successfully");
  } catch (error) {
    return handleErrorResponse(res, 500, 'Unable to fetch payment', error)
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const userId = req.user._id;
    const payments = await paymentService.findAllPayments(userId);
    res.status(200).json(payments);
    console.log("Payments fetched successfully");
  } catch (error) {
    return handleErrorResponse(res, 500, 'Unable to fetch payments', error);
  }
};

// Add new service payment
const addServicePayment = async (req, res) => {
  const { appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip } = req.body;

  try {
    const newPayment = await paymentService.createServicePayment(
      appointmentId, paymentMethod, insuranceDetails, cardDetails, bankSlip
    );
    res.status(201).json(newPayment);
    console.log("New payment successfully created");
  } catch (error) {
    return handleErrorResponse(res, 500, 'Unable to create service payment', error);
  }
};

module.exports = {
  addPayment,
  getPaymentById,
  getAllPayments,
  addServicePayment,
};
