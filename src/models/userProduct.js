// Import mongoose and Schema
import mongoose, { Schema } from 'mongoose';

// Define User Product Schema
const UserProductSchema = new Schema({
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Console', 'Chair', 'Graphic Cards', 'Memory', 'Monitors', 'Accessories'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  },
  productImage: [{
    type: String,
    required: true,
  }],
  folderId: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false // Assuming default value is false
  },
  city: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Used'],
    required: true
  },
  boosted: {
    type: Boolean,
    default: false // Default value for boosted field
  },
  boostStatus: {
    type: String,
    enum: ['Not Boosted', 'Boosting Pending'], // Status options for boosting
    default: 'Not Boosted' // Default value for boostStatus
  }
}, { timestamps: true });

const UserProduct = mongoose.models.UserProduct || mongoose.model("UserProduct", UserProductSchema);

module.exports = UserProduct;
