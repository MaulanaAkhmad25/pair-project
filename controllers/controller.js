const {
  Patient,
  Doctor,
  Appointment,
  Disease,
  AppointmentDisease,
  User,
} = require("../models");
const bcrypt = require("bcryptjs");
const sendEmail = require("../helpers/sendEmail");

const { Op } = require("sequelize");
const formatDate = require("../helpers/helper");

class Controller {
  static async registForm(req, res) {
    try {
      const { error } = req.query;

      res.render("regist", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async regist(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const user = await User.create({ email, password, role });
      await Patient.create({ name, UserId: user.id });
      await sendEmail({
        to: user.email,
        subject: "Registrasi Berhasil",
        text: "Akun kamu berhasil dibuat",
      });
      res.redirect("/login");
    } catch (error) {
      if ((error.name = "SequelizeValidationError")) {
        error = error.errors.map((el) => el.message).join(";");
        res.redirect(`/regist?error=${error}`);
      } else {
        res.send(error);
      }
    }
  }

  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (isValidPassword) {
          req.session.userId = user.id;
          res.redirect("/patients");
        } else {
          const error = "Invalid username/password";
          res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = "Invalid username/password";
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/login");
      }
    });
  }

  static async patients(req, res) {
    try {
      const { specialist } = req.query;
      const { userId } = req.session;

      const where = {};

      if (specialist && specialist !== "all") {
        where.specialist = specialist;
      }

      const doctors = await Doctor.findAll({
        where,
        order: [["name", "ASC"]],
      });

      const specialistsRaw = await Doctor.findAll({
        attributes: ["specialist"],
        group: ["specialist"],
      });

      const specialists = specialistsRaw.map((d) => d.specialist);

      const patient = await Patient.findOne({
        where: { UserId: userId },
      });

      res.render("patients", {
        doctors,
        specialists,
        selectedSpecialist: specialist || "all",
        userId,
        patient,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async patientProfile(req, res) {
    try {
      const { id } = req.params;
      const isEdit = req.query.edit === "true";

      const userProfile = await Patient.findOne({
        where: { UserId: id },
      });

      res.render("patientProfile", {
        userProfile,
        isEdit,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async postPatientProfile(req, res) {
    try {
      const { id } = req.params;
      const { name, gender, dateOfBirth } = req.body;

      await Patient.update(
        { name, gender, dateOfBirth },
        { where: { UserId: id } },
      );

      res.redirect(`/patients/${id}/profile`);
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
      const { startDate, endDate } = req.query;
      const { userId } = req.session;

      const data = await Appointment.getAllAppointment(startDate, endDate);

      res.render("appointments", { data, userId, formatDate });
    } catch (error) {
      res.send(error);
    }
  }

  static async addAppointmentForm(req, res) {
    try {
      const { doctorId } = req.query;
      const { userId } = req.session;
      const patients = await Patient.findOne({ where: { UserId: userId } });
      const doctors = await Doctor.findAll();
      const diseases = await Disease.findAll();

      res.render("addAppointment", {
        patients,
        doctors,
        diseases,
        doctorId,
        userId,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async addAppointment(req, res) {
    try {
      const { PatientId, DoctorId, complaint, disease_id } = req.body;

      const appointment = await Appointment.create({
        PatientId,
        DoctorId,
        complaint,
        status: "pending",
      });

      const diseaseData = disease_id.map((diseaseId) => ({
        appointment_id: appointment.id,
        disease_id: diseaseId,
      }));

      await AppointmentDisease.bulkCreate(diseaseData);

      res.redirect("/appointments");
    } catch (error) {
      res.send(error);
    }
  }

  static async appointmentDetail(req, res) {
    try {
      const { userId } = req.session;
      const data = await Appointment.findByPk(req.params.id, {
        include: [Patient, Doctor, Disease],
      });

      res.render("appointmentDetail", { data, userId });
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteAppointment(req, res) {
    try {
      const { id } = req.params;
      await AppointmentDisease.destroy({
        where: { appointment_id: id },
      });

      await Appointment.destroy({
        where: { id },
      });

      res.redirect("/appointments");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
