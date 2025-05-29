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
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_SINGLE_ORDER_DETAILS_URL_BASE}/${orderId}`);
                if (response.status === 304) {
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
                }

                const data = await response.json();
                setOrder(data);
            } catch (err) {
                console.error('Chyba při načítání detailů objednávky:', err);
                setError(`Nepodařilo se načíst detaily objednávky. Chyba: ${err.message}`);
                toast.error(`Chyba: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();

        const interval = setInterval(() => {
            if (order && order.status === 'done') {
                clearInterval(interval);
                toast.success('Vaše smoothie je hotové! Můžete si pro něj přijít.', { duration: 8000 });
            } else {
                fetchOrderDetails();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleGoHome = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-pink-100 text-green-700 p-4">
                    <p className="text-xl">Načítám detaily objednávky...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-pink-100 text-green-700 p-4">
                    <p className="text-xl text-green-700">{error}</p>
                    <button
                        className="mt-8 px-6 py-2 border-2 border-green-700 text-green-700 rounded transition-colors duration-300 hover:bg-green-200"
                        onClick={handleGoHome}
                    >
                        Zpět na úvodní stránku
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-pink-100 text-green-700 p-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Děkujeme za objednávku!</h1>
                {order ? (
                    <>
                        <div className="text-2xl font-semibold mb-6">
                            Status objednávky:{' '}
                            {order.status === 'preparing' && (
                                <span className="text-yellow-400">Připravuje se... </span>
                            )}
                            {order.status === 'done' && (
                                <span className="text-green-800">Připraveno k vyzvednutí! 🎉</span>
                            )}
                            {order.status === 'canceled' && (
                                <span className="text-green-900">Zrušeno 😔</span>
                            )}
                        </div>

                        {order.status === 'done' && (
                            <p className="text-3xl text-green-800 font-bold animate-pulse">
                                Vaše smoothie je hotové! Můžete si pro něj přijít.
                            </p>
                        )}

                        <div className="mt-6 p-4 bg-green-100 rounded-lg shadow w-full max-w-md border-2 border-green-600">
                            <h3 className="text-xl font-semibold mb-2 text-green-700">Obsah objednávky:</h3>
                            {Array.isArray(order.ingredients) && order.ingredients.length > 0 ? (
                                <ul className="list-disc list-inside text-left text-green-700">
                                    {order.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-green-500">Žádné ingredience.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-xl">Objednávka s tímto ID nebyla nalezena.</p>
                )}
            </div>

            {/* Footer */}
            <footer className="w-full bg-pink-100 border-t border-green-600 py-4 flex justify-center">
                <button
                    className="px-6 py-2 border-2 border-green-700 text-green-700 rounded transition-colors duration-300 hover:bg-green-200"
                    onClick={handleGoHome}
                >
                    Zpět na úvodní stránku
                </button>
            </footer>
        </>
    );
};

export default TYpage;
