import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/user'
import dotenv from 'dotenv'
import { SentMessageInfo } from 'nodemailer'
const nodemailer = require('nodemailer')
dotenv.config()
const sendEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email, subject, body } = req.body
  const { id } = req.params

  const user = await User.findOne({ _id: id })
  if (!user) {
    res.status(400).json({ error: 'user do not exists' })
    return
  }
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    secure: true,
  })
  const mailData = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
  }
  transporter.sendMail(mailData, (err: Error | null, info: SentMessageInfo) => {
    if (err) {
      console.error(`Error occurred when sending email: ${err.message}`)
      res.status(500).json({ error: 'Failed to send email' })
    } else {
      console.log(`Email sent: ${info.response}`)
      res.status(200).json({ message: 'Email successfully sent' })
      return
    }
  })
})
module.exports = {
  sendEmail,
}
