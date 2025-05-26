import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';

const TYpage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_SINGLE_ORDER_DETAILS_URL_BASE = `http://localhost:3000/smoothie/orders`;

    useEffect(() => {
        if (!orderId) {
            setError('ID objednávky nebylo nalezeno v URL. Ujistěte se, že ID je předáno v URL (např. /TYpage/vaseID).');
            setLoading(false);
            return;
        }

        

            const fetchOrderDetails = async () => {
                setLoading(true); // Nastavíme loading na true na začátku každého fetchu
                setError(null);
                try {
                    const response = await fetch(`${API_SINGLE_ORDER_DETAILS_URL_BASE}/${orderId}`);
                    console.log(response)
                    // --- ZDE JE KLÍČOVÁ ZMĚNA: Zpracování statusu 304 ---
                    if (response.status === 304) {
                        // Pokud je status 304, data se nezměnila.
                        // Nemusíme nic aktualizovat ve stavu 'order', protože už máme aktuální data.
                        // Jen zrušíme loading a nebudeme vyhazovat chybu.
                        setLoading(false);
                        return; // Ukončíme funkci, aby se dál nepokoušela parsovat JSON
                    }
                    // -----------------------------------------------------

                    if (!response.ok) {
                        // Pokud není 2xx a není ani 304, pak je to skutečná chyba
                        const errorText = await response.text();
                        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
                    }

                    const data = await response.json();
                    setOrder(data); // Aktualizujeme stav 'order' pouze pokud dostaneme nová data (status 200 OK)
                } catch (err) {
                    console.error('Chyba při načítání detailů objednávky:', err);
                    setError(`Nepodařilo se načíst detaily objednávky. Chyba: ${err.message}`);
                    toast.error(`Chyba: ${err.message}`);
                } finally {
                    // Loading by měl být vypnut i při chybě
                    setLoading(false);
                }
            };

            // První načtení detailů objednávky
            fetchOrderDetails();
        
        // Nastavíme interval pro pravidelnou kontrolu statusu objednávky
        const interval = setInterval(() => {
            // Před fetchOrderDetails zkontrolujeme, zda je order již hotový, abychom zbytečně nevolali API
            if (order && order.status === 'done') {
                clearInterval(interval); // Objednávka je hotová, zastavíme interval
                toast.success('Vaše smoothie je hotové! Můžete si pro něj přijít.', { duration: 8000 });
            } else {
                // Pokud není hotovo nebo order je null (např. při prvním načtení), zavoláme fetch
                fetchOrderDetails();
            }
        }, 5000); // Kontrolujeme každých 5 sekund

        return () => clearInterval(interval);
    }, []); // order v závislostech je důležité pro správné ukončení intervalu

    const handleGoHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-800 text-white p-4">
                    <p className="text-xl">Načítám detaily objednávky...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gray-800 text-white p-4">
                    <p className="text-xl text-error">{error}</p>
                    <button className="btn btn-primary mt-8" onClick={handleGoHome}>
                        Zpět na úvodní stránku
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-800 text-white p-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Děkujeme za objednávku!</h1>
                {order ? (
                    <>
                        
                    
                        <div className="text-2xl font-semibold mb-6">
                            Status objednávky: {' '}
                            {order.status === 'preparing' && (
                                <span className="text-warning">Připravuje se... </span>
                            )}
                            {order.status === 'done' && (
                                <span className="text-success">Připraveno k vyzvednutí! 🎉</span>
                            )}
                            {order.status === 'canceled' && (
                                <span className="text-error">Zrušeno 😔</span>
                            )}
                        </div>

                        {order.status === 'done' && (
                            <p className="text-3xl text-success font-bold animate-pulse">
                                Vaše smoothie je hotové! Můžete si pro něj přijít.
                            </p>
                        )}

                        <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow w-full max-w-md">
                            <h3 className="text-xl font-semibold mb-2">Obsah objednávky:</h3>
                            {Array.isArray(order.ingredients) && order.ingredients.length > 0 ? (
                                <ul className="list-disc list-inside text-left">
                                    {order.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Žádné ingredience.</p>
                            )}
                        </div>

                    </>
                ) : (
                    <p className="text-xl">Objednávka s tímto ID nebyla nalezena.</p>
                )}
                <button className="btn btn-primary mt-8" onClick={handleGoHome}>
                    Zpět na úvodní stránku
                </button>
            </div>
        </>
    );
};

export default TYpage;