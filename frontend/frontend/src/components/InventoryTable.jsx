import { useState } from 'react';
import AddItemRow from './AddItemRow';
import CouponSection from './CouponSection';
import { deleteItem } from '../services/api';

const InventoryTable = ({ items, onEdit, onRefresh }) => {
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
  

  const discountAmount = (subtotal * couponDiscount) / 100;
  
 
  const totalPrice = subtotal - discountAmount;

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        onRefresh();
      } catch (error) {
        alert('Failed to delete item');
        console.error(error);
      }
    }
  };

  const handleCouponApplied = (discount, code) => {
    setCouponDiscount(discount);
    setCouponCode(code);
  };

  return (
    <div className="inventory-container">
      <div className="table-actions">
        <button className="btn btn-primary" onClick={onEdit}>
           Edit Items
        </button>
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Per Unit Price</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#95a5a6' }}>
                  No items in inventory. Add items below.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.item_name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{parseFloat(item.per_unit_price).toFixed(2)}</td>
                  <td>₹{parseFloat(item.total_price).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-delete btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="subtotal-row">
              <td colSpan="3"><strong>Subtotal</strong></td>
              <td colSpan="2"><strong>₹{subtotal.toFixed(2)}</strong></td>
            </tr>
            {couponDiscount > 0 && (
              <tr className="discount-row">
                <td colSpan="3">
                  Discount ({couponCode} - {couponDiscount}% off)
                </td>
                <td colSpan="2" style={{ color: '#27ae60', fontWeight: 'bold' }}>
                  -₹{discountAmount.toFixed(2)}
                </td>
              </tr>
            )}
            <tr className="total-row">
              <td colSpan="3"><strong>Price to Pay</strong></td>
              <td colSpan="2"><strong>₹{totalPrice.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <AddItemRow onItemAdded={onRefresh} />
      
      <CouponSection 
        subtotal={subtotal}
        onCouponApplied={handleCouponApplied}
        appliedCoupon={couponDiscount > 0 ? { code: couponCode, discount: couponDiscount } : null}
      />
      
      {couponDiscount > 0 && (
        <div style={{ 
          marginTop: '15px', 
          padding: '12px 15px', 
          backgroundColor: '#d4edda', 
          borderRadius: '8px',
          border: '1px solid #c3e6cb',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '24px' }}></span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, color: '#155724', fontWeight: '500' }}>
              Coupon <strong>{couponCode}</strong> is active!
            </p>
            <p style={{ margin: '5px 0 0 0', color: '#155724', fontSize: '14px' }}>
              Saving {couponDiscount}% on ₹{subtotal.toFixed(2)} = ₹{discountAmount.toFixed(2)} discount
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;