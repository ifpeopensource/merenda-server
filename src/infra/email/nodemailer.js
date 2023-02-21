import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  ignoreTLS: true,
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialDirs: path.resolve('./src/infra/email/views/layouts'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/infra/email/views/layouts'),
  extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));

async function sendEmail(message) {
  transporter.sendMail(message, (error) => {
    if (error) {
      console.log(`E-mail não enviado, erro: ${error}`);
      throw error;
    } else {
      console.log('IFOS - E-mail enviado para: ' + message.to);
    }
  });
}

export default { sendEmail };
