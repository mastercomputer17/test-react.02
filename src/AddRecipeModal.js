import React, { useState } from 'react';
import './AddRecipeModal.css';

const AddRecipeModal = ({ show, onClose, onSave }) => {
    const [nombre, setNombre] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [imagen, setImagen] = useState('');

    const handleSave = () => {
        const nuevaReceta = {
            nombre,
            ingredientes: ingredientes.split(','),
            instrucciones: instrucciones.replace(/\n/g, '<br />'),
            imagen,
        };
        onSave(nuevaReceta);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add New Recipe</h2>
                <label>
                    Nombre:
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </label>
                <label>
                    Ingredientes (separados por comas):
                    <textarea value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
                </label>
                <label>
                    Instrucciones (separadas por saltos de línea):
                    <textarea value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} />
                </label>
                <label>
                    URL de la imagen:
                    <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddRecipeModal;
