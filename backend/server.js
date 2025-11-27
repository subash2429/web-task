import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventoryRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/inventory', inventoryRoutes);
app.use('/api/coupons', couponRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});