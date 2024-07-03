const nodemailer = require('nodemailer')
import { SentMessageInfo } from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config()
// create reusable transporter object using the default SMTP transport
console.log(process.env.EMAIL)
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
})

// async..await is not allowed in global scope, must use a wrapper
const mailData = {
  // send mail with defined transport object

  from: process.env.EMAIL, // sender address
  to: process.env.EMAIL, // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>', // html body
}

transporter.sendMail(mailData, function (err: Error, info: SentMessageInfo) {
  if (err) console.log(err)
  else console.log(info)
})
