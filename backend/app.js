const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const helmet = require('helmet');

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

app.disable('x-powered-by');

// Use all default Helmet headers first:
app.use(helmet()); // X-Content-Type-Options, X-DNS-Prefetch-Control, Referrer-Policy, etc.

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Fallback for other fetch directives.
      scriptSrc: ["'self'"], // Only allows scripts from our own domain.
      styleSrc: ["'self'", "https://fonts.googleapis.com"], // Allows stylesheets from our domain and Google Fonts.
      imgSrc: ["'self'", "data:", "blob:"], // Allows images from our domain, data URIs, and blobs.
      connectSrc: ["'self'"], // Restricts AJAX, WebSockets, etc., to our own domain.
      fontSrc: ["'self'", "https://fonts.gstatic.com"], // Allows fonts from our domain and Google Fonts.
      objectSrc: ["'none'"], // Disallows plugins like <object>, <embed>, <applet>.
      baseUri: ["'self'"], // Restricts the URLs that can appear in a page's <base> element.
      formAction: ["'self'"], // Restricts the URLs which the forms can submit to.
      frameAncestors: ["'none'"], // Prevents the page from being embedded in an iframe (clickjacking protection).
    },
  })
);
// --- End of CSP Fix ---
// Optional: also explicitly set frameguard (X-Frame-Options):
app.use(helmet.frameguard({ action: 'deny' }));


app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization","CSRF-Token"],
  credentials: true
}));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.text({ limit: "200mb" }));

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

app.get('/', (req, res) => {
  res.send('API Working');
});

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});