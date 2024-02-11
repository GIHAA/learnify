const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: 465,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER, // Use environment variable for user
//       pass: process.env.EMAIL_PASS // Use environment variable for password
//     },
//   });


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "spmsneakerhub@gmail.com", 
    pass: "bzuvzlqqqvztpmke" 
  },
});

async function sendEmail(emailDetails) {

  console.log(emailDetails.to)
  console.log(emailDetails.subject)
  console.log(emailDetails.text)

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: emailDetails.to, // list of receivers
    subject: emailDetails.subject, // Subject line
    text: emailDetails.text, // plain text body
  });
 

  console.log("Message sent: %s", info.messageId);
 
    return true;
  
}


// Export the sendEmail function
module.exports = sendEmail;

