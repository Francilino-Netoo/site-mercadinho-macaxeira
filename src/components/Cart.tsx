import React from "react";
import { useCart } from "../context/CartContext";
import { X, Send, Plus, Minus } from "lucide-react";

interface CartProps {
  onClose?: () => void;
}

export const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const message = `Olá! Gostaria de fazer um pedido:\n\n${cart
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - R$ ${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n")}\n\nTotal: R$ ${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/558896109801?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  if (cart.length === 0) {
    return <div className="p-4 text-center text-gray-500">Carrinho vazio</div>;
  }

  return (
    <div className="p-4">
      <div className="lg:hidden mb-4 flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col mb-4 bg-white p-4 rounded-lg shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  R$ {item.price.toFixed(2)} cada
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
            </div>
            <p className="font-semibold">
              R$ {(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}

      <div className="mt-4 border-t pt-4">
        <div className="text-xl font-bold mb-4">
          Total: R$ {total.toFixed(2)}
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Finalizar pelo WhatsApp
        </button>
      </div>
    </div>
  );
};
