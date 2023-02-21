import { readFile } from 'fs/promises';

import mailing from '../nodemailer.js';

import { generateStudentQRCode } from '../../../utils/generateStudentQRCode.js';

const IFOSBase64Logo = JSON.parse(
  await readFile(
    new URL('../../../assets/IFOSBase64Logo.json', import.meta.url)
  )
).IFOSBase64Logo;

async function sendStudentQRCodeEmail(studentData) {
  const QRCode = await generateStudentQRCode(studentData.id, IFOSBase64Logo);
  const studentFirstName = studentData.name.split(' ')[0];

  const message = {
    from: process.env.EMAIL_USER,
    to: studentData.email,
    subject: 'QRCode',
    template: 'email',
    context: {
      name: studentFirstName,
    },
    attachments: [
      {
        filename: `${studentFirstName} - ${studentData.id}.png`,
        content: Buffer.from(QRCode.split(',')[1], 'base64'),
        cid: 'student_qr_code@ifpeopensource.com.br',
      },
      {
        filename: `${studentFirstName} - ${studentData.id}.png`,
        content: Buffer.from(QRCode.split(',')[1], 'base64'),
      },
    ],
  };

  await mailing.sendEmail(message);
}

export { sendStudentQRCodeEmail };
