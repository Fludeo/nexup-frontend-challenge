import React from 'react';
import { Product } from '../../models/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  product,
}) => {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>{product.status}</p>
    </div>
  );
};
