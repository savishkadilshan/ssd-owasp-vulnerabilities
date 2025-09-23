const userService = require("../services/userService");
const { handleErrorResponse } = require("../utils/errorUtil");

const User = require("../models/User");

const googleLoginCallback = async (req, res) => {
  try {
    const user = req.user;
    
    const token = userService.createToken(user._id);

    res.redirect(`http://localhost:5173/login?token=${token}&userType=${user.userType}&email=${user.email}`);

  } catch (error) {
    return handleErrorResponse(res, 400, "Failed to authenticate with Google.", error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    return handleErrorResponse(res, 400, "Invalid login credentials", error);
  }
};

const signupUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const result = await userService.signupUser(email, password, userType);
    res.status(200).json(result);
  } catch (error) {
    return handleErrorResponse(res, 400, "Invalid login credentials", error);
  }
};

const searchDoctors = async (req, res) => {
  try {
    const doctors = await userService.searchDoctors();
    res.send(doctors);
  } catch (err) {
    return handleErrorResponse(res, 500, "Unable to fetch doctors", error);
  }
};

const searchStaffMembers = async (req, res) => {
  try {
    const staffMembers = await userService.searchStaffMembers();
    res.send(staffMembers);
  } catch (err) {
    return handleErrorResponse(res, 500, "Unable to fetch doctors", error);
  }
};

const searchStaffAdmins = async (req, res) => {
  try {
    const staffAdmins = await userService.searchStaffAdmins();
    res.send(staffAdmins);
  } catch (err) {
    return handleErrorResponse(res, 500, "Unable to fetch doctors", error);
  }
};

const searchUsers = async (req, res) => {
  try {
    const users = await userService.searchUsers();
    res.send(users);
  } catch (err) {
    return handleErrorResponse(res, 500, "Unable to fetch doctors", error);
  }
};

const searchUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.searchUserById(id);
    res.status(200).json(user);
  } catch (error) {
    return handleErrorResponse(res, 500, "Unable to fetch user", error);
  }
};

const searchHospitals = async (req, res) => {
  try {
    const hospitals = await User.find({ userType: "staffAdmin" }).select("email hospitalName");
    console.log(hospitals);

    res.send(hospitals);
  } catch (err) {
    console.log(err.message);
    return handleErrorResponse(res, 500, "Unable to fetch doctors", error);
  }
};

module.exports = {
  loginUser,
  signupUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers,
  searchUser,
  searchHospitals,
  googleLoginCallback,
};