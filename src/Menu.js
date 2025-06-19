// src/Menu.js
import React from 'react';
import './Menu.css';

function Menu({ onSelectCategory, categoriesData, categoryDisplayImages, className }) {
    return (
        <div className={`menu-container ${className}`}>
            <div className="menu-header">
                <h2 >Menú</h2>
            </div>
            <ul className="category-list">
                {categoriesData.map((category) => (
                    <li
                        key={category.id}
                        onClick={() => onSelectCategory(category.name)}
                        className="category-item"
                    >
                        {/* Aquí es donde se muestra la imagen para la categoría */}
                        {categoryDisplayImages[category.name] && (
                            <img
                                src={categoryDisplayImages[category.name]}
                                alt={category.name}
                                className="category-image"
                            />
                        )}
                        <span className="category-name">{category.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;