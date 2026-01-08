import React from 'react';
import { Product } from '../../models/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.css';

interface ProductListProps {
  productList: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productList,
}) => {
  return (
    <div className="product-list">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
