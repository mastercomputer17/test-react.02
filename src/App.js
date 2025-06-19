//APP.JS src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu';
import NavBar from './NavBar';

// --- IMPORTACIONES DE IMÁGENES ---
import desayuno1 from './images/desayuno1.jpg';
import almuerzo2 from './images/almuerzo2.png';
import sena3 from './images/sena3.png';
import postre4 from './images/postre4.png';

// Mapa de imágenes por defecto según el tipo de comida
const defaultImagesByType = {
  desayuno: desayuno1,
  almuerzo: almuerzo2,
  cena: sena3,
  postre: postre4,
  default: desayuno1
};

// Definición de las recetas iniciales
const recetasIniciales = {
  huevos: {
    nombre: 'Huevos Rancheros',
    ingredientes: ['2 Huevos', '1 Tortilla de maíz', 'Salsa ranchera', 'Frijoles refritos', 'Queso fresco'],
    instrucciones: '1. Calienta la tortilla y los frijoles.<br />2. Fríe los huevos al gusto.<br />3. Sirve los huevos sobre la tortilla con frijoles, salsa ranchera y queso.',
    imagen: desayuno1, // Usando tu imagen de desayuno
    tipo: 'desayuno',
  },
  pasta: {
    nombre: 'Pasta Alfredo',
    ingredientes: ['200g Pasta fettuccine', '50g Mantequilla', '1 taza Crema para batir', '1/2 taza Queso parmesano rallado', 'Sal', 'Pimienta'],
    instrucciones: '1. Cocina la pasta según las instrucciones del paquete.<br />2. Mientras tanto, derrite la mantequilla en una sartén.<br />3. Agrega la crema y cocina a fuego lento.<br />4. Incorpora el queso parmesano y sazona con sal y pimienta.<br />5. Mezcla la salsa con la pasta escurrida.',
    imagen: almuerzo2, // Usando tu imagen de almuerzo
    tipo: 'almuerzo',
  },
  sopa: {
    nombre: 'Sopa de Tomate Cremosa',
    ingredientes: ['1 kg Tomates maduros', '1 Cebolla', '2 dientes de Ajo', 'Caldo de verduras', 'Crema de leche', 'Albahaca fresca'],
    instrucciones: '1. Sofríe cebolla y ajo.<br />2. Añade tomates y caldo, cocina.<br />3. Licúa la mezcla, cuela.<br />4. Calienta, añade crema y albahaca. Sirve.',
    imagen: sena3, // Usando tu imagen de cena
    tipo: 'cena',
  },
  ensalada: {
    nombre: 'Ensalada Mediterránea',
    ingredientes: ['Lechuga variada', 'Tomates cherry', 'Pepino', 'Aceitunas Kalamata', 'Queso feta', 'Aderezo de aceite y limón'],
    instrucciones: '1. Lava y corta los vegetales.<br />2. Desmorona el queso feta.<br />3. Combina todos los ingredientes en un bol grande.<br />4. Aliña con aceite de oliva, zumo de limón, sal y pimienta.',
    imagen: almuerzo2, // Usando tu imagen de almuerzo
    tipo: 'almuerzo',
  },
  postreManzana: {
    nombre: 'Crumble de Manzana',
    ingredientes: ['Manzanas', 'Avena', 'Harina', 'Azúcar', 'Canela'],
    instrucciones: '1. Corta las manzanas y mézclalas con canela.<br />2. Haz el crumble con avena, harina y azúcar.<br />3. Hornea hasta dorado.',
    imagen: postre4, // Usando tu imagen de postre
    tipo: 'postre',
  }
};

