const express = require("express");
const passport = require("passport");

const {
  signupUser,
  loginUser,
  searchDoctors,
  searchStaffMembers,
  searchStaffAdmins,
  searchUsers,
  searchUser,
  searchHospitals,
  googleLoginCallback,
} = require("../controller/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleLoginCallback
);

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/doctors", searchDoctors);

router.get("/staffMembers", searchStaffMembers);

router.get("/staffAdmins", searchStaffAdmins);

router.get("/users", searchUsers);

router.get("/user/:id", searchUser);

router.get("/hospitals", searchHospitals);

module.exports = router;
