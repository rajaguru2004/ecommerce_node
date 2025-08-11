import express, { json, urlencoded } from "express";
const app = express();
import { connect } from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import routes
import productRoutes from "./routes/product_route.js";
import userRoutes from "./routes/user_route.js";
import customerRoutes from "./routes/customer_route.js";
import orderRoutes from "./routes/order_route.js";
import couponRoutes from "./routes/coupon_route.js";
import storeSettingsRoutes from "./routes/storeSettings_route.js";
import uploadRoutes from "./routes/upload_route.js";

// Middleware
app.use(json());
app.use(urlencoded({ extended: false }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
      productsWithImage: "/api/products/with-image",
      users: "/api/users",
      customers: "/api/customers",
      orders: "/api/orders",
      coupons: "/api/coupons",
      storeSettings: "/api/store-settings",
      uploads: "/api/upload"
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
app.use("/api/upload", uploadRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Database connection
connect(
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
