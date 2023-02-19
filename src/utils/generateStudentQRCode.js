import qrcode from 'qrcode';

import { createCanvas, loadImage } from 'canvas';

export async function generateStudentQRCode(studentId, base64Image) {
  const qrCodeOptions = {
    errorCorrectionLevel: 'H',
    width: 256,
    color: { dark: '#000000', light: '#ffffff' },
  };
  const qrCodeDataUrl = await qrcode.toDataURL(studentId, qrCodeOptions);

  const canvas = createCanvas(qrCodeOptions.width, qrCodeOptions.width);
  const context = canvas.getContext('2d');

  const base64ImageDimensions = {
    width: qrCodeOptions.width * 0.3,
    height: qrCodeOptions.width * 0.3,
  };

  const [qrCodeImageCanvasElement, base64ImageCanvasElement] = Promise.all([loadImage(qrCodeDataUrl), loadImage(base64Image)])

  context.drawImage(
    qrCodeImageCanvasElement,
    0,
    0,
    qrCodeOptions.width,
    qrCodeOptions.width
  );

  const centerCoords = {
    x: qrCodeOptions.width / 2,
    y: qrCodeOptions.width / 2
  };
  
  const rectangleCoords = {
    width: base64ImageDimensions.width * 1.0,
    height: base64ImageDimensions.height * 1.0,
    x: centerCoords.x - (base64ImageDimensions.width * 1.0) / 2,
    y: centerCoords.y - (base64ImageDimensions.height * 1.0) / 2,
  };

  context.fillStyle = '#FFFFFF';
  context.fillRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight);

  context.drawImage(
    base64ImageCanvasElement,
    rectangleCoords.x + (rectangleCoords.width - base64ImageDimensions.width) / 2,
    rectangleCoords.y + (rectangleCoords.height - base64ImageDimensions.height) / 2,
    base64ImageDimensions.width,
    base64ImageDimensions.height
  );

  return canvas.toDataURL();
}
