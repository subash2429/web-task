import { useState } from 'react';
import { addItem } from '../services/api';

const AddItemRow = ({ onItemAdded }) => {
  const [newItem, setNewItem] = useState({
    item_name: '',
    quantity: 1,
    per_unit_price: 0
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newItem.item_name.trim()) {
      alert('Please enter item name');
      return;
    }

    if (newItem.per_unit_price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    try {
      setIsAdding(true);
      await addItem(newItem);
      setNewItem({ item_name: '', quantity: 1, per_unit_price: 0 });
      onItemAdded();
    } catch (error) {
      alert('Failed to add item');
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleChange = (field, value) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="add-item-section">
      <h3> Add New Item</h3>
      <form onSubmit={handleSubmit} className="add-item-form">
        <div className="form-group">
          <label htmlFor="item-name">Item Name</label>
          <input
            id="item-name"
            type="text"
            value={newItem.item_name}
            onChange={(e) => handleChange('item_name', e.target.value)}
            placeholder="Enter item name"
            disabled={isAdding}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={newItem.quantity}
            onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
            disabled={isAdding}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Per Unit Price (₹)</label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={newItem.per_unit_price}
            onChange={(e) => handleChange('per_unit_price', parseFloat(e.target.value))}
            placeholder="0.00"
            disabled={isAdding}
          />
        </div>

        <div className="form-group">
          <label>Total</label>
          <div className="total-preview">
            ₹{(newItem.quantity * newItem.per_unit_price).toFixed(2)}
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-success"
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : '✓ Add Item'}
        </button>
      </form>
    </div>
  );
};

export default AddItemRow;