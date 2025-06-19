// src/NavBar.js
import React, { useState } from 'react';
import './NavBar.css';

// URLs específicas para cada categoría
const DESAYUNO_REDIRECTION_URL = 'https://www.cocinadominicana.com/indice-recetas';
const ALMUERZO_REDIRECTION_URL = 'https://cookpad.com/cu/recetas/16659832?ref=search&search_term=comida+dominicana';
const CENA_REDIRECTION_URL = 'https://cookpad.com/cu/recetas/14140201?ref=search&search_term=comida+dominicana';
const POSTRE_REDIRECTION_URL = 'https://www.cocinadominicana.com/habichuelas-con-dulce';


function NavBar({ onAddRecipe, onToggleSidebar, isSidebarVisible }) {
    // Las categorías y recetas se mantienen para la estructura del desplegable
    const categories = {
        Desayuno: [
            { nombre: 'Huevos Rancheros' },
            { nombre: 'Pancakes con Miel' }
        ],
        Almuerzo: [
            { nombre: 'Ensalada Mediterránea' },
            { nombre: 'Pasta Alfredo' }
        ],
        Cena: [
            { nombre: 'Sopa de Tomate Cremosa' },
            { nombre: 'Pollo al Horno con Verduras' }
        ],
        Postre: [
            { nombre: 'Crumble de Manzana' },
            { nombre: 'Brownie de Chocolate' }
        ],
    };

    const [selectedCategory, setSelectedCategory] = useState(null);

    // Abre/cierra el menú desplegable de una categoría
    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    // Función para redirigir según la categoría
    const redirectToSite = (category) => {
        let url;
        switch (category) {
            case 'Desayuno':
                url = DESAYUNO_REDIRECTION_URL;
                break;
            case 'Almuerzo':
                url = ALMUERZO_REDIRECTION_URL;
                break;
            case 'Cena':
                url = CENA_REDIRECTION_URL;
                break;
            case 'Postre':
                url = POSTRE_REDIRECTION_URL;
                break;
            default:
                console.warn(`No hay URL definida para la categoría: ${category}`);
                return; // No hacer nada si no hay URL
        }
        window.open(url, '_blank', 'noopener noreferrer');
        setSelectedCategory(null); // Cierra cualquier desplegable
    };

    return (
        <nav className="navbar">
            <div className="navbar-menu">
                {/* Botón para ocultar/mostrar el menú lateral (funcionalidad original) */}
                <button onClick={onToggleSidebar}>
                    {isSidebarVisible ? 'Ocultar Menú' : 'Mostrar Menú'}
                </button>

                {/* Botón "Añadir Receta" (funcionalidad original, muestra el formulario) */}
                <button onClick={onAddRecipe}>Añadir Receta</button>

                {Object.keys(categories).map((category) => (
                    <div key={category} className="navbar-item">
                        {/* El botón principal de la categoría ahora redirige */}
                        <button onClick={() => redirectToSite(category)}>
                            {category}
                        </button>

                        {/* Menú desplegable para la categoría seleccionada */}
                        {selectedCategory === category && (
                            <div className="dropdown-menu">
                                {categories[category].map((recipe, index) => (
                                    <span
                                        key={index}
                                        // Los ítems del desplegable también redirigen a la URL de su categoría
                                        onClick={() => redirectToSite(category)}
                                        className="dropdown-item"
                                    >
                                        {recipe.nombre}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;