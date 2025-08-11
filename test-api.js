const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testProduct = {
    name: "Test Product",
    description: "A test product for API testing",
    price: 29.99,
    quantity: 100,
    category: "Electronics",
    sku: "TEST-001",
    imageUrl: "https://example.com/test.jpg"
};

const testUser = {
    username: "testuser",
    password: "testpassword123",
    role: "user"
};

const testCustomer = {
    name: "Test Customer",
    email: "test@example.com",
    phone: "+1234567890"
};

const testCoupon = {
    code: "TEST20",
    name: "Test 20% Off",
    discount: 20,
    usageLimit: 50,
    expiryDate: "2024-12-31T23:59:59.000Z"
};

const testStoreSettings = {
    storeName: "Test Store",
    description: "A test store for API testing",
    address: "123 Test St, Test City",
    contactEmail: "test@store.com",
    contactPhone: "+1234567890"
};

async function testAPI() {
    console.log('🚀 Starting API Tests...\n');

    try {
        // Test root endpoint
        console.log('1. Testing root endpoint...');
        const rootResponse = await axios.get('http://localhost:3000/');
        console.log('✅ Root endpoint working:', rootResponse.data.message);

        // Test Products API
        console.log('\n2. Testing Products API...');

        // Create product
        const createProductResponse = await axios.post(`${BASE_URL}/products`, testProduct);
        console.log('✅ Product created:', createProductResponse.data.data.name);
        const productId = createProductResponse.data.data._id;

        // Get all products
        const getProductsResponse = await axios.get(`${BASE_URL}/products`);
        console.log('✅ Products retrieved:', getProductsResponse.data.count, 'products');

        // Get product by ID
        const getProductResponse = await axios.get(`${BASE_URL}/products/${productId}`);
        console.log('✅ Product retrieved by ID:', getProductResponse.data.data.name);

        // Test Users API
        console.log('\n3. Testing Users API...');

        // Create user
        const createUserResponse = await axios.post(`${BASE_URL}/users`, testUser);
        console.log('✅ User created:', createUserResponse.data.data.username);
        const userId = createUserResponse.data.data._id;

        // Get all users
        const getUsersResponse = await axios.get(`${BASE_URL}/users`);
        console.log('✅ Users retrieved:', getUsersResponse.data.count, 'users');

        // Test Customers API
        console.log('\n4. Testing Customers API...');

        // Create customer
        const createCustomerResponse = await axios.post(`${BASE_URL}/customers`, testCustomer);
        console.log('✅ Customer created:', createCustomerResponse.data.data.name);
        const customerId = createCustomerResponse.data.data._id;

        // Get all customers
        const getCustomersResponse = await axios.get(`${BASE_URL}/customers`);
        console.log('✅ Customers retrieved:', getCustomersResponse.data.count, 'customers');

        // Test Coupons API
        console.log('\n5. Testing Coupons API...');

        // Create coupon
        const createCouponResponse = await axios.post(`${BASE_URL}/coupons`, testCoupon);
        console.log('✅ Coupon created:', createCouponResponse.data.data.code);

        // Get coupon by code
        const getCouponByCodeResponse = await axios.get(`${BASE_URL}/coupons/code/${testCoupon.code}`);
        console.log('✅ Coupon retrieved by code:', getCouponByCodeResponse.data.data.name);

        // Test Store Settings API
        console.log('\n6. Testing Store Settings API...');

        // Get store settings (should create default if none exist)
        const getStoreSettingsResponse = await axios.get(`${BASE_URL}/store-settings`);
        console.log('✅ Store settings retrieved:', getStoreSettingsResponse.data.data.storeName);

        // Update store settings
        const updateStoreSettingsResponse = await axios.put(`${BASE_URL}/store-settings`, {
            storeName: "Updated Test Store"
        });
        console.log('✅ Store settings updated:', updateStoreSettingsResponse.data.data.storeName);

        console.log('\n🎉 All API tests completed successfully!');
        console.log('\n📋 Test Summary:');
        console.log('- ✅ Products API: Working');
        console.log('- ✅ Users API: Working');
        console.log('- ✅ Customers API: Working');
        console.log('- ✅ Coupons API: Working');
        console.log('- ✅ Store Settings API: Working');
        console.log('\n📚 Full API documentation available in README.md');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        console.log('\n💡 Make sure the server is running on http://localhost:3000');
    }
}

// Run tests
testAPI(); 