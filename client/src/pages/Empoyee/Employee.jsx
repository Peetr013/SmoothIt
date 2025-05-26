import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';

const Employee = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000/smoothie';

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // FILTROVÁNÍ OBJEDNÁVEK: Zobrazovat jen ty, které nejsou "done"
      const activeOrders = Array.isArray(data) ? data.filter(order => order.status !== 'done') : [];
      setOrders(activeOrders); // Nastavíme pouze aktivní objednávky
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Nepodařilo se načíst objednávky.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDoneClick = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'done' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Nepodařilo se aktualizovat stav objednávky.');
      }

      toast.success(`Objednávka ${orderId} označena jako "Done".`);
      // Po označení jako "Done" se znovu načtou a automaticky se odfiltrují
      fetchOrders();
    } catch (err) {
      console.error('Chyba při označování objednávky jako "Done":', err);
      toast(`Chyba: ${err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-800 text-white p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Objednávky k výrobě</h1>

        {loading && <p className="text-center text-xl text-primary">Načítám objednávky...</p>}
        {error && <p className="text-center text-xl text-error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-center text-xl text-gray-400">Žádné aktivní objednávky k zobrazení.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(orders) && orders.map(order => (
            <div key={order._id} className="card bg-base-200 shadow-xl border border-gray-700">
              <div className="card-body">
                <h2 className="card-title text-primary">Objednávka ID: {order._id}</h2>
                <p className="text-sm text-gray-400">Objednáno: {new Date(order.orderedAt).toLocaleString()}</p>
                {/* Zde můžeš volitelně zobrazit status, ale jelikož zobrazujeme jen "preparing", je to méně kritické */}
                <div className="badge badge-info">Status: {order.status}</div>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2">Ingredience:</h3>
                  {Array.isArray(order.ingredients) && order.ingredients.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {order.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Žádné ingredience.</p>
                  )}
                </div>
                <div className="text-right text-xl font-bold mt-4">
                  Cena: {order.price} Kč
                </div>

                {/* Tlačítko Done se zobrazí jen pro objednávky ve stavu 'preparing' (což jsou teď všechny zobrazené) */}
                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={() => handleDoneClick(order._id)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Employee;