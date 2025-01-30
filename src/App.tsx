import React, { useState, useEffect, useRef } from "react";
import { AdminProvider } from "./context/AdminContext";
import { CartProvider } from "./context/CartContext";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";
import { AdminPanel } from "./components/AdminPanel";
import { useAdmin } from "./context/AdminContext";
import { initialProducts } from "./data/products";
import { ShoppingBag, Lock, LogIn, X, Menu } from "lucide-react";

function MainApp() {
  const [products, setProducts] = useState(initialProducts);
  const [showCart, setShowCart] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { admin, setAdmin } = useAdmin();

  const touchCount = useRef(0);
  const lastTouchTime = useRef(0);
  const TOUCH_THRESHOLD = 1000;
  const REQUIRED_TOUCHES = 5;

  const handleLogoTouch = () => {
    const now = Date.now();
    if (now - lastTouchTime.current > TOUCH_THRESHOLD) {
      touchCount.current = 1;
    } else {
      touchCount.current += 1;
    }
    lastTouchTime.current = now;

    if (touchCount.current >= REQUIRED_TOUCHES) {
      setShowAdminLogin(true);
      touchCount.current = 0;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "a") {
        setShowAdminLogin((prev) => !prev);
      }

      if (event.key === "Escape") {
        setShowAdminLogin(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === admin.password) {
      setAdmin({ ...admin, isAdmin: true });
      setShowAdminLogin(false);
      setAdminPassword("");
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onTouchStart={handleLogoTouch}
              onClick={() => {
                handleLogoTouch();
              }}
            >
              <ShoppingBag size={24} />
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                Mercadinho Macaxeira
              </h1>
            </div>

            {/* Mobile menu butto */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              {!admin.isAdmin && (
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100"
                >
                  Carrinho
                </button>
              )}
              {admin.isAdmin && (
                <button
                  onClick={() => setAdmin({ ...admin, isAdmin: false })}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center gap-2"
                >
                  <Lock size={20} />
                  Sair do Admin
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu */}
          {showMobileMenu && (
            <div className="mt-4 space-y-4 md:hidden">
              {!admin.isAdmin && (
                <button
                  onClick={() => {
                    setShowCart(!showCart);
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-white text-blue-600 py-2 px-4 rounded hover:bg-gray-100"
                >
                  Carrinho
                </button>
              )}
              {admin.isAdmin && (
                <button
                  onClick={() => {
                    setAdmin({ ...admin, isAdmin: false });
                    setShowMobileMenu(false);
                  }}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <Lock size={20} />
                  Sair do Admin
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Modal de login admin */}
      {showAdminLogin && !admin.isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Login Administrativo</h2>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Senha administrativa"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-2 border rounded"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdminLogin();
                  }
                }}
              />
              <button
                onClick={handleAdminLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto py-8 px-4">
        {admin.isAdmin ? (
          <AdminPanel products={products} setProducts={setProducts} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
                showCart ? "lg:w-2/3" : "w-full"
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {showCart && (
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md lg:sticky lg:top-24">
                  <h2 className="text-xl font-bold p-4 bg-gray-50 rounded-t-lg">
                    Carrinho
                  </h2>
                  <Cart onClose={() => setShowCart(false)} />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
