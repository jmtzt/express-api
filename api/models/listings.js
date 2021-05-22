const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cryptoName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coinImage: { 
    type: String, 
    required: false 
  }

});

module.exports = mongoose.model("Listing", listingSchema);
