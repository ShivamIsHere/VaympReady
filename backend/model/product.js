const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
  },
  ShopPrice:{
    type: Number,
    required:[true, "Please enter shop's Marked price!"],
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter  product price!"],

  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: [{
    size: {
      type: String,
      enum: [
        'Free Size', '2XS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL',
      '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11',
       '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16','3XS', 'XS', 'S', 'M', 'L', 'XL', 
       '3XL', '4XL', '5XL', '6XL','22', '24', '26', '48', '50', '52',
      '54', '56', '58', '60',
      '28', '30', '32', '34', '36', '38', '40', '42', '44', '46',
      'Free', '32B', '34B', '36B', '38B', '30B', '40B',
      '34C', '32C', '36C', '38C', '40C',
      '32A', '30A', '34A', '28A', '28B',
      '32D', '36D', '34D', '30C', '42C', '38D', '44C', '42B', '40D', '44B',
      '36A', '42D', '44D', '30D', '38A', 'XXL', '40A',
      '28C', '34E', '36E', '32E', 'XXS', '38E', '40E', '34DD', '46C', '32DD', '42E', '28D',
      '36F', '38DD', '46B', '40F', '36DD', '34F', '32F', '44E', '42A', '38F', '48C', '46D', '44A',
      '40DD', '48D', '50C', '50B', '42F', '42DD', '44F', '44DD', '38G', '40G', '30DD', '46E', '36G',
      '34G', '40H', '32H', '30E', '32G', '46F', '34H', '50D', '34Z', '36H', '30Z', '52C', '52B',
      '40I', '38I', '36I', '42G', '38Z', '38H', '36Z', '34I', '32Z', '32I', '30G', '44H', '42Z',
      '14D', '14C', '8E', '46H', '40Z', '28E', '14B', '46I', '46G', '40FF', '38FF', '30F', '14E',
      '14A', '8D', '50E', '48E', '44Z', '44I', '42I', '42H', '28DD', '18B', '16E', '16C', '12C', '12B',
      '10E', '10D', '10A',
      ],
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: true
    },
    isSelected:{
      type:Boolean,
      default:false
    }
  }], 
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  subCategory: {
    type: [String],
  },
  visited:{
    type:Boolean,
    default:false
  },
  visitedAt:{
    type: Date,
    default: Date.now,
  },
  neckType: {
    type: [String],

  },
  shoeOccasions: {
    type: [String],

  },
  accessorySubCategories: {
    type: [String],
  },
  footwearSubCategories: {
    type: [String],
  },
  sleeveType: {
    type: [String],
  },
  
  brand: {
    type: String,
  },
  
  fabric: {
    type: [String],
  },
  occasion: {
    type: [String],
  },
  color: {
    type: [String],
  },
  pattern: {
    type: [String],
  },
trending:{
  type:Boolean,
  default:false
},
bestSeller:{
  type:Boolean,
  default:false
},
sponsored:{
  type:Boolean,
  default:false
},
recentVisited:{
  type:Boolean,
  default:false
},

  fit: {
    type: [String],
  },
  currentCity:{
    type: String,
    default:"Phagwara"
  },
  currentZipCode:{
    type: Number,
    default:144411
  },
  listing: {
    type: String,
    default:"Product"
  },
  eventType:{
    type: String,
  },
  eventDescription: {
    type: String,
  },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  gender: { 
    type: String,
    required: [true, "Please Select gender"],
  },
  
 
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
        min: 1, 
        // default: 1,
      },
      
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      kuchviId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now,
      }
    },
  ],
  ratings: {
    type: Number,
    //default: 5,

  },
  adminCreated:{
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);