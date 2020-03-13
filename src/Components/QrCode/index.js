import React from 'react';
import './style.scss';

const QrCode = props => {
  const { scannedCode } = props;
  return (
    <>
      {scannedCode !== '' && (
        <div className="scanned-wrapper text-center">
          <span className="qrcode">{scannedCode}</span>
        </div>
      )}
    </>
  );
};

export default QrCode;
