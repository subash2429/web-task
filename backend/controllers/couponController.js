import * as couponModel from '../models/couponModel.js';

export const getCoupons = async (req, res, next) => {
  try {
    const coupons = await couponModel.getAllCoupons();
    res.json({ success: true, data: coupons });
  } catch (error) {
    next(error);
  }
};

export const validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ 
        success: false, 
        message: 'Coupon code is required' 
      });
    }
    
    const coupon = await couponModel.getCouponByCode(code);
    
    if (!coupon) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invalid coupon code' 
      });
    }
    
    res.json({ 
      success: true, 
      data: {
        code: coupon.code,
        discount_percentage: coupon.discount_percentage
      }
    });
  } catch (error) {
    next(error);
  }
};