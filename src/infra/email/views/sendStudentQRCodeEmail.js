import mailing from '../nodemailer.js';

import { generateStudentQRCode } from '../../../utils/generateStudentQRCode.js';

import { IFOSBase64Logo } from '../assets/IFOSBase64Logo';

async function sendStudentQRCodeEmail(studentData) {
  const QRCode = await generateStudentQRCode(
    studentData.id,
    IFOSBase64Logo
  );
  const studentFirstName = studentData.name.split(' ')[0];

  const message = {
    from: process.env.EMAIL_USER,
    to: studentData.email,
    subject: 'QRCode',
    html: '<p>Este é o seu QRCode:</p><img src="cid:student_qr_code@ifpeopensource.com.br" alt="QR code">',
    attachments: [
      {
        filename: `${studentFirstName} - ${studentData.id}.png`,
        content: Buffer.from(QRCode.split(',')[1], 'base64'),
        cid: 'student_qr_code@ifpeopensource.com.br',
      },
    ],
  };

  await mailing.sendEmail(message);
}

export default { sendStudentQRCodeEmail };
