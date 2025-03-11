// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   products: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   totalPrice: { type: Number, required: true },
//   status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  totalAmount: Number,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model('Order', orderSchema);
