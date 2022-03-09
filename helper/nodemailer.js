const nodemailer = require("nodemailer");

const email = async (to) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "anirudh.eminence@gmail.com", // generated ethereal user
      pass: "webemi@123", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "gautammalik.eminence@gmail.com", // sender address
    to: to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};

module.exports = email;
