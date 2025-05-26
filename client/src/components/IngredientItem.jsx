import React from 'react';

// Přidáme prop `isSelected` pro vizuální indikaci
const IngredientItem = ({ ingredient, onToggle, isSelected }) => {
  // Předpokládá, že obrázky jsou přímo v public složce, např. public/strawberry.png
  // Pokud máš obrázky v jiné složce (např. src/assets), musíš je importovat:
  // import strawberryImg from '../assets/strawberry.png';
  // ... a pak je použít: src={strawberryImg}
  const imageUrl = `${ingredient.image}`; 

  return (
    <div
      // Zvětšujeme card na w-48 (původně w-40), zvětšujeme padding na p-6 (původně p-4)
      className={`card w-48 bg-base-100 shadow-xl cursor-pointer transition-all duration-200 
                  ${isSelected ? 'border-4 border-primary scale-105' : 'border-2 border-transparent hover:scale-105'}`}
      onClick={() => onToggle(ingredient)}
    >
      <figure className="px-6 pt-6"> {/* Zvětšujeme px a pt */}
        {/* Zvětšujeme obrázek na w-28 h-28 (původně w-24 h-24) */}
        <img src={imageUrl} alt={ingredient.name} className="rounded-xl w-28 h-28 object-contain" />
      </figure>
      <div className="card-body items-center text-center p-4"> {/* Můžeš zvětšit p-4 na p-6, pokud chceš více místa uvnitř */}
        <h2 className="card-title text-base">{ingredient.name}</h2> {/* Zvětšujeme text názvu */}
        <p className="text-sm text-gray-400">{ingredient.price} Kč</p> {/* Zvětšujeme text ceny */}
      </div>
    </div>
  );
};

export default IngredientItem;