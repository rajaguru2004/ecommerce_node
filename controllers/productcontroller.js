import Product from "../models/product_model.js";
import { uploadSingleImage } from "./uploadController.js";

// Get all products
export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Get product by ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Create new product with image upload
export async function addProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Create new product with image upload (using multer middleware)
export async function addProductWithImage(req, res) {
  try {
    // Handle image upload if present
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      req.body.imageUrl = imageUrl;
    }

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully with image",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Update product by ID
export async function updateProductById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Update product by ID with image upload
export async function updateProductByIdWithImage(req, res) {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };

    // Handle image upload if present
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      updateData.imageUrl = imageUrl;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Delete product by ID
export async function deleteById(req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
