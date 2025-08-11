# Image Upload API Documentation

This API now supports image uploads for products. Images are stored on the server and URLs are generated for easy access.

## Upload Endpoints

### 1. Upload Single Image
**POST** `/api/upload/image`

Upload a single image file and get the URL.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with field name `image`

**Example using curl:**
```bash
curl -X POST http://localhost:3000/api/upload/image \
  -F "image=@/path/to/your/image.jpg"
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "filename": "image-1703123456789-123456789.jpg",
    "originalName": "product-image.jpg",
    "size": 1024000,
    "url": "http://localhost:3000/uploads/image-1703123456789-123456789.jpg"
  }
}
```

## Product Endpoints with Image Support

### 2. Create Product with Image
**POST** `/api/products/with-image`

Create a new product with an image upload.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with product fields and `image` field

**Example using curl:**
```bash
curl -X POST http://localhost:3000/api/products/with-image \
  -F "name=Sample Product" \
  -F "description=This is a sample product" \
  -F "price=29.99" \
  -F "quantity=100" \
  -F "category=Electronics" \
  -F "sku=PROD-001" \
  -F "image=@/path/to/product-image.jpg"
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully with image",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Sample Product",
    "description": "This is a sample product",
    "price": 29.99,
    "quantity": 100,
    "category": "Electronics",
    "imageUrl": "http://localhost:3000/uploads/image-1703123456789-123456789.jpg",
    "sku": "PROD-001",
    "isActive": true,
    "createdAt": "2023-12-21T10:30:00.000Z"
  }
}
```

### 3. Update Product with Image
**PUT** `/api/products/:id/with-image`

Update an existing product and optionally upload a new image.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with updated product fields and optional `image` field

**Example using curl:**
```bash
curl -X PUT http://localhost:3000/api/products/507f1f77bcf86cd799439011/with-image \
  -F "name=Updated Product Name" \
  -F "price=39.99" \
  -F "image=@/path/to/new-image.jpg"
```

## File Requirements

- **Supported formats:** JPEG, JPG, PNG, GIF, WebP
- **Maximum file size:** 5MB
- **Field name:** `image`

## Error Handling

### File Size Exceeded
```json
{
  "success": false,
  "message": "File size too large. Maximum size is 5MB."
}
```

### Invalid File Type
```json
{
  "success": false,
  "message": "Only image files are allowed!"
}
```

### No File Provided
```json
{
  "success": false,
  "message": "No image file provided"
}
```

## Image Access

Uploaded images are accessible via the generated URLs:
- Base URL: `http://localhost:3000/uploads/`
- Full URL: `http://localhost:3000/uploads/filename.jpg`

## Usage Examples

### JavaScript/Fetch API
```javascript
// Upload image only
const formData = new FormData();
formData.append('image', fileInput.files[0]);

fetch('/api/upload/image', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Image URL:', data.data.url);
});

// Create product with image
const productFormData = new FormData();
productFormData.append('name', 'New Product');
productFormData.append('price', '25.99');
productFormData.append('category', 'Books');
productFormData.append('sku', 'BOOK-001');
productFormData.append('image', fileInput.files[0]);

fetch('/api/products/with-image', {
  method: 'POST',
  body: productFormData
})
.then(response => response.json())
.then(data => {
  console.log('Product created:', data.data);
});
```

### Using with Product Model

The `imageUrl` field in the Product model will automatically store the generated URL when using the image upload endpoints. This URL can then be used to display the product image in your frontend application.

## Notes

- Images are stored in the `uploads/` directory
- Filenames are automatically generated with timestamps to prevent conflicts
- The server serves static files from the uploads directory
- All uploaded images are publicly accessible via their URLs 