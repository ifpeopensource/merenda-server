import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { generatingQRCode } from '../../utils/generateQRCode.js';

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.email_host,
  port: process.env.email_port,
  secure: false,
  service: process.env.email_service,
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass
  }
});

export async function sendEmail(studentData) {

  const QRCode = await generatingQRCode();

  var message = {
    from: process.env.email_user, 
    to: studentData.email,
    subject: 'QRCode de Acesso',
    html: `<p>Este é o seu QRCode de acesso:</p><img src="cid:qr-code-cid" alt="QR code">`,
    attachments: [{
      filename: 'qrcode.png',
      path: `${QRCode}`,
      cid: 'qr-code-cid'
    }]
  };

  transporter.sendMail(message, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('IFOS - E-mail enviado para: ' + message.to);
    }
  });
}