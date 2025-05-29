import React from "react";

const IngredientItem = ({ ingredient, onToggle, isSelected }) => {
  const imageUrl = `${ingredient.image}`;

  return (
    <div
      className={`card w-48 bg-base-100 shadow-xl cursor-pointer transition-all duration-200 
                  ${
                    isSelected
                      ? "border-4 border-primary scale-105"
                      : "border-2 border-transparent hover:scale-105"
                  }`}
      onClick={() => onToggle(ingredient)}
    >
      <figure className="px-6 pt-6">
        <img
          src={imageUrl}
          alt={ingredient.name}
          className="rounded-xl w-28 h-28 object-contain"
        />
      </figure>
      <div className="card-body items-center text-center p-4">
        <h2 className="card-title text-base">{ingredient.name}</h2>
        <p className="text-sm text-gray-400">{ingredient.price} Kč</p>
      </div>
    </div>
  );
};

export default IngredientItem;
