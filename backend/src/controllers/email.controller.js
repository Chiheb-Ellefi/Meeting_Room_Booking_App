const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const { findUser } = require("../services/user.service");
const { NotFound } = require("../../config/errors");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "chihebellefi111@gmail.com",
    pass: "FZrEvjpXqV4J1th8",
  },
});

const sendEmail = async (req, res) => {
  const { code, email, type, subject, html } = req.body;
  if (type != "support") {
    const user = await findUser({ email });
    if (!user) {
      throw new NotFound(`No user found with email : ${email}.`);
    }
  }
  let info = await transporter.sendMail({
    from: '"Meeting Room Booking App" <booking.app@ooredoo.tn>',
    to: email,
    subject: type == "support" ? subject : "Verification Code ",
    html:
      type == "support"
        ? html
        : `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ooredoo Meeting Room Booking App</a>
    </div>
    
    <p style="font-size:1.1em">Hi, we received a request to reset your password for the Ooredoo Meeting Room Booking App. Use the following code to reset your password. This code is valid for 30 minutes.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
    <p style="font-size:1.1em"">If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
    <p style="font-size:0.9em;">Regards,<br />The Ooredoo Meeting Room Booking Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#00466a;font-size:0.8em;line-height:1;font-weight:300">
      <p>Ooredoo</p>
      <p></p>
    </div>
  </div>
</div>
`,
  });

  res.status(StatusCodes.ACCEPTED).json(info);
};

module.exports = sendEmail;
