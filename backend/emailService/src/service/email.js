const { moduleLogger } = require('@sliit-foss/module-logger');
const nodemailer = require('nodemailer');

const logger = moduleLogger("email-service");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

async function sendEmail(emailDetails) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailDetails.to,
      subject: emailDetails.subject,
      text: emailDetails.text
    });

    logger.info(`Message sent to: ${emailDetails.to}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email to ${emailDetails.to}: ${error.message}`);
    return false;
  }
}


module.exports = sendEmail;