function App() {
  const [recetas, setRecetas] = useState(() => {
    const savedRecipes = localStorage.getItem('recetas');
    return savedRecipes ? JSON.parse(savedRecipes) : recetasIniciales;
  });

  const [recetaSeleccionada, setRecetaSeleccionada] = useState(recetas.huevos);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const [selectedFoodType, setSelectedFoodType] = useState('desayuno');

  const categoriesData = Object.keys(recetas).map(key => ({
    id: key,
    name: recetas[key].nombre
  }));

  // Este objeto `allCategoryDisplayImages` es el que pasa las imágenes al componente Menu.
  // Las claves son los `nombre` de las recetas, y los valores son las `imagen` de esas recetas.
  const allCategoryDisplayImages = {};
  Object.keys(recetas).forEach(key => {
    allCategoryDisplayImages[recetas[key].nombre] = recetas[key].imagen;
  });

  useEffect(() => {
    localStorage.setItem('recetas', JSON.stringify(recetas));
    if (!recetaSeleccionada || !recetas[recetaSeleccionada.nombre.toLowerCase().replace(/\s/g, '')]) {
      setRecetaSeleccionada(recetas.huevos || Object.values(recetas)[0]);
    }
  }, [recetas, recetaSeleccionada]);

  const manejarClickCategoria = (categoryName) => {
    const recetaKey = Object.keys(recetas).find(key => {
      return recetas[key].nombre === categoryName;
    });

    if (recetaKey && recetas[recetaKey]) {
      setRecetaSeleccionada(recetas[recetaKey]);
    } else {
      console.warn(`No se encontró una receta para la categoría: ${categoryName}.`);
      setRecetaSeleccionada(recetas.huevos || Object.values(recetas)[0]);
    }

    setMostrarFormulario(false);
    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }
  };

  const handleAddRecipe = () => {
    setMostrarFormulario(true);
    setIsSidebarVisible(false);
    setSelectedFoodType('desayuno');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nombre = event.target.nombre.value;
    const ingredientes = event.target.ingredientes.value.split(',').map(item => item.trim());
    const instrucciones = event.target.instrucciones.value.replace(/\n/g, '<br />');

    const imagenFile = event.target.imagen.files[0];
    let imagenUrl;

    if (imagenFile) {
      imagenUrl = URL.createObjectURL(imagenFile);
    } else {
      imagenUrl = defaultImagesByType[selectedFoodType] || defaultImagesByType.default;
    }

    const nuevaReceta = {
      nombre,
      ingredientes,
      instrucciones,
      imagen: imagenUrl,
      tipo: selectedFoodType,
    };

    const recetaKey = nombre.toLowerCase().replace(/\s/g, '');

    setRecetas(prevRecetas => ({
      ...prevRecetas,
      [recetaKey]: nuevaReceta,
    }));

    setMostrarFormulario(false);
    setIsSidebarVisible(true);
    setRecetaSeleccionada(nuevaReceta);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
    setMostrarFormulario(false);
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="App">
      <Menu
        onSelectCategory={manejarClickCategoria}
        categoriesData={categoriesData}
        categoryDisplayImages={allCategoryDisplayImages} // Aquí se pasa el objeto de imágenes
        className={!isSidebarVisible ? 'hidden' : ''}
      />

      <div className={`App-body ${!isSidebarVisible ? 'sidebar-hidden' : ''}`}>
        <NavBar
          onAddRecipe={handleAddRecipe}
          onToggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        {mostrarFormulario ? (
          <form onSubmit={handleSubmit} className="recipe-form">
            <h2>Añadir Receta</h2>
            <label>
              Nombre:
              <input type="text" name="nombre" required />
            </label>
            <label>
              Ingredientes (separados por comas):
              <input type="text" name="ingredientes" required />
            </label>
            <label>
              Instrucciones:
              <textarea name="instrucciones" required></textarea>
            </label>
            <label>
              Tipo de Comida:
              <select
                name="tipo"
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
              >
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
                <option value="postre">Postre</option>
              </select>
            </label>
            <label>
              Imagen (opcional):
              <input type="file" name="imagen" accept="image/*" />
            </label>
            <button type="submit">Guardar Receta</button>
          </form>
        ) : (
          <div className="recipe-container details">
            <h1>Detalles de la Comida</h1>
            <h2>{recetaSeleccionada.nombre}</h2>
            <div className="image-details">
              <img src={recetaSeleccionada.imagen} alt={recetaSeleccionada.nombre} />
            </div>
            <h2>Ingredientes</h2>
            <ul>
              {recetaSeleccionada.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
            <h2>Receta</h2>
            <p dangerouslySetInnerHTML={{ __html: recetaSeleccionada.instrucciones }} />
          </div>
        )}
      </div>

      <div className="footer">
        {/* <p>All rights reserved. Creado el: {currentDate} | Autor: Ambioris reyes</p> */}
      </div>
    </div>
  );
}

export default App;