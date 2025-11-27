import { useState } from 'react';
import { updateItem, updateMultipleItems } from '../services/api';

const EditForm = ({ items, onSave, onCancel }) => {
  const [editedItems, setEditedItems] = useState(
    items.map(item => ({ ...item }))
  );
  const [saving, setSaving] = useState(false);

  const handleInputChange = (id, field, value) => {
    setEditedItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
        
          if (field === 'quantity' || field === 'per_unit_price') {
            const quantity = field === 'quantity' ? parseFloat(value) : parseFloat(item.quantity);
            const perUnitPrice = field === 'per_unit_price' ? parseFloat(value) : parseFloat(item.per_unit_price);
            updatedItem.total_price = (quantity * perUnitPrice).toFixed(2);
          }
          
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleSaveSingle = async (item) => {
    try {
      await updateItem(item.id, {
        item_name: item.item_name,
        quantity: parseFloat(item.quantity),
        per_unit_price: parseFloat(item.per_unit_price)
      });
      alert('Item updated successfully!');
    } catch (error) {
      alert('Failed to update item');
      console.error(error);
    }
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      
      const itemsToUpdate = editedItems.map(item => ({
        id: item.id,
        item_name: item.item_name,
        quantity: parseFloat(item.quantity),
        per_unit_price: parseFloat(item.per_unit_price)
      }));
      
      await updateMultipleItems(itemsToUpdate);
      alert('All items updated successfully!');
      onSave();
    } catch (error) {
      alert('Failed to update items');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-form-container">
      <div className="form-header">
        <h2>✏️ Edit Inventory Items</h2>
        <p>Update single or multiple records</p>
      </div>

      <div className="form-actions-top">
        <button
          className="btn btn-success"
          onClick={handleSaveAll}
          disabled={saving}
        >
          {saving ? 'Saving...' : '💾 Save All Changes'}
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          ❌ Cancel
        </button>
      </div>

      <div className="form-grid">
        {editedItems.map((item) => (
          <div key={item.id} className="form-card">
            <div className="form-card-header">
              <h3>Item #{item.id}</h3>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleSaveSingle(item)}
              >
                Save This
              </button>
            </div>

            <div className="form-group">
              <label htmlFor={`name-${item.id}`}>Item Name</label>
              <input
                id={`name-${item.id}`}
                type="text"
                value={item.item_name}
                onChange={(e) => handleInputChange(item.id, 'item_name', e.target.value)}
                placeholder="Enter item name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`qty-${item.id}`}>Quantity</label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`price-${item.id}`}>Per Unit Price (₹)</label>
                <input
                  id={`price-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.per_unit_price}
                  onChange={(e) => handleInputChange(item.id, 'per_unit_price', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group total-display">
              <label>Total Price</label>
              <div className="total-value">₹{parseFloat(item.total_price).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditForm;