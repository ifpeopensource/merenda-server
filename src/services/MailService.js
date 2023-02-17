import nodemailer from 'nodemailer';

import { generateStudentQRCode } from '../utils/generateStudentQRCode.js';


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(studentData) {

  const QRCode = await generateStudentQRCode();

  const message = {
    from: process.env.EMAIL_USER, 
    to: studentData.email,
    subject: 'QRCode de Acesso',
    html: `<p>Este é o seu QRCode de acesso:</p><img src="cid:student_qr_code@ifpeopensource.com.br" alt="QR code">`,
    attachments: [{
      filename: 'qrcode.png',
      path: `${QRCode}`,
      cid: 'student_qr_code@ifpeopensource.com.br'
    }]
  };

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

