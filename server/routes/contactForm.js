import nodemailer from "nodemailer";
import express from "express";
const router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();

router.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_APP_PASS,
    },
  });

  try {
    transport.sendMail({
      from: email,
      to: "haqarchi@gmail.com",
      subject: `Request from ${name ? name : email}`,
      html: `
        <p>You have a new request form submission</p>
        <br>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
      `,
    });

    res
      .status(200)
      .json({ message: "Your message has been successfully submitted" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
