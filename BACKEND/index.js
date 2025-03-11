// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const productRoutes = require('./routes/productRoutes');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());



// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// app.use('/api', productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));                  const productSchema = new mongoose.Schema({
  name: String,
  date: Date,
  price: Number,
  category: String,  
});
const Product = mongoose.model('Product', productSchema);
app.post('/addProduct', async (req, res) => {
  const { name, date, price, category } = req.body;
  console.log('Received Product Data:', { name, date, price, category });
  const product = new Product({ name, date, price, category });
  try {
    await product.save();
    res.status(200).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
});
app.get('/getProducts', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error: error.message });
  }
});
app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error: error.message });
  }
});
app.put('/editProduct/:id', async (req, res) => {
  const { name, date, price, category } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, date, price, category },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
});
const orderSchema = new mongoose.Schema({
  customerName: String,
  orderDate: Date,
  totalAmount: Number,
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
});

const Order = mongoose.model('Order', orderSchema);

// Create Order
app.post('/addOrder', async (req, res) => {
  const { customerName, orderDate, totalAmount, status } = req.body;
  console.log('Received Order Data:', { customerName, orderDate, totalAmount, status });
  const order = new Order({ customerName, orderDate, totalAmount, status });
  try {
    await order.save();
    res.status(200).json({ message: 'Order added successfully', order });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(400).json({ message: 'Error adding order', error: error.message });
  }
});

// Get Orders
app.get('/getOrders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Delete Order
app.delete('/deleteOrder/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting order', error: error.message });
  }
});

// Update Order
app.put('/editOrder/:id', async (req, res) => {
  const { customerName, orderDate, totalAmount, status } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { customerName, orderDate, totalAmount, status },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});