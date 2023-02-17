import nodemailer from 'nodemailer';

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

async function sendEmail(message, studentData) {
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
