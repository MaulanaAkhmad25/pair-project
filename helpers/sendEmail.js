const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "haidoccustomerservice@gmail.com",
        pass: "tqrlpdtfynrmbgrf",
      },
    });

    const mailOptions = {
      from: "noreply",
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Failed to send email:", err.message);
    throw err;
  }
}

module.exports = sendEmail;
