import qrcode from 'qrcode';
import crypto from 'crypto';

export async function generatingQRCode() {
    const code = crypto.randomBytes(8).toString('hex');

    const qrCode = await qrcode.toDataURL(code,  { 
        errorCorrectionLevel: 'H', 
        width: 256, 
        color: { dark: '#000000', light: '#ffffff' }
    });

    return qrCode;
}
