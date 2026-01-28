const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', (req, res) => {
  res.redirect('/login') // atau /login
})

router.get('/login', Controller.loginForm)
router.post('/login', Controller.login)
router.get('/logout', Controller.logout)

router.get('/patients', Controller.patients)
router.get('/patients/add', Controller.addPatientForm)
router.post('/patients/add', Controller.addPatient)

router.get('/doctors', Controller.doctors)
router.get('/doctors/:id', Controller.doctorDetail)

router.get('/appointments', Controller.appointments)
router.get('/appointments/add', Controller.addAppointmentForm)
router.post('/appointments/add', Controller.addAppointment)
router.get('/appointments/:id', Controller.appointmentDetail)
router.get('/appointments/:id/delete', Controller.deleteAppointment)

module.exports = router
