import express from 'express';
//import * as inventoryController from '../controllers/inventoryController';
import * as inventoryController from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/', inventoryController.getItems);
router.get('/:id', inventoryController.getItem);
router.post('/', inventoryController.addItem);
router.put('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);
router.put('/bulk/update', inventoryController.updateMultipleItems);

export default router;