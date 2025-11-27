import db from '../config/Database.js';

export const getAllItems = async () => {
  const [rows] = await db.query('SELECT * FROM inventory_items ORDER BY created_at DESC');
  return rows;
};

export const getItemById = async (id) => {
  const [rows] = await db.query('SELECT * FROM inventory_items WHERE id = ?', [id]);
  return rows[0];
};

export const createItem = async (itemData) => {
  const { item_name, quantity, per_unit_price } = itemData;
  const total_price = quantity * per_unit_price;
  
  const [result] = await db.query(
    'INSERT INTO inventory_items (item_name, quantity, per_unit_price, total_price) VALUES (?, ?, ?, ?)',
    [item_name, quantity, per_unit_price, total_price]
  );
  
  return { id: result.insertId, item_name, quantity, per_unit_price, total_price };
};

export const updateItem = async (id, itemData) => {
  const { item_name, quantity, per_unit_price } = itemData;
  const total_price = quantity * per_unit_price;
  
  await db.query(
    'UPDATE inventory_items SET item_name = ?, quantity = ?, per_unit_price = ?, total_price = ? WHERE id = ?',
    [item_name, quantity, per_unit_price, total_price, id]
  );
  
  return { id, item_name, quantity, per_unit_price, total_price };
};

export const deleteItem = async (id) => {
  await db.query('DELETE FROM inventory_items WHERE id = ?', [id]);
  return { id };
};

export const updateMultipleItems = async (items) => {
  const promises = items.map(item => updateItem(item.id, item));
  return await Promise.all(promises);
};