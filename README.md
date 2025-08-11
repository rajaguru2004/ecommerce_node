# CRUD API Documentation

A comprehensive REST API built with Node.js, Express, and MongoDB following the MVC pattern.

## 🚀 Features

- **Complete CRUD Operations** for all entities
- **MVC Architecture** for clean code organization
- **MongoDB Integration** with Mongoose ODM
- **RESTful API Design** with proper HTTP methods
- **Error Handling** with consistent response format
- **Data Validation** with Mongoose schemas

## 📋 Table of Contents

- [Installation](#installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Products](#products)
  - [Users](#users)
  - [Customers](#customers)
  - [Orders](#orders)
  - [Coupons](#coupons)
  - [Store Settings](#store-settings)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API will be available at `http://localhost:3000`

## 🗄️ Database Schema

### Product Schema
```javascript
{
  name: String (required),
  description: String,
  price: Number (required),
  quantity: Number (default: 0),
  category: String (required),
  imageUrl: String,
  barcode: String,
  sku: String (required, unique),
  isActive: Boolean (default: true),
  createdAt: Date (default: now)
}
```

### User Schema
```javascript
{
  username: String (required, unique),
  password: String (required, hashed with bcrypt),
  role: String (enum: ['admin', 'user'], default: 'admin'),
  createdAt: Date (default: now)
}
```

## 🔐 Password Security & Authentication

### Password Hashing
The API implements secure password hashing using **bcryptjs**:

- **Automatic Hashing**: Passwords are automatically hashed before saving to the database
- **Salt Rounds**: Uses 12 salt rounds for strong security
- **Middleware**: Hashing occurs via Mongoose pre-save and pre-update hooks
- **Verification**: Hashed passwords are visible in GET requests for verification purposes

### JWT Authentication
The API uses **JSON Web Tokens (JWT)** for authentication:

- **Token Generation**: JWT tokens are generated upon successful login
- **Token Expiry**: Tokens expire after 24 hours
- **Bearer Token**: Use `Authorization: Bearer <token>` header for protected routes
- **Role-Based Access**: Different routes require different user roles (admin/user)

### Security Features
- **Create/Update Responses**: Passwords are excluded from create and update API responses
- **List Views**: Hashed passwords are included in user list and detail views
- **Update Protection**: Password updates automatically trigger re-hashing
- **No Plain Text Storage**: Passwords are never stored in plain text
- **Protected Routes**: Most API endpoints require authentication
- **Admin-Only Routes**: User management requires admin privileges

### Example Usage
```bash
# Create user with plain text password
POST /api/users
{
  "username": "guru2004",
  "password": "mypassword123"
}

# Response (password excluded for security)
{
  "success": true,
  "data": {
    "username": "guru2004",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}

# Get users (shows hashed password)
GET /api/users
{
  "success": true,
  "data": [
    {
      "username": "guru2004",
      "password": "$2a$12$hashedpasswordstring...",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Authentication Flow
```bash
# 1. Login to get JWT token
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "guru2004",
    "password": "mypassword123"
  }'

# Response with JWT token
{
  "success": true,
  "message": "Login successful",
  "data": {
    "username": "guru2004",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# 2. Use token for authenticated requests
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3. Admin-only operations
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "password": "password123",
    "role": "user"
  }'
```

### Password Verification/Decryption
**Note**: bcrypt is a one-way hashing algorithm - passwords cannot be "decrypted" back to plain text. However, you can verify if a plain text password matches a hashed password.

#### Using bcrypt.compare() in Node.js
```javascript
const bcrypt = require('bcryptjs');

// Example: Verify a password during login
async function verifyPassword(plainTextPassword, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
        return isMatch; // Returns true if passwords match, false otherwise
    } catch (error) {
        console.error('Password verification error:', error);
        return false;
    }
}

// Usage example
const hashedPassword = '$2a$12$hashedpasswordstring...';
const userInputPassword = 'mypassword123';

const isValid = await verifyPassword(userInputPassword, hashedPassword);
console.log('Password is valid:', isValid); // true or false
```

#### Adding Login Endpoint (Optional)
To implement user authentication, you can add a login endpoint:

```javascript
// In userController.js
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // Password is valid - return user data (without password)
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: userResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
```

#### Testing Password Verification
```bash
# Test with curl (if you add the login endpoint)
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "guru2004",
    "password": "mypassword123"
  }'
```

**Important Security Notes:**
- Never store plain text passwords
- Always use bcrypt.compare() for password verification
- bcrypt automatically handles salt extraction from hashed passwords
- Password verification is timing-safe to prevent timing attacks

### Authentication Errors

#### Missing Token
```json
{
  "success": false,
  "message": "Access token required"
}
```

#### Invalid/Expired Token
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

#### Insufficient Permissions
```json
{
  "success": false,
  "message": "Admin access required"
}
```

#### Invalid Credentials
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Customer Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String,
  isActive: Boolean (default: true),
  createdAt: Date (default: now)
}
```

### Order Schema
```javascript
{
  customerId: ObjectId (ref: 'Customer'),
  customerName: String (required),
  total: Number (required),
  status: String (enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending'),
  items: [{
    productId: ObjectId (ref: 'Product', required),
    quantity: Number (required),
    price: Number (required),
    name: String (required)
  }],
  createdAt: Date (default: now)
}
```

### Coupon Schema
```javascript
{
  code: String (required, unique),
  name: String (required),
  discount: Number (required, min: 1, max: 100),
  usageLimit: Number (required, min: 1),
  usageCount: Number (default: 0),
  expiryDate: Date (required),
  isActive: Boolean (default: true),
  createdAt: Date (default: now)
}
```

### Store Settings Schema
```javascript
{
  _id: String (default: 'store-1'),
  storeName: String (required),
  description: String,
  address: String,
  contactEmail: String,
  contactPhone: String
}
```

## 🔗 API Endpoints

### Products

#### GET /api/products
Get all products
```bash
curl -X GET http://localhost:3000/api/products
```

#### GET /api/products/:id
Get product by ID
```bash
curl -X GET http://localhost:3000/api/products/64f8a1b2c3d4e5f6a7b8c9d0
```

#### POST /api/products
Create a new product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "A sample product description",
    "price": 29.99,
    "quantity": 100,
    "category": "Electronics",
    "sku": "PROD-001",
    "imageUrl": "https://example.com/image.jpg"
  }'
```

#### PUT /api/products/:id
Update product by ID
```bash
curl -X PUT http://localhost:3000/api/products/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39.99,
    "quantity": 150
  }'
```

#### DELETE /api/products/:id
Delete product by ID
```bash
curl -X DELETE http://localhost:3000/api/products/64f8a1b2c3d4e5f6a7b8c9d0
```

### Users

#### POST /api/users/login
Login user (public route - no authentication required)
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "guru2004",
    "password": "mypassword123"
  }'
```

#### GET /api/users
Get all users (requires authentication)
```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### GET /api/users/:id
Get user by ID (requires authentication)
```bash
curl -X GET http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <your-jwt-token>"
```

#### POST /api/users
Create a new user (requires admin authentication)
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "guru2004",
    "password": "securepassword123",
    "role": "user"
  }'
```

#### PUT /api/users/:id
Update user by ID (requires admin authentication)
```bash
curl -X PUT http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <your-jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "admin"
  }'
```

#### DELETE /api/users/:id
Delete user by ID (requires admin authentication)
```bash
curl -X DELETE http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Customers

#### GET /api/customers
Get all customers
```bash
curl -X GET http://localhost:3000/api/customers
```

#### GET /api/customers/:id
Get customer by ID
```bash
curl -X GET http://localhost:3000/api/customers/64f8a1b2c3d4e5f6a7b8c9d0
```

#### POST /api/customers
Create a new customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "guru2004",
    "email": "guru2004@example.com",
    "phone": "+1234567890"
  }'
```

#### PUT /api/customers/:id
Update customer by ID
```bash
curl -X PUT http://localhost:3000/api/customers/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1987654321"
  }'
```

#### DELETE /api/customers/:id
Delete customer by ID
```bash
curl -X DELETE http://localhost:3000/api/customers/64f8a1b2c3d4e5f6a7b8c9d0
```

### Orders

#### GET /api/orders
Get all orders (with populated customer and product data)
```bash
curl -X GET http://localhost:3000/api/orders
```

#### GET /api/orders/:id
Get order by ID (with populated customer and product data)
```bash
curl -X GET http://localhost:3000/api/orders/64f8a1b2c3d4e5f6a7b8c9d0
```

#### POST /api/orders
Create a new order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "customerName": "John Doe",
    "total": 89.97,
    "items": [
      {
        "productId": "64f8a1b2c3d4e5f6a7b8c9d1",
        "quantity": 2,
        "price": 29.99,
        "name": "Sample Product"
      }
    ]
  }'
```

#### PUT /api/orders/:id
Update order by ID
```bash
curl -X PUT http://localhost:3000/api/orders/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "total": 99.97
  }'
```

#### PATCH /api/orders/:id/status
Update order status
```bash
curl -X PATCH http://localhost:3000/api/orders/64f8a1b2c3d4e5f6a7b8c9d0/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

#### DELETE /api/orders/:id
Delete order by ID
```bash
curl -X DELETE http://localhost:3000/api/orders/64f8a1b2c3d4e5f6a7b8c9d0
```

### Coupons

#### GET /api/coupons
Get all coupons
```bash
curl -X GET http://localhost:3000/api/coupons
```

#### GET /api/coupons/:id
Get coupon by ID
```bash
curl -X GET http://localhost:3000/api/coupons/64f8a1b2c3d4e5f6a7b8c9d0
```

#### GET /api/coupons/code/:code
Get coupon by code (with validation)
```bash
curl -X GET http://localhost:3000/api/coupons/code/SAVE20
```

#### POST /api/coupons
Create a new coupon
```bash
curl -X POST http://localhost:3000/api/coupons \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "name": "20% Off",
    "discount": 20,
    "usageLimit": 100,
    "expiryDate": "2024-12-31T23:59:59.000Z"
  }'
```

#### PUT /api/coupons/:id
Update coupon by ID
```bash
curl -X PUT http://localhost:3000/api/coupons/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "usageLimit": 150
  }'
```

#### PATCH /api/coupons/:code/use
Use coupon (increment usage count)
```bash
curl -X PATCH http://localhost:3000/api/coupons/SAVE20/use
```

#### DELETE /api/coupons/:id
Delete coupon by ID
```bash
curl -X DELETE http://localhost:3000/api/coupons/64f8a1b2c3d4e5f6a7b8c9d0
```

### Store Settings

#### GET /api/store-settings
Get store settings (creates default if none exist)
```bash
curl -X GET http://localhost:3000/api/store-settings
```

#### POST /api/store-settings
Create store settings
```bash
curl -X POST http://localhost:3000/api/store-settings \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "My Awesome Store",
    "description": "The best store in town",
    "address": "123 Main St, City, State",
    "contactEmail": "contact@mystore.com",
    "contactPhone": "+1234567890"
  }'
```

#### PUT /api/store-settings
Update store settings
```bash
curl -X PUT http://localhost:3000/api/store-settings \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "Updated Store Name"
  }'
```

#### DELETE /api/store-settings
Delete store settings
```bash
curl -X DELETE http://localhost:3000/api/store-settings
```

## 📤 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## ⚠️ Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side errors

Common error scenarios:
- Invalid MongoDB ObjectId format
- Required fields missing
- Duplicate unique values (email, username, SKU, etc.)
- Invalid enum values
- Expired coupons
- Usage limit exceeded

## 🏗️ Project Structure

```
├── controllers/
│   ├── productcontroller.js
│   ├── userController.js
│   ├── customerController.js
│   ├── orderController.js
│   ├── couponController.js
│   └── storeSettingsController.js
├── models/
│   ├── product.model.js
│   ├── user.model.js
│   ├── customer.model.js
│   ├── order.model.js
│   ├── coupon.model.js
│   └── storeSettings.model.js
├── routes/
│   ├── product.route.js
│   ├── user.route.js
│   ├── customer.route.js
│   ├── order.route.js
│   ├── coupon.route.js
│   └── storeSettings.route.js
├── index.js
├── package.json
└── README.md
```

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Object Data Modeling (ODM)
- **bcryptjs** - Password hashing and security
- **jsonwebtoken** - JWT authentication
- **JavaScript** - Programming language

## 📝 License

This project is open source and available under the [MIT License](LICENSE). 