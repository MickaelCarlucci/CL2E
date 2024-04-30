import nodemailer from "nodemailer";
import mailgunTransport from "nodemailer-mailgun-transport";

import dotenv from 'dotenv';
dotenv.config();

const auth = {
    auth: {
      api_key: process.env.API_KEY_MAILGUN, // Votre clé API Mailgun
      domain: process.env.MAILGUN_DOMAIN // Votre domaine Mailgun
    }
  };
  
  const transporter = nodemailer.createTransport(mailgunTransport(auth));

  export default transporter;