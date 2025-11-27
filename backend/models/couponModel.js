import db from '../config/Database.js';

export const getAllCoupons = async () => {
  const [rows] = await db.query('SELECT * FROM coupons WHERE is_active = TRUE');
  return rows;
};

export const getCouponByCode = async (code) => {
  const [rows] = await db.query(
    'SELECT * FROM coupons WHERE code = ? AND is_active = TRUE',
    [code.toUpperCase()]
  );
  return rows[0];
};

export const createCoupon = async (couponData) => {
  const { code, discount_percentage } = couponData;
  
  const [result] = await db.query(
    'INSERT INTO coupons (code, discount_percentage) VALUES (?, ?)',
    [code.toUpperCase(), discount_percentage]
  );
  
  return { id: result.insertId, code: code.toUpperCase(), discount_percentage };
};