import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmailWithAttachment(subject: string, text: string, to: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: 'Telegraf Auto<dbatista@findes.org.br>',
      to: to,
      subject: subject,
      text: text,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso:', subject);
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
    }
  }
}
