const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", (req, res) => {
  res.redirect("/login"); // atau /login
});

router.get("/regist", Controller.registForm);
router.post("/regist", Controller.regist);

router.get("/login", Controller.loginForm);
router.post("/login", Controller.login);
router.get("/logout", Controller.logout);

router.use((req, res, next) => {
  console.log(req.session);
  if (!req.session.userId) {
    const error = "Please login first!";
    res.redirect(`/login?error=${error}`);
  } else {
    next();
  }

  // console.log("Time:", new Date());
  // next();
});

router.get("/patients", Controller.patients);
router.get("/patients/add", Controller.addPatientForm);
router.post("/patients/add", Controller.addPatient);
router.get("/patients/:id/profile", Controller.patientProfile);
router.post("/patients/:id/profile", Controller.postPatientProfile);

router.get("/doctors", Controller.doctors);
router.get("/doctors/:id", Controller.doctorDetail);

router.get("/appointments", Controller.appointments);
router.get("/appointments/add", Controller.addAppointmentForm);
router.post("/appointments/add", Controller.addAppointment);
router.get("/appointments/:id", Controller.appointmentDetail);
router.get("/appointments/:id/delete", Controller.deleteAppointment);

module.exports = router;
