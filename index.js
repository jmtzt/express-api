const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const listingRoutes = require("./api/routes/listings");

app.use("/listings", listingRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
