let nodemailer = require('nodemailer')
require('dotenv').config();
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    }
    
});

module.exports = transporter