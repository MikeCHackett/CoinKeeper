import React, { useState } from 'react';
import { categoryData } from '../data/CategoryData';
import '../styles/category.styles.css';

export const Category = ({ onSelect, selectedCategory }) => {

  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  return (
    <>
        <div className='category-buttons-container'>
          {categoryData.map(category => (
            <button
              key={category.id} 
              onClick={() => {
              onSelect(category.categoryName);
              setActiveCategory(category.categoryName);
              }}
              className={`cat-btn ${activeCategory === category.categoryName ? "cat-btn-active" : ""}`}
              >
              {category.categoryName}
            </button>
          ))}
        </div>
    </>
  );
};
