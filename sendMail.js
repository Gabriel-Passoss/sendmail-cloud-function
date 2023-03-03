'use strict';

const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

module.exports.handle = async ({ body }) => {
  const emailData = JSON.parse(body)

  const messageEmail = {
    from: `${emailData.name} <${emailData.email}>`,
    to: "Equipe WEQA <tech@weqa.com.br>",
    subject: emailData.subject,
    html: [
      `<div style="font-family: sans-serif; font-size: 17px; color: #111;">`,
      `<p>${emailData.message}</p>`,
    ].join('\n')
  }
  
  try {
    await transport.sendMail(messageEmail)
    return {
      statusCode: 200,
      body: `email sent!`
    }
  } catch(err) {
    console.log(err)
    return {
      statusCode: 500,
      body: `An error ocurred ${err}`
    }
  }
};
