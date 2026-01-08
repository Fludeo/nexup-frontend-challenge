import React from 'react';
import { Product } from '../../models/Product';
import './ProductCard.css';
import { formatPrice } from '../../utils/price.parse';
import { ProductStatus } from '../../models/ProductStatus';

interface ProductCardProps {
  product: Product;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  product,
}) => {
  const isActive = product.status === ProductStatus.Active;
  return (
    <div className="product-card">
      <h2 className="product-card_name">{product.name}</h2>
      <div className="product-card_grid">
        <div className="product-card_item">
          <span className="product-card_label">Status</span>
          <span
            className={`product-card_status ${
              isActive
                ? 'product-card_status--active'
                : 'product-card_status--inactive'
            }`}
          >
            {product.status}
          </span>
        </div>
        <div className="product-card_item">
          <span className="product-card_label">Price</span>
          <span className="product-card_price">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="product-card_item">
          <span className="product-card_label">Category</span>
          <span className="product-card_category">{product.category}</span>
        </div>
      </div>
    </div>
  );
};
