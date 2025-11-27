import * as inventoryModel from '../models/inventoryModel.js';

export const getItems = async (req, res, next) => {
  try {
    const items = await inventoryModel.getAllItems();
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getItem = async (req, res, next) => {
  try {
    const item = await inventoryModel.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const addItem = async (req, res, next) => {
  try {
    const { item_name, quantity, per_unit_price } = req.body;
    
    if (!item_name || !quantity || !per_unit_price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item name, quantity, and per unit price are required' 
      });
    }
    
    const newItem = await inventoryModel.createItem(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const { item_name, quantity, per_unit_price } = req.body;
    
    if (!item_name || !quantity || !per_unit_price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item name, quantity, and per unit price are required' 
      });
    }
    
    const updatedItem = await inventoryModel.updateItem(req.params.id, req.body);
    res.json({ success: true, data: updatedItem });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    await inventoryModel.deleteItem(req.params.id);
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateMultipleItems = async (req, res, next) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Items array is required' 
      });
    }
    
    const updatedItems = await inventoryModel.updateMultipleItems(items);
    res.json({ success: true, data: updatedItems });
  } catch (error) {
    next(error);
  }
};