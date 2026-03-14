#!/usr/bin/env node

/**
 * Comprehensive API Test Suite for Vetro Clothing
 * Tests all critical endpoints and verifies proper functioning
 */

import axios from 'axios';
import http from 'http';

const BACKEND_URL = 'http://localhost:4000';
let testResults = { passed: 0, failed: 0, skipped: 0 };
let testToken = null;
let testAdminToken = null;
let testProductId = null;
let testUserId = null;
let testOrderId = null;

// Helper function to log test results
const logTest = (name, status, message = '') => {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⏭️';
  console.log(`${icon} ${name}: ${status} ${message ? `- ${message}` : ''}`);
  if (status === 'PASS') testResults.passed++;
  if (status === 'FAIL') testResults.failed++;
  if (status === 'SKIP') testResults.skipped++;
};

// Helper to make API calls
const makeRequest = async (method, path, data = null, token = null, useAdminAuth = false) => {
  try {
    const config = { method, url: BACKEND_URL + path };
    if (data) config.data = data;
    
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    } else if (useAdminAuth && testAdminToken) {
      config.headers = { Authorization: `Bearer ${testAdminToken}` };
    }
    
    const response = await axios(config);
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 0, data: error.response?.data || { error: error.message } };
  }
};

// Test suite
const runTests = async () => {
  console.log('\n🧪 COMPREHENSIVE VETRO CLOTHING API TEST SUITE\n');
  console.log('='.repeat(60));
  
  // ==================== HEALTH CHECK ====================
  console.log('\n📡 HEALTH CHECKS');
  console.log('-'.repeat(60));
  
  try {
    const res = await axios.get(BACKEND_URL);
    logTest('Backend Server Health', res.status === 200 ? 'PASS' : 'FAIL', `Status: ${res.status}`);
  } catch (e) {
    logTest('Backend Server Health', 'FAIL', 'Server not responding');
    process.exit(1);
  }
  
  // ==================== AUTHENTICATION ====================
  console.log('\n🔐 AUTHENTICATION TESTS');
  console.log('-'.repeat(60));
  
  // Test User Registration
  const regData = {
    name: `TestUser_${Date.now()}`,
    email: `test_${Date.now()}@vetro.com`,
    password: 'TestPass123'
  };
  const regRes = await makeRequest('POST', '/api/user/register', regData);
  if (regRes.status === 201 && regRes.data.success && regRes.data.token) {
    logTest('User Registration', 'PASS', `Token received`);
    testToken = regRes.data.token;
  } else {
    logTest('User Registration', 'FAIL', `Status: ${regRes.status}`);
  }
  
  // Test User Login
  const loginRes = await makeRequest('POST', '/api/user/login', {
    email: regData.email,
    password: regData.password
  });
  if (loginRes.status === 200 && loginRes.data.success && loginRes.data.token) {
    logTest('User Login', 'PASS', 'Token received');
    testToken = loginRes.data.token;
  } else {
    logTest('User Login', 'FAIL', `Status: ${loginRes.status}`);
  }
  
  // Test Admin Login
  const adminRes = await makeRequest('POST', '/api/user/admin', {
    email: 'admin@vetro.com',
    password: 'vetro765'
  });
  if (adminRes.status === 200 && adminRes.data.success && adminRes.data.token) {
    logTest('Admin Login', 'PASS', 'Token received');
    testAdminToken = adminRes.data.token;
  } else {
    logTest('Admin Login', 'FAIL', `Status: ${adminRes.status}`);
  }
  
  // ==================== PRODUCTS ====================
  console.log('\n📦 PRODUCT TESTS');
  console.log('-'.repeat(60));
  
  // Test Get Products List
  const listRes = await makeRequest('GET', '/api/product/list');
  if (listRes.status === 200 && listRes.data.success && Array.isArray(listRes.data.products)) {
    logTest('Get Product List', 'PASS', `Found ${listRes.data.products.length} products`);
    if (listRes.data.products.length > 0) {
      testProductId = listRes.data.products[0]._id;
    }
  } else {
    logTest('Get Product List', 'FAIL', `Status: ${listRes.status}`);
  }
  
  // Test Get Single Product (if available)
  if (testProductId) {
    const singleRes = await makeRequest('GET', `/api/product/${testProductId}`);
    if (singleRes.status === 200 && singleRes.data.success) {
      logTest('Get Single Product', 'PASS', `Product: ${singleRes.data.product?.name}`);
    } else {
      logTest('Get Single Product', 'FAIL', `Status: ${singleRes.status}`);
    }
  } else {
    logTest('Get Single Product', 'SKIP', 'No products found');
  }
  
  // ==================== CART OPERATIONS ====================
  console.log('\n🛒 CART TESTS');
  console.log('-'.repeat(60));
  
  if (!testToken) {
    logTest('Add to Cart', 'SKIP', 'No user token available');
    logTest('Get Cart', 'SKIP', 'No user token available');
    logTest('Update Cart', 'SKIP', 'No user token available');
    logTest('Remove from Cart', 'SKIP', 'No user token available');
  } else if (!testProductId) {
    logTest('Add to Cart', 'SKIP', 'No products available');
    logTest('Get Cart', 'SKIP', 'No products available');
    logTest('Update Cart', 'SKIP', 'No products available');
    logTest('Remove from Cart', 'SKIP', 'No products available');
  } else {
    // Test Add to Cart
    const addRes = await makeRequest('POST', '/api/cart/add', { itemId: testProductId, size: 'M' }, testToken);
    if (addRes.status === 200 && addRes.data.success) {
      logTest('Add to Cart', 'PASS');
    } else {
      logTest('Add to Cart', 'FAIL', `Status: ${addRes.status}`);
    }
    
    // Test Get Cart
    const getCartRes = await makeRequest('GET', '/api/cart', null, testToken);
    if (getCartRes.status === 200 && getCartRes.data.success) {
      logTest('Get Cart', 'PASS', `Cart items: ${Object.keys(getCartRes.data.cartData).length}`);
    } else {
      logTest('Get Cart', 'FAIL', `Status: ${getCartRes.status}`);
    }
    
    // Test Update Cart
    const updateRes = await makeRequest('PUT', '/api/cart/update', { itemId: testProductId, size: 'M', quantity: 2 }, testToken);
    if (updateRes.status === 200 && updateRes.data.success) {
      logTest('Update Cart Quantity', 'PASS');
    } else {
      logTest('Update Cart Quantity', 'FAIL', `Status: ${updateRes.status}`);
    }
    
    // Test Remove from Cart
    const removeRes = await makeRequest('DELETE', '/api/cart/remove', { itemId: testProductId, size: 'M' }, testToken);
    if (removeRes.status === 200 && removeRes.data.success) {
      logTest('Remove from Cart', 'PASS');
    } else {
      logTest('Remove from Cart', 'FAIL', `Status: ${removeRes.status}`);
    }
  }
  
  // ==================== ORDERS ====================
  console.log('\n📋 ORDER TESTS');
  console.log('-'.repeat(60));
  
  if (!testToken) {
    logTest('Place Order', 'SKIP', 'No user token available');
    logTest('Get User Orders', 'SKIP', 'No user token available');
  } else if (!testProductId) {
    logTest('Place Order', 'SKIP', 'No products available');
    logTest('Get User Orders', 'SKIP', 'No products available');
  } else {
    // Test Place Order
    const orderData = {
      items: [{ _id: testProductId, name: 'Test Item', price: 100, quantity: 1, size: 'M', image: [] }],
      amount: 110,
      address: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'USA',
        phone: '1234567890'
      },
      paymentMethod: 'COD'
    };
    const orderRes = await makeRequest('POST', '/api/order/place', orderData, testToken);
    if (orderRes.status === 201 && orderRes.data.success) {
      logTest('Place Order', 'PASS');
      testOrderId = orderRes.data.order?._id;
    } else {
      logTest('Place Order', 'FAIL', `Status: ${orderRes.status}`);
    }
    
    // Test Get User Orders
    const userOrdersRes = await makeRequest('POST', '/api/order/userorders', {}, testToken);
    if (userOrdersRes.status === 200 && userOrdersRes.data.success && Array.isArray(userOrdersRes.data.orders)) {
      logTest('Get User Orders', 'PASS', `Orders: ${userOrdersRes.data.orders.length}`);
    } else {
      logTest('Get User Orders', 'FAIL', `Status: ${userOrdersRes.status}`);
    }
  }
  
  // ==================== ADMIN OPERATIONS ====================
  console.log('\n👨‍💼 ADMIN TESTS');
  console.log('-'.repeat(60));
  
  if (!testAdminToken) {
    logTest('Admin List All Orders', 'SKIP', 'No admin token available');
    logTest('Admin Update Order Status', 'SKIP', 'No admin token available');
  } else {
    // Test Admin List Orders
    const allOrdersRes = await makeRequest('POST', '/api/order/list', {}, testAdminToken);
    if (allOrdersRes.status === 200 && allOrdersRes.data.success && Array.isArray(allOrdersRes.data.orders)) {
      logTest('Admin List All Orders', 'PASS', `Total orders: ${allOrdersRes.data.orders.length}`);
    } else {
      logTest('Admin List All Orders', 'FAIL', `Status: ${allOrdersRes.status}`);
    }
    
    // Test Admin Update Order Status (if we have an order)
    if (testOrderId) {
      const statusRes = await makeRequest('POST', '/api/order/status', { orderId: testOrderId, status: 'Processing' }, testAdminToken);
      if (statusRes.status === 200 && statusRes.data.success) {
        logTest('Admin Update Order Status', 'PASS');
      } else {
        logTest('Admin Update Order Status', 'FAIL', `Status: ${statusRes.status}`);
      }
    } else {
      logTest('Admin Update Order Status', 'SKIP', 'No order available');
    }
  }
  
  // ==================== SUMMARY ====================
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 TEST SUMMARY');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`⏭️  Skipped: ${testResults.skipped}`);
  console.log(`📈 Total: ${testResults.passed + testResults.failed + testResults.skipped}`);
  console.log(`✨ Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(2)}%\n`);
  
  if (testResults.failed > 0) {
    console.log('⚠️  Some tests failed. Please review the errors above.');
    process.exit(1);
  } else {
    console.log('🎉 All tests passed! Your API is working correctly.');
    process.exit(0);
  }
};

// Run the test suite
runTests().catch(err => {
  console.error('Test suite error:', err.message);
  process.exit(1);
});
