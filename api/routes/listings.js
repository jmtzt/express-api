const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "This is a GET request to the /listings",
  });
});

router.post("/", (req, res, next) => {
  const listing = {
    cryptoName: req.body.cryptoName,
    price: req.body.price,
  };

  return res.status(200).json({
    message: "This is a POST request to the /listings route",
    createdListing: listing,
  });
});

router.get("/:listingId", (req, res, next) => {
  const id = req.params.listingId;

  return res.status(200).json({
    message: "This is a GET request to the /listings/" + id + " route",
  });
});

router.patch("/:listingId", (req, res, next) => {
  const id = req.params.listingId;

  return res.status(200).json({
    message: "This is a PATCH request to the /listings/" + id + " route",
  });
});

router.delete("/:listingId", (req, res, next) => {
  const id = req.params.listingId;

  return res.status(200).json({
    message: "This is a DELETE request to the /listings/" + id + " route",
  });
});

module.exports = router;
