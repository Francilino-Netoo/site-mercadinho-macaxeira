import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-lg font-bold mt-2">
          R$ {product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};