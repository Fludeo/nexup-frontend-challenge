import React, { useState } from 'react';
import { ProductList } from '../ProuductList/ProductList';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { useProducts } from '../../hooks/useProducts';
import { IProductQuery } from '../../api/products.service';
import './ProductManager.css';

export const ProductManager: React.FC = () => {
  const [productQuery, setProductQuery] = useState<IProductQuery>({
    filters: [],
    search: '',
  });
  const { products, loading, error } = useProducts(productQuery);

  return (
    <div className="product-manager">
      <CategoryFilter
        onNewFilters={(filters) => {
          setProductQuery((prev) => ({ ...prev, filters }));
        }}
        onSearchChange={(search) => {
          setProductQuery((prev) => {
            if (prev.search === search) return prev;
            return { ...prev, search };
          });
        }}
      />
      {loading && <p className="product-manager_message">Loading...</p>}
      {error && <p className="product-manager_message">Error: {error}</p>}
      {products && loading === false && products.length > 0 && (
        <ProductList productList={products} />
      )}
      {products && loading === false && products.length === 0 && (
        <p className="product-manager_message">
          No products found for the current filters.
        </p>
      )}
    </div>
  );
};
