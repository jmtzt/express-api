const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const ListingController = require("../controllers/listings");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    // reject a file
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true)
    }else{       
        cb(null, false)
    }

}

const upload = multer({
    storage:storage, 
    limits:{
        fileSize: 1024 * 1024 * 5 // Accept images with 5mb or lower 
    },
    fileFilter: fileFilter
})

router.get("/", auth, ListingController.get_all_listings);

router.post("/", auth, upload.single('coinImage'), ListingController.create_listing);

router.get("/:listingId", auth, ListingController.get_listing_by_id);

router.patch("/:listingId", auth, ListingController.patch_listing);

router.delete("/:listingId", auth, ListingController.delete_listing);

module.exports = router;
