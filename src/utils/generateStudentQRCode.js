import qrcode from 'qrcode';

import { createCanvas, loadImage } from 'canvas';

const QRCODE_OPTIONS = {
  errorCorrectionLevel: 'H',
  width: 600,
  center: {
    x: 600 / 2, // width / 2
    y: 600 / 2, // width / 2
  },
  color: { dark: '#1B5A26', light: '#FFFFFF' },
};

const CENTER_IMAGE_DIMENSIONS = {
  width: QRCODE_OPTIONS.width * 0.245, // 24.5%
  height: QRCODE_OPTIONS.width * 0.245,
};

const DETAILS = {
  square: {
    position: {
      x: QRCODE_OPTIONS.width * 0.185,
      y: QRCODE_OPTIONS.width * 0.185,
    },
    dimensions: {
      width: QRCODE_OPTIONS.width * 0.09,
      height: QRCODE_OPTIONS.width * 0.09,
    },
    color: '#C8191E',
  },
  centerImage: {
    dimensions: {
      width: CENTER_IMAGE_DIMENSIONS.width,
      height: CENTER_IMAGE_DIMENSIONS.height,
    },
    position: {
      x: QRCODE_OPTIONS.center.x - CENTER_IMAGE_DIMENSIONS.width / 2,
      y: QRCODE_OPTIONS.center.y - CENTER_IMAGE_DIMENSIONS.height / 2,
    },
    background: {
      dimensions: {
        width: CENTER_IMAGE_DIMENSIONS.width,
        height: CENTER_IMAGE_DIMENSIONS.height,
      },
      position: {
        x: QRCODE_OPTIONS.center.x - CENTER_IMAGE_DIMENSIONS.width / 2,
        y: QRCODE_OPTIONS.center.y - CENTER_IMAGE_DIMENSIONS.height / 2,
      },
    },
  },
};

export async function generateStudentQRCode(studentId, base64Image) {
  const qrCodeDataUrl = await qrcode.toDataURL(studentId, QRCODE_OPTIONS);

  const canvas = createCanvas(QRCODE_OPTIONS.width, QRCODE_OPTIONS.width);
  const context = canvas.getContext('2d');

  const [qrCodeImageCanvasElement, base64ImageCanvasElement] =
    await Promise.all([loadImage(qrCodeDataUrl), loadImage(base64Image)]);

  context.drawImage(
    qrCodeImageCanvasElement,
    0,
    0,
    QRCODE_OPTIONS.width,
    QRCODE_OPTIONS.width
  );

  context.fillStyle = QRCODE_OPTIONS.color.light;
  context.fillRect(
    DETAILS.centerImage.background.position.x,
    DETAILS.centerImage.background.position.y,
    DETAILS.centerImage.background.dimensions.width,
    DETAILS.centerImage.background.dimensions.height
  );

  context.drawImage(
    base64ImageCanvasElement,
    DETAILS.centerImage.position.x,
    DETAILS.centerImage.position.y,
    DETAILS.centerImage.dimensions.width,
    DETAILS.centerImage.dimensions.height
  );

  context.fillStyle = '#C8191E';
  context.fillRect(
    DETAILS.square.position.x,
    DETAILS.square.position.y,
    DETAILS.square.dimensions.width,
    DETAILS.square.dimensions.height
  );

  return canvas.toBuffer();
}
