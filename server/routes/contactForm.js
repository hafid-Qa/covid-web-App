import nodemailer from "nodemailer";
import express from "express";
const router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();

router.post("/send", (req, res) => {});

export default router;
