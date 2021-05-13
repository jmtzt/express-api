const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 3000;

const listingRoutes = require("./api/routes/listings");

app.use(morgan("dev"));

app.use("/listings", listingRoutes);

// error handling route
app.use((req, res, next) => {
  const error = new Error("Route not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
