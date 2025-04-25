import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const categories = ['Vegetables', 'Fruits & Nuts', 'Dairy & Creams', 'Packaged Food', 'Staples'];

const ApplicationForm = ({ onClose, onSave, onDelete, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: '',
    isActive: false,
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (initialData?.id && window.confirm("Are you sure you want to delete this product?")) {
      onDelete(initialData.id);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{initialData ? 'Edit Product' : 'New Product'}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl">
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Old Price</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label>Is Active</label>
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          ></textarea>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {initialData ? 'Update' : 'Create'}
          </button>

          {initialData && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

ApplicationForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  initialData: PropTypes.object,
};

export default ApplicationForm;
