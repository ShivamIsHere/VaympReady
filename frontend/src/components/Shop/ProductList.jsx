// ProductList.js
import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const ProductList = ({ products }) => {
  return (
    <div className="qr-code-container">
      {products.map((product) =>
        product.stock.map((stockItem) => (
          <div key={`${product._id}-${stockItem.size}`}>
            <p>{stockItem.size}</p>
            <QRCodeGenerator productId={product._id} size={stockItem.size} />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
