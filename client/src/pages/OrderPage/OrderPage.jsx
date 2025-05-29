import React, { useState, useMemo } from "react";
import IngredientItem from "../../components/IngredientItem";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import ananas from "../../assets/ananas.png";
import banan from "../../assets/banan.png";
import boruvka from "../../assets/boruvka.png";
import jahoda from "../../assets/jahoda.png";
import malina from "../../assets/malina.png";
import mleko from "../../assets/mleko.png";

const ingredientsData = [
  { id: "strawberry", name: "Jahoda", image: jahoda, price: 35 },
  { id: "banana", name: "Banán", image: banan, price: 69 },
  { id: "raspberry", name: "Malina", image: malina, price: 60 },
  { id: "blueberry", name: "Borůvka", image: boruvka, price: 50 },
  { id: "milk", name: "Mléko", image: mleko, price: 100 },
  { id: "pineapple", name: "Ananas", image: ananas, price: 99 },
];

const OrderPage = () => {
  const [selectedIngredientIds, setSelectedIngredientIds] = useState(new Set());
  const navigate = useNavigate();
  const API_ORDER_URL = "http://localhost:3000/smoothie/orders";

  const handleToggleIngredient = (ingredient) => {
    setSelectedIngredientIds((prevIds) => {
      const newIds = new Set(prevIds);
      if (newIds.has(ingredient.id)) {
        newIds.delete(ingredient.id);
      } else {
        newIds.add(ingredient.id);
      }
      return newIds;
    });
  };

  const totalPrice = useMemo(() => {
    return Array.from(selectedIngredientIds).reduce((sum, id) => {
      const ingredient = ingredientsData.find((ing) => ing.id === id);
      return sum + (ingredient?.price || 0);
    }, 0);
  }, [selectedIngredientIds]);

  const handleScrapOrder = () => {
    setSelectedIngredientIds(new Set());
    toast("Objednávka zrušena!", { icon: "👋" });
    navigate("/");
  };

  const handleFinishOrder = async () => {
    if (selectedIngredientIds.size === 0) {
      toast("Prosím, přidejte alespoň jednu ingredienci do smoothie!", {
        icon: "⚠️",
      });
      return;
    }

    const finalOrderIngredients = Array.from(selectedIngredientIds).map(
      (id) => {
        const ingredient = ingredientsData.find((ing) => ing.id === id);
        return ingredient.name;
      }
    );

    const orderData = {
      ingredients: finalOrderIngredients,
      price: totalPrice,
    };

    toast.loading("Odesílám objednávku...", { id: "orderSending" });

    try {
      const response = await fetch(API_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Chyba při odesílání");
      }

      const responseData = await response.json();
      const newOrderId = responseData.order._id;
      toast.success(`Objednávka odeslána! Celkem: ${totalPrice} Kč`, {
        id: "orderSending",
      });
      setSelectedIngredientIds(new Set());
      navigate(`/TYpage/${newOrderId}`);
    } catch (error) {
      toast.error(`Chyba: ${error.message}`, { id: "orderSending" });
    }
  };

  const displaySelectedIngredients = useMemo(() => {
    return Array.from(selectedIngredientIds).map((id) =>
      ingredientsData.find((ing) => ing.id === id)
    );
  }, [selectedIngredientIds]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-64px)] bg-pink-100 text-black p-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ingredientsData.map((ingredient) => (
            <div
              key={ingredient.id}
              onClick={() => handleToggleIngredient(ingredient)}
              className={`cursor-pointer transform transition-transform duration-300 hover:scale-105 p-3 rounded-xl border-4 ${
                selectedIngredientIds.has(ingredient.id)
                  ? "border-pink-400"
                  : "border-transparent"
              } bg-green-200 shadow-md w-32`}
            >
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-24 h-24 mx-auto"
              />
              <p className="text-center font-semibold mt-2">
                {ingredient.name}
              </p>
              <p className="text-center text-sm text-gray-700">
                {ingredient.price} Kč
              </p>
            </div>
          ))}
        </div>

        <div className="flex-grow flex justify-center items-start">
          <div className="w-full max-w-xl bg-white border-4 border-green-500 rounded-2xl p-6 shadow-lg min-h-[300px]">
            <h2 className="text-xl font-bold mb-4 text-center text-green-600">
              List věcí v smoothie
            </h2>
            {displaySelectedIngredients.length === 0 ? (
              <p className="text-center text-gray-500">
                Zatím nic nepřidáno...
              </p>
            ) : (
              <ul>
                {displaySelectedIngredients.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-gray-300 last:border-b-0 text-green-700"
                  >
                    <span>{item.name}</span>
                    <span className="text-sm">+{item.price} Kč</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 pt-4 border-t border-gray-300 text-right text-2xl font-bold text-green-700">
              Celková cena: {totalPrice} Kč
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 w-full px-4 md:px-8 lg:px-16">
          <button
            className="btn btn-error btn-lg text-white font-extrabold text-xl px-8 py-4 shadow-lg hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300 ease-in-out tracking-wide uppercase w-auto md:w-1/3 lg:w-1/4 xl:w-1/5"
            onClick={handleScrapOrder}
          >
            Zrušit Objednávku
          </button>
          <button
            className="btn btn-success btn-lg text-white font-extrabold text-xl px-8 py-4 shadow-lg hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300 ease-in-out tracking-wide uppercase w-auto md:w-1/3 lg:w-1/4 xl:w-1/5"
            onClick={handleFinishOrder}
          >
            Dokončit Objednávku
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
