/*const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.TRANSPORTER_EMAIL,
    pass: process.env.TRANSPORTER_PASS,
  },
});
const code = Math.floor(100000 + Math.random() * 900000);
const info = await transporter.sendMail({
  from: "chiheb.ellefi@istic.ucar.tn", // sender address
  to: email, // list of receivers
  subject: "Verification Code", // Subject line
  text: code.toString(), // plain text body
  html: "<b>Hello world?</b>", // html body
});*/
