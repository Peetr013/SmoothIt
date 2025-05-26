import React from 'react';

// Přidáme prop `isSelected` pro vizuální indikaci
const IngredientItem = ({ ingredient, onToggle, isSelected }) => {
  return (
    <div
      // Podmíněné stylování pro zobrazení, zda je ingredience vybrána
      className={`
        flex flex-col items-center justify-center p-4 m-2 rounded-lg shadow-md cursor-pointer
        ${isSelected ? 'bg-primary text-white border-2 border-primary-focus' : 'bg-base-200 hover:bg-base-300'}
        transition-all duration-200 ease-in-out
      `}
      onClick={() => onToggle(ingredient)} // Změníme název prop na onToggle
    >
      <img
        src={`/images/${ingredient.image}`}
        alt={ingredient.name}
        className="w-20 h-20 object-contain mb-2"
      />
      <span className="text-sm font-semibold">{ingredient.name}</span>
      {/* Volitelně můžeš přidat ikonu, pokud je vybráno */}
      {isSelected && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
};

export default IngredientItem;