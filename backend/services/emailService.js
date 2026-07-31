const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendPasswordResetEmail(toEmail, resetUrl) {
    const from = process.env.EMAIL_FROM || 'no-reply@microfinance.local';
    await this.transporter.sendMail({
      from,
      to: toEmail,
      subject: 'Reset your Microfinance password',
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to set a new password. This link expires in 15 minutes.</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>If you did not request this, you can safely ignore this email.</p>
      `,
    });
  }
}

module.exports = new EmailService();
