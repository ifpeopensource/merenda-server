import nodemailer from 'nodemailer';
import crypto from 'crypto';
import qrcode from 'qrcode';

// Function criada para poder ser acessada pelo UserController
export async function sendEmail() {
    // Gerando um "codigo" aleatório usando o crypto do próprio Node
    const code = crypto.randomBytes(8).toString('hex');

    // Gerando o QRCode tendo como conteúdo o código
    const qrCode = await qrcode.toDataURL(code,  { errorCorrectionLevel: 'H', width: 256, color: { dark: '#000000', light: '#ffffff' }});

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '' // <- OBS: Precisa ser uma SENHA DE APLICATIVO do gmail, por conta da verificação de duas etapas.
        }
    })

    // Aqui definimos quem irá receber (o aluno) e quem irá enviar (nós)
    let emailInformations = {
        from: '', 
        to: '',
        subject: 'QRCode de Acesso',
        html: `<p>Este é o seu QRCode de acesso:</p><img src="cid:qr-code-cid" alt="QR code">`,
        attachments: [{
          filename: 'qrcode.png',
          path: `${qrCode}`,
          cid: 'qr-code-cid'
        }]
    }  

    // E-mail enviado, caso dê errado irá falar o erro, caso não, irá enviar
    transporter.sendMail(emailInformations, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('IFOS - E-mail enviado para: ' + emailInformations.to);
        }
      });
}