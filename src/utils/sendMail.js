import nodemailer from 'nodemailer';

import { SMTP } from '../constants/smtp.js';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export default async function sendEmail(mailOptions) {
  await transporter.sendMail(mailOptions);
}
