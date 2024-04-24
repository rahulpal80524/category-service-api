import express from 'express';
import { json } from 'body-parser';
import categoryRoutes from './routes/categoryRoutes';
import serviceRoutes from './routes/serviceRoutes';
import { authenticate } from './middleware/authenticate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

// Routes
app.use('/category', authenticate, categoryRoutes);
app.use('/service', authenticate, serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
