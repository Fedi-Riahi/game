import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  cartItems: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
