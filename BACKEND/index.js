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
const app = express();
const cors = require('cors');
const authenticateJWT = require('./middleware/authenticateJWT')
const dotenv = require('dotenv');
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors({
  origin: 'https://y23mswddoorstep.onrender.com',
   // only if using cookies
}));

const userRoutes = require('./routes/userRoutes');

	const cors = require('cors');

	const connectDB = require('./config/db');

	dotenv.config();
	connectDB();



	app.use(cors());
	app.use(express.json());

	app.use('/api/users', userRoutes);


  dotenv.config();
  connectDB();

const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

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
//jwt login
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require("dotenv").config(); // Load environment variables




const nodemailer = require("nodemailer");
// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Feedback Schema & Model
const feedbackSchema = new mongoose.Schema({
  customername: { type: String, required: true },
  emailed: { type: String, required: true },
  feedback: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST Route to Store Feedback & Send Email
app.post("/api/sendmail", async (req, res) => {
  const { customername, emailed, feedback } = req.body;

  // Validate Request
  if (!customername || !emailed || !feedback) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Store Feedback in Database
    const newFeedback = new Feedback({ customername, emailed, feedback });
    await newFeedback.save();
    console.log("Feedback stored in database");

    // Ensure SMTP credentials are available
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("SMTP credentials are missing in environment variables.");
    }

    // Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS, // App password
      },
    });

    // Email Content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: emailed,
      subject: "Feedback Submission Acknowledgment",
      text: `Dear ${customername},\n\nThank you for your feedback!\n\nWe appreciate your time and effort in sharing your thoughts with us.\n\nBest Regards,\nYour Team`,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json({ message: "Feedback submitted and email sent!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: " Error submitting feedback, please try again." });
  }
});
app.get('/api/users/me', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
});

app.put('/api/users/me', authenticateJWT, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (name) user.name = name;
    await user.save();

    // Send back updated user info (name and email)
    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

