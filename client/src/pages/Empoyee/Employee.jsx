import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../authContext";

const API_BASE_URL = "http://localhost:3000/smoothie";

const Employee = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload).id;
    } catch (e) {
      console.error("Error parsing token", e);
      return null;
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoadingLogin(true);

    try {
      await login(username, password);
      setIsLoadingLogin(false);
      toast.success("Úspěšně přihlášen!", {
        style: {
          borderRadius: "10px",
          background: "#191e24",
          color: "#fff",
        },
        position: "top-center",
        duration: 5000,
      });
    } catch (err) {
      setIsLoadingLogin(false);
      if (
        err.response?.status === 401 ||
        err.response?.data?.message === "Invalid username or password"
      ) {
        setLoginError("Nesprávné uživatelské jméno nebo heslo.");
      } else {
        setLoginError(
          err.response?.data?.error ||
            "Přihlášení selhalo. Zkuste to prosím znovu."
        );
      }
    }
  };

  const handleLoginButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !isLoadingLogin) {
        handleLoginButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoadingLogin]);

  const handleLogout = () => {
    logout();
    toast.success("Úspěšně odhlášen.");
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          logout();
          toast.error("Vaše relace vypršela, prosím přihlaste se znovu.");
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const activeOrders = Array.isArray(data)
        ? data.filter((order) => order.status !== "done")
        : [];
      setOrders(activeOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Nepodařilo se načíst objednávky.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const handleDoneClick = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "done" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Nepodařilo se aktualizovat stav objednávky."
        );
      }

      toast.success(`Objednávka ${orderId} označena jako "Done".`);
      fetchOrders();
    } catch (err) {
      console.error('Chyba při označování objednávky jako "Done":', err);
      toast.error(`Chyba: ${err.message}`);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen min-w-screen bg-gray-800 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col w-full max-w-sm p-8 bg-gray-700 shadow-2xl rounded-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Admin Login</h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleLoginSubmit}
            ref={formRef}
          >
            <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 text-white placeholder-gray-400">
              <svg
                className="h-[1.5em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Uživatelské jméno"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minLength="3"
                maxLength="30"
                title="Pouze písmena, čísla nebo pomlčky"
                className="grow bg-transparent focus:outline-none"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 bg-gray-600 border-gray-500 text-white placeholder-gray-400">
              <svg
                className="h-[1.5em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="grow bg-transparent focus:outline-none"
              />
            </label>

            <button
              className="btn btn-primary mt-4 w-full"
              type="button"
              disabled={isLoadingLogin}
              onClick={handleLoginButtonClick}
            >
              {isLoadingLogin ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Přihlásit se"
              )}
            </button>
          </form>

          {loginError && (
            <p className="text-red-400 text-center mt-4">{loginError}</p>
          )}
          {isLoadingLogin && !loginError && (
            <div className="flex justify-center items-center py-4">
              <span className="loading loading-infinity loading-lg"></span>
              <span className="ml-2 text-gray-400">
                Probíhá přihlašování...
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center flex-grow">
            Objednávky k výrobě
          </h1>
          <button className="btn btn-warning" onClick={handleLogout}>
            Odhlásit se
          </button>
        </div>

        {loading && (
          <p className="text-center text-xl text-primary">
            Načítám objednávky...
          </p>
        )}
        {error && <p className="text-center text-xl text-error">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p className="text-center text-xl text-gray-400">
            Žádné aktivní objednávky k zobrazení.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(orders) &&
            orders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-200 shadow-xl border border-gray-700"
              >
                <div className="card-body">
                  <h2 className="card-title text-primary">
                    Objednávka ID: {order._id}
                  </h2>
                  <div className="badge badge-info">Status: {order.status}</div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Ingredience:</h3>
                    {Array.isArray(order.ingredients) &&
                    order.ingredients.length > 0 ? (
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
