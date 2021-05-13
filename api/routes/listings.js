const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Listing.find()
    .select("cryptoName price author _id")
    .exec()
    .then((result) => {
      const message = {
        count: result.length,
        listings: result,
      };

      return res.status(200).json(message);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    cryptoName: req.body.cryptoName,
    price: req.body.price,
    author: req.body.author,
  });

  listing
    .save()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Listing created sucessfully",
        listing: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.get("/:listingId", (req, res, next) => {
  const id = req.params.listingId;

  Listing.findById(id)
    .select("cryptoName price author _id")
    .exec()
    .then((result) => {
      console.log(result);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res
          .status(404)
          .json({ message: "No listing entry for the provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.patch("/:listingId", (req, res, next) => {
  const id = req.params.listingId;

  const updateOp = {};

  for (const op of req.body) {
    updateOp[op.propName] = op.value;
  }

  Listing.updateOne({ _id: id }, { $set: updateOp })
    .exec()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Listing updated sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

router.delete("/:listingId", (req, res, next) => {
  const id = req.params.listingId;
  Listing.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        message: "Listing deleted sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
});

module.exports = router;
