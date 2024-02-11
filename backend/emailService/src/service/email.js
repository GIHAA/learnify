const nodemailer = require("nodemailer");
const dotenv = require("dotenv"); // Use require for CommonJS module

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for user
      pass: process.env.EMAIL_PASS // Use environment variable for password
    },
  });

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER , // sender address
    to: "bar@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

sendEmail().catch(console.error);
