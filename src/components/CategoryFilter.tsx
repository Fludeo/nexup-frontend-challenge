import React, { useState } from 'react';
import { ProductCategory } from '../models/ProductCategory';
import './CategoryFilter.css';

interface CategoryFilterProps {
  onNewFilters: (filters: ProductCategory[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onNewFilters,
}) => {
  const [categories] = useState<ProductCategory[]>(
    Object.values(ProductCategory),
  );
  const [appliedFilters, setAppliedFilters] = useState<Set<ProductCategory>>(
    new Set(),
  );

  const onFilterChange = (filter: ProductCategory) => {
    const newFilters = new Set(appliedFilters);
    if (newFilters.has(filter)) newFilters.delete(filter);
    else newFilters.add(filter);
    setAppliedFilters(newFilters);
    onNewFilters([...newFilters]);
  };

  const clearFilters = () => {
    if (appliedFilters.size === 0) return;
    setAppliedFilters(new Set());
    onNewFilters([]);
  };
  return (
    <div className="category-filter">
      {categories.length > 0 && (
        <div>
          <h2 className="category-filter_title">Categories</h2>
          <div className="category-filter_buttons">
            <button
              type="button"
              key="All"
              className={`category-filter_button ${
                appliedFilters.size === 0
                  ? 'category-filter_button--active'
                  : ''
              }`}
              onClick={clearFilters}
            >
              All
            </button>
            {categories.map((category) => {
              const isActive = appliedFilters.has(category);
              return (
                <button
                  type="button"
                  key={category}
                  className={`category-filter_button ${
                    isActive ? 'category-filter_button--active' : ''
                  }`}
                  onClick={() => onFilterChange(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
