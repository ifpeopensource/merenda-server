import sendEmail from '../nodemailer.js';

import { generateStudentQRCode } from '../../../utils/generateStudentQRCode.js';

async function sendStudentQRCodeEmail(studentData) {
    const QRCode = await generateStudentQRCode();

    const message = {
        from: process.env.EMAIL_USER,
        to: studentData.email,
        subject: 'QRCode',
        html: '<p>Este é o seu QRCode:</p><img src="cid:student_qr_code@ifpeopensource.com.br" alt="QR code">',
        attachaments: [
            {
                filename: 'qrcode.png',
                path: `${QRCode}`,
                cid: 'student_qr_code@ifpeopensource.com.br',
            },
        ],
    };

    await sendEmail(message);
}

export default { sendStudentQRCodeEmail };
