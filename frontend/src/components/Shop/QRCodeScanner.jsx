import React, { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';
import { useDispatch } from 'react-redux';
import { updateProductStock } from '../../redux/actions/product';

const QRCodeScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [productId, setProductId] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const dispatch = useDispatch();

  const handleScan = (data) => {
    if (data) {
      try {
        // Parse the scanned JSON data
        const parsedData = JSON.parse(data);
        const { productId: scannedProductId, size: scannedSize } = parsedData;

        // Set state with the parsed data
        setProductId(scannedProductId);
        setSize(scannedSize);
        setQuantity(1); // Reset quantity to 1 (or use any default value)
        setScannedData(parsedData); // Optionally store the full parsed data
      } catch (error) {
        console.error('Error parsing scanned QR code data:', error);
      }
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR code:', err);
  };

  const handleUpdate = async () => {
    if (productId && size && quantity > 0) {
      try {
        // Decrement quantity by 1
        const response = await dispatch(updateProductStock(productId, size, quantity - 1));
        console.log(`Successfully updated quantity for size ${size} of product ${productId}`, response);
        setQuantity(1); // Reset quantity to 1 after update
      } catch (error) {
        console.error(`Error updating quantity for size ${size} of product ${productId}:`, error);
      }
    } else {
      console.error('Product ID, size, or quantity is missing or invalid.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold mb-4">QR Code Scanner</h1>
      <div className="w-full max-w-sm">
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result?.text);
            }
            if (error) {
              handleError(error);
            }
          }}
          containerStyle={{ width: '100%' }}
        />
      </div>
      {scannedData && (
        <div className="mt-4">
          <p>Scanned Data: {JSON.stringify(scannedData, null, 2)}</p>
          <button
            onClick={handleUpdate}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Quantity
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
