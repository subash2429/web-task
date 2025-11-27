import { useState } from 'react';
import { validateCoupon } from '../services/api';

const CouponSection = ({ subtotal, onCouponApplied, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [validating, setValidating] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    
    if (!couponCode.trim()) {
      setMessage({ text: 'Please enter a coupon code', type: 'error' });
      return;
    }

    try {
      setValidating(true);
      setMessage({ text: '', type: '' });
      
      const result = await validateCoupon(couponCode);
      
      if (result) {
        onCouponApplied(result.discount_percentage, result.code);
        setMessage({ 
          text: `Coupon applied! You get ${result.discount_percentage}% off on all items`, 
          type: 'success' 
        });
      }
    } catch (error) {
      setMessage({ 
        text: error.message || 'Invalid coupon code', 
        type: 'error' 
      });
      onCouponApplied(0, '');
    } finally {
      setValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    onCouponApplied(0, '');
    setMessage({ text: '', type: '' });
  };

  
  const isApplied = appliedCoupon && appliedCoupon.code;

  return (
    <div className="coupon-section">
      <h3> Apply Coupon Code</h3>
      
      {isApplied ? (
        <div className="coupon-applied">
          <div className="applied-info">
            <span className="applied-badge">✅ Applied: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discount}% off)</span>
          </div>
          <button 
            type="button"
            onClick={handleRemoveCoupon}
            className="btn btn-secondary"
          >
            Remove Coupon
          </button>
        </div>
      ) : (
        <form onSubmit={handleApplyCoupon} className="coupon-form">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code (e.g., ABC)"
            disabled={validating}
            className="coupon-input"
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={validating}
          >
            {validating ? 'Validating...' : 'Apply'}
          </button>
        </form>
      )}
      
      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}
      
      {!isApplied && (
        <div className="coupon-hint">
           Try coupon codes: <strong>ABC</strong> (10% off), <strong>SAVE20</strong> (20% off)
        </div>
      )}
    </div>
  );
};

export default CouponSection;