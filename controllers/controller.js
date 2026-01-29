const {
  Patient,
  Doctor,
  Appointment,
  Disease,
  AppointmentDisease,
  User,
} = require("../models");

const { Op } = require("sequelize");
const formatDate = require("../helpers/helper");

class Controller {
  static async registForm(req, res) {
    try {
      res.render("regist");
    } catch (error) {
      res.send(error);
    }
  }

  static async regist(req, res) {
    try {
    } catch (error) {
      req.send(error);
    }
  }

  static async loginForm(req, res) {
    try {
      res.render("login");
    } catch (error) {
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      // dummy login (karena tidak ada admin & auth kompleks)
      res.redirect("/patients");
    } catch (error) {
      res.send(error);
    }
  }

  static async logout(req, res) {
    try {
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }

  static async patients(req, res) {
    try {
      const { search } = req.query;

      const option = {
        where: {},
        order: [["name", "ASC"]],
      };

      // SEARCH menggunakan Op (REQUIREMENT)
      if (search) {
        option.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const data = await Patient.findAll(option);
      res.render("patients", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async addPatientForm(req, res) {
    try {
      res.render("addPatient", { errors: null });
    } catch (error) {
      res.send(error);
    }
  }

  static async addPatient(req, res) {
    try {
      await Patient.create(req.body);
      res.redirect("/patients");
    } catch (error) {
      res.render("addPatient", { errors: error.errors });
    }
  }

  static async doctors(req, res) {
    try {
      const data = await Doctor.findAll();
      res.render("doctors", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async doctorDetail(req, res) {
    try {
      const data = await Doctor.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async appointments(req, res) {
    try {
      const data = await Appointment.findAll({
        include: [Patient, Doctor],
        order: [["createdAt", "DESC"]],
      });

      res.render("appointments", { data, formatDate });
    } catch (error) {
      res.send(error);
    }
  }

  static async addAppointmentForm(req, res) {
    try {
      const patients = await Patient.findAll();
      const doctors = await Doctor.findAll();
      const diseases = await Disease.findAll();

      res.render("addAppointment", {
        patients,
        doctors,
        diseases,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async addAppointment(req, res) {
    try {
      const { PatientId, DoctorId, complaint, DiseaseId } = req.body;
      console.log(DiseaseId);

      const appointment = await Appointment.create({
        PatientId,
        DoctorId,
        complaint,
        status: "pending",
      });

      // PROMISE CHAINING (REQUIREMENT)
      const diseaseData = DiseaseId.map((diseaseId) => ({
        AppointmentId: appointment.id,
        DiseaseId: diseaseId,
      }));
      console.log(diseaseData);

      await AppointmentDisease.bulkCreate(diseaseData);

      res.redirect("/appointments");
    } catch (error) {
      res.send(error);
    }
  }

  static async appointmentDetail(req, res) {
    try {
      const data = await Appointment.findByPk(req.params.id, {
        include: [Patient, Doctor, Disease],
      });

      res.render("appointmentDetail", { data });
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteAppointment(req, res) {
    try {
      await AppointmentDisease.destroy({
        where: { AppointmentId: req.params.id },
      });

      await Appointment.destroy({
        where: { id: req.params.id },
      });

      res.redirect("/appointments");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
