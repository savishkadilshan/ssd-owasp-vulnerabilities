const express = require("express");
const passport = require("passport");
const {
  loginPerIpLimiter,
  loginPerAccountLimiter,
  signupLimiter,
  oauthInitLimiter,
  oauthCallbackLimiter,
} = require("../middleware/rateLimiters");

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

const router = express.Router();

router.get(
  "/google",
  oauthInitLimiter,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  oauthCallbackLimiter,
  passport.authenticate("google", { session: false }),
  googleLoginCallback
);

router.post("/login", loginPerIpLimiter, loginPerAccountLimiter, loginUser);

router.post("/signup", signupLimiter, signupUser);
router.get("/doctors", searchDoctors);
router.get("/staffMembers", searchStaffMembers);
router.get("/staffAdmins", searchStaffAdmins);
router.get("/users", searchUsers);
router.get("/user/:id", searchUser);
router.get("/hospitals", searchHospitals);

module.exports = router;
