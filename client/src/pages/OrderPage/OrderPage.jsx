import React, { useState, useMemo } from 'react'; // Přidáme useMemo
import IngredientItem from '../../components/IngredientItem'; // Cesta musí odpovídat tvé struktuře
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; // Dle tvé aktuální struktury, kde máš Navbar
import toast from 'react-hot-toast';
import ananas from '../../assets/ananas.png';
import banan from '../../assets/banan.png';
import boruvka from '../../assets/boruvka.png';
import jahoda from '../../assets/jahoda.png';
import malina from '../../assets/malina.png';
import mleko from '../../assets/mleko.png';

const ingredientsData = [
    { id: 'strawberry', name: 'Jahoda', image: jahoda, price: 35 },
    { id: 'banana', name: 'Banán', image: banan, price: 69 },
    { id: 'raspberry', name: 'Malina', image: malina, price: 60 },
    { id: 'blueberry', name: 'Borůvka', image: boruvka, price: 50 },
    { id: 'milk', name: 'Mléko', image: mleko, price: 100 },
    { id: 'pineapple', name: 'Ananas', image: ananas, price: 99 },
];

const OrderPage = () => {
    const [selectedIngredientIds, setSelectedIngredientIds] = useState(new Set());
    const navigate = useNavigate();

    // URL pro backend, použijeme to, co máš v původním kódu
    const API_ORDER_URL = 'http://localhost:3000/smoothie/orders'; 

    const handleToggleIngredient = (ingredient) => {
        setSelectedIngredientIds(prevIds => {
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
        let price = 0;
        const basePrice = 0;
        price += basePrice;

        selectedIngredientIds.forEach(id => {
            const ingredient = ingredientsData.find(ing => ing.id === id);
            if (ingredient) {
                price += ingredient.price;
            }
        });
        return price;
    }, [selectedIngredientIds]);

    const handleScrapOrder = () => {
        setSelectedIngredientIds(new Set());
        toast('Objednávka zrušena!', { icon: '👋' }); // Přidána ikona pro zrušení
        navigate('/');
    };

    const handleFinishOrder = async () => {
        if (selectedIngredientIds.size === 0) {
            toast('Prosím, přidejte alespoň jednu ingredienci do smoothie!', { icon: '⚠️' });
            return;
        }

        const finalOrderIngredients = Array.from(selectedIngredientIds).map(id => {
            const ingredient = ingredientsData.find(ing => ing.id === id);
            return ingredient.name; // Posíláme pouze název (string)
        });

        const orderData = {
            ingredients: finalOrderIngredients, // Pole stringů
            price: totalPrice,
        };

        toast.loading('Odesílám objednávku...', { id: 'orderSending' }); // Zobrazí loading toast

        try {
            const response = await fetch(API_ORDER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send order');
            }

            const responseData = await response.json();
            console.log('Objednávka úspěšně odeslána:', responseData);
            
            // TADY JE ZMĚNA: Používáme _id z odpovědi backendu
            const newOrderId = responseData.order._id;
            
            toast.success(`Objednávka odeslána! Celková cena: ${totalPrice} Kč`, { id: 'orderSending' }); // Aktualizuje loading toast na success
            setSelectedIngredientIds(new Set());
            navigate(`/TYpage/${newOrderId}`); 

        } catch (error) {
            console.error('Chyba při odesílání objednávky:', error);
            toast.error(`Chyba při odesílání objednávky: ${error.message}`, { id: 'orderSending' }); // Aktualizuje loading toast na error
        }
    };

    const displaySelectedIngredients = useMemo(() => {
        return Array.from(selectedIngredientIds).map(id =>
            ingredientsData.find(ing => ing.id === id)
        );
    }, [selectedIngredientIds]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-800 text-white p-4">
                {/* Horní řada s obrázky ingrediencí */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {ingredientsData.map(ingredient => (
                        <IngredientItem
                            key={ingredient.id}
                            ingredient={ingredient}
                            onToggle={handleToggleIngredient}
                            isSelected={selectedIngredientIds.has(ingredient.id)}
                        />
                    ))}
                </div>

                {/* Seznam vybraných ingrediencí a celková cena */}
                <div className="flex-grow flex justify-center items-start">
                    <div className="w-1/2 bg-base-200 rounded-lg p-6 shadow-lg min-h-[300px]">
                        <h2 className="text-xl font-bold mb-4 text-center">List věcí v smoothie</h2>
                        {displaySelectedIngredients.length === 0 ? (
                            <p className="text-center text-gray-500">Zatím nic nepřidáno...</p>
                        ) : (
                            <ul>
                                {displaySelectedIngredients.map(item => (
                                    <li key={item.id} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
                                        <span>{item.name} (+{item.price} Kč)</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-6 pt-4 border-t border-gray-600 text-right text-2xl font-bold">
                            Celková cena: {totalPrice} Kč
                        </div>
                    </div>
                </div>

                {/* Tlačítka Scrap a Finish - Nyní opět roztažená do stran */}
                <div className="flex justify-between mt-8 w-full px-4 md:px-8 lg:px-16"> {/* Upravené třídy */}
                    <button 
                        className="
                            btn btn-error btn-lg 
                            text-white font-extrabold text-xl 
                            px-8 py-4 
                            shadow-lg 
                            hover:scale-110 hover:shadow-2xl 
                            active:scale-95 
                            transition-all duration-300 ease-in-out
                            tracking-wide uppercase
                            w-auto md:w-1/3 lg:w-1/4 xl:w-1/5 {/* Flexibilnější šířka tlačítka */}
                        " 
                        onClick={handleScrapOrder}
                    >
                        Zrušit Objednávku
                    </button>
                    <button 
                        className="
                            btn btn-success btn-lg 
                            text-white font-extrabold text-xl 
                            px-8 py-4 
                            shadow-lg 
                            hover:scale-110 hover:shadow-2xl 
                            active:scale-95 
                            transition-all duration-300 ease-in-out
                            tracking-wide uppercase
                            w-auto md:w-1/3 lg:w-1/4 xl:w-1/5 {/* Flexibilnější šířka tlačítka */}
                        " 
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