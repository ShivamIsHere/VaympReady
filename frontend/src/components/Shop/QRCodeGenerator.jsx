// QRCodeGenerator.js
import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ productId, size }) => {
  const qrData = JSON.stringify({ productId, size });
  return <QRCode value={qrData} />;
};

export default QRCodeGenerator;
