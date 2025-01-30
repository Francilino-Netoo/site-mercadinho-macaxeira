import React, { useState } from 'react';
import { Product } from '../types';
import { Edit, Trash2, Plus } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      setEditingProduct(null);
    }
  };

  const handleAdd = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        price: Number(newProduct.price),
        description: newProduct.description || '',
        image: newProduct.image,
        available: true,
      };
      setProducts([...products, product]);
      setNewProduct({});
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Painel Administrativo</h2>
      
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Adicionar Novo Produto</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome do produto"
            value={newProduct.name || ''}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Preço"
            value={newProduct.price || ''}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={newProduct.description || ''}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="URL da imagem"
            value={newProduct.image || ''}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center gap-2"
          >
            <Plus size={20} />
            Adicionar Produto
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            {editingProduct?.id === product.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 sm:flex-initial text-blue-500 hover:text-blue-700 flex items-center justify-center gap-2 border border-blue-500 rounded px-4 py-2"
                  >
                    <Edit size={20} />
                    <span className="sm:hidden">Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 sm:flex-initial text-red-500 hover:text-red-700 flex items-center justify-center gap-2 border border-red-500 rounded px-4 py-2"
                  >
                    <Trash2 size={20} />
                    <span className="sm:hidden">Excluir</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};