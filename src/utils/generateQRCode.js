import qrcode from 'qrcode';

export async function generatingQRCode(studentId) {
    const qrCode = await qrcode.toDataURL(studentId,  { 
        errorCorrectionLevel: 'H', 
        width: 256, 
        color: { dark: '#000000', light: '#ffffff' }
    });

    return qrCode;
}
