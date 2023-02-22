import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'node:path';
import { URL } from 'node:url';

//https://stackoverflow.com/a/66651120
var __dirname = new URL('.', import.meta.url).pathname;

const HANDLEBARS_OPTIONS = {
  viewEngine: {
    extName: '.handlebars',
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, '..', 'views'),
  extName: '.handlebars',
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.use('compile', hbs(HANDLEBARS_OPTIONS));

async function sendEmail(message) {
  transporter.sendMail(message, (error) => {
    if (error) {
      console.error('Could not send email to user, error: ', error);
      throw error;
    }
  });
}

export default { sendEmail };
