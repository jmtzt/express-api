const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cryptoName: String,
  price: Number,
  author: String,
});

module.exports = mongoose.model("Listing", listingSchema);
