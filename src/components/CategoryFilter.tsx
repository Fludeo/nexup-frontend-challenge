import React, { useState } from 'react';
import { ProductCategory } from '../models/ProductCategory';

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
  return (
    <div>
      {categories.length > 0 && (
        <div>
          <h2>Categories</h2>

          {categories.map((category) => (
            <button
              type="button"
              key={category}
              style={{
                backgroundColor: appliedFilters.has(category)
                  ? 'blue'
                  : 'white',
                color: appliedFilters.has(category) ? 'white' : 'black',
              }}
              onClick={() => onFilterChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
