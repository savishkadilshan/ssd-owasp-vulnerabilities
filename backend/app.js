const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectToDatabase = require("./src/config/db");
const userRouter = require("./src/routes/user");
const appointmentRouter = require("./src/routes/appointment");
const reportRouter = require("./src/routes/report");
const prescriptionRouter = require("./src/routes/prescriptionRoutes");
const profileRouter = require("./src/routes/patientProfileRoute");
const paymentRouter = require("./src/routes/payment");
const doctorRoutes = require("./src/routes/doctorRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const labAppointments = require("./src/routes/labappointment");
const requireAuth = require("./src/middleware/requireAuth");
require("./src/config/passport-setup");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1);

// Hide stack/framework
app.disable("x-powered-by");

// --- Security headers first ---
app.use(helmet()); // sensible defaults

// Content Security Policy (tune as needed for your frontend)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
    },
  })
);
// Extra clickjacking protection (mirrors CSP frameAncestors)
app.use(helmet.frameguard({ action: "deny" }));

// --- CORS (adjust origins as needed) ---
const allowedOrigins = ["http://localhost:5173"]; // add production URLs here
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "CSRF-Token"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(apiLimiter);

app.use(passport.initialize());

app.use("/user", userRouter);
app.use("/api/doctors", doctorRoutes);
app.use("/api/services", serviceRoutes);
app.use("/appointment", requireAuth, appointmentRouter);
app.use("/labappointment", requireAuth, labAppointments);
app.use("/report", requireAuth, reportRouter);
app.use("/patientprofile", requireAuth, profileRouter);
app.use("/prescription", requireAuth, prescriptionRouter);
app.use("/api/payment", requireAuth, paymentRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});
