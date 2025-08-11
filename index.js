const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Import routes
const productRoutes = require("./routes/product.route");
const userRoutes = require("./routes/user.route");
const customerRoutes = require("./routes/customer.route");
const orderRoutes = require("./routes/order.route");
const couponRoutes = require("./routes/coupon.route");
const storeSettingsRoutes = require("./routes/storeSettings.route");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the CRUD API",
    version: "1.0.0",
    authentication: {
      type: "Bearer Token",
      login: "/api/users/login",
      note: "Include 'Authorization: Bearer <token>' header for protected routes"
    },
    endpoints: {
      products: "/api/products",
      users: "/api/users",
      customers: "/api/customers",
      orders: "/api/orders",
      coupons: "/api/coupons",
      storeSettings: "/api/store-settings"
    }
  });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/store-settings", storeSettingsRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Database connection
mongoose
  .connect(
    "mongodb+srv://tara:tara2006@cluster0.vfkzn2w.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackedDb"
  )
  .then(() => {
    console.log("Connected to the database");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
      console.log("API Documentation: http://localhost:3000");
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
  });
