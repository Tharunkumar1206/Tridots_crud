import React, { useState, useEffect } from 'react';
import ApplicationForm from './ApplicationForm';

const App = () => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // ✅ Load from localStorage when app starts
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // ✅ Save product to localStorage whenever the product list changes
  const updateLocalStorage = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleSave = (data) => {
    let updatedProducts;
    if (data.id) {
      // Editing existing product
      updatedProducts = products.map((item) => (item.id === data.id ? data : item));
    } else {
      // Adding new product
      const newData = { ...data, id: Date.now() };
      updatedProducts = [...products, newData];
    }
    updateLocalStorage(updatedProducts);
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updatedProducts = products.filter((item) => item.id !== productToDelete);
    updateLocalStorage(updatedProducts);
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold text-center">Product Inventory</h1>

      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded"
          onClick={handleAddNew}
        >
          + Add Product
        </button>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Old Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Active</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td className="border px-4 py-2">{prod.name}</td>
              <td className="border px-4 py-2">₹{prod.price}</td>
              <td className="border px-4 py-2">₹{prod.oldPrice}</td>
              <td className="border px-4 py-2">{prod.category}</td>
              <td className="border px-4 py-2">{prod.isActive ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{prod.description}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500"
                  onClick={() => handleEdit(prod)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  onClick={() => handleDelete(prod.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <ApplicationForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          initialData={selectedProduct}
          onDelete={handleDelete}
        />
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
