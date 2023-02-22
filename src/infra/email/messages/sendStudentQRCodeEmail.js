import fs from 'node:fs';

import mailing from '../nodemailer.js';

import { generateStudentQRCode } from '../../../utils/generateStudentQRCode.js';

const IFOSBase64Logo = JSON.parse(
  fs.readFileSync(
    new URL('../../../assets/IFOSBase64Logo.json', import.meta.url)
  )
).IFOSBase64Logo;

async function sendStudentQRCodeEmail(studentData) {
  const QRCode = await generateStudentQRCode(studentData.id, IFOSBase64Logo);
  const studentFirstName = studentData.name.split(' ')[0];

  const message = {
    from: process.env.EMAIL_USER,
    to: studentData.email,
    subject: 'Aqui está seu QR Code para receber a merenda!',
    template: 'studentQRCodeEmail',
    context: {
      name: studentFirstName,
    },
    attachments: [
      {
        filename: `${studentFirstName} - ${studentData.id}.png`,
        content: QRCode,
        cid: 'student_qr_code@ifpeopensource.com.br',
      },
      {
        filename: `${studentFirstName} - ${studentData.id}.png`,
        content: QRCode,
      },
    ],
  };

  await mailing.sendEmail(message);
}

export { sendStudentQRCodeEmail };
