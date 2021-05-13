const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const ListingController = require("../controllers/listings");

router.get("/", auth, ListingController.get_all_listings);

router.post("/", auth, ListingController.create_listing);

router.get("/:listingId", auth, ListingController.get_listing_by_id);

router.patch("/:listingId", auth, ListingController.patch_listing);

router.delete("/:listingId", auth, ListingController.delete_listing);

module.exports = router;
