# API Reference Guide - Vetro Clothing

## WORKING ENDPOINTS ✅

### USER ENDPOINTS

#### Register User
```
POST /api/user/register
Body: { name: string, email: string, password: string }
Response: { success: true, token: string } | { success: false, message: string }
Auth: None
Status: ✅ WORKING
Frontend: Login.jsx → onSubmitHandler()
```

#### Login User  
```
POST /api/user/login
Body: { email: string, password: string }
Response: { success: true, token: string } | { success: false, message: string }
Auth: None
Status: ✅ WORKING
Frontend: Login.jsx → onSubmitHandler()
```

#### Admin Login
```
POST /api/user/admin
Body: { email: string, password: string }
Response: { success: true, token: string } | { success: false, message: string }
Auth: None (hardcoded in backend)
Status: ✅ WORKING
Frontend: Not used (direct token in localStorage)
```

---

### PRODUCT ENDPOINTS

#### List All Products
```
GET /api/product/list
Response: { success: true, products: [...] }
Auth: None
Status: ✅ WORKING
Frontend: ShopContext.jsx → getProductsData()
Product Format:
{
  _id: string,
  name: string,
  description: string,
  price: number,
  category: string,
  subCategory: string,
  bestseller: boolean,
  sizes: [string],
  image: [string],  // URLs
  date: Date
}
```

#### Get Single Product
```
GET /api/product/:id
Response: { success: true, product: {...} }
Auth: None
Status: ✅ BACKEND READY
Frontend: NOT USED (uses context instead)
Recommendation: Should use this instead of filtering context
```

#### Add Product (Admin)
```
POST /api/product/add
Headers: { Authorization: Bearer <admin_token> }
Body: FormData {
  name: string,
  description: string,
  price: number,
  category: string,
  subCategory: string,
  bestseller: boolean,
  sizes: JSON.stringify([string]),
  image1: File,
  image2: File,  // Optional
  image3: File,  // Optional
  image4: File   // Optional
}
Response: { success: true, product: {...} }
Auth: Admin required
Status: ✅ WORKING
Frontend: Admin/Add.jsx → onSubmitHandler()
Images: Automatically uploaded to Cloudinary
```

#### Remove Product (Admin) ⚠️ MISMATCH
```
DELETE /api/product/remove
Headers: { token: <admin_token> }  ← Note: uses 'token' not 'Authorization'
Body: { id: string }
Response: { success: true, message: "Product Removed" }
Auth: Admin required
Status: ✅ BACKEND READY, 🟡 FRONTEND BROKEN
Frontend: Admin/List.jsx uses POST instead of DELETE ← BUG
```

---

### CART ENDPOINTS

#### Add Item to Cart
```
POST /api/cart/add
Headers: { Authorization: Bearer <user_token> }
Body: { itemId: string, size: string }
Response: { success: true, message: "Item added to cart" }
Auth: User required
Status: ✅ WORKING
Frontend: ShopContext.jsx → addToCart()
Action: Adds/increments item in user.cartData
```

#### Update Cart Quantity
```
PUT /api/cart/update
Headers: { Authorization: Bearer <user_token> }
Body: { itemId: string, size: string, quantity: number }
Response: { success: true, message: "Cart updated successfully" }
Auth: User required
Status: ✅ WORKING
Frontend: ShopContext.jsx → updateQuantity()
Action: Sets exact quantity for item+size
```

#### Remove Item from Cart
```
DELETE /api/cart/remove
Headers: { Authorization: Bearer <user_token> }
Body: { itemId: string, size: string }
Response: { success: true, message: "Item removed from cart" }
Auth: User required
Status: ✅ WORKING
Frontend: ShopContext.jsx → removeFromCart()
Action: Removes size from item, removes item if no sizes left
```

#### Get User Cart
```
GET /api/cart
Headers: { Authorization: Bearer <user_token> }
Response: { success: true, cartData: {...} }
Auth: User required
Status: ✅ WORKING
Frontend: ShopContext.jsx → getUserCart()
CartData Format:
{
  itemId1: { size1: quantity1, size2: quantity2 },
  itemId2: { size1: quantity1 }
}
```

---

## PARTIALLY IMPLEMENTED ENDPOINTS ⚠️

### ORDER ENDPOINTS

#### Place Order ⚠️ FRONTEND MISSING
```
POST /api/order/place
Headers: { Authorization: Bearer <user_token> }
Body: {
  items: [...],  // Cart items
  amount: number,
  address: {
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    state: string,
    pincode: string,
    country: string,
    phone: string
  },
  paymentMethod: "cod" | "stripe" | "razorpay"
}
Response: { success: true, order: {...} }
Auth: User required
Status: 
  ✅ BACKEND READY
  ❌ FRONTEND NOT CALLING
Frontend: PlaceOrder.jsx line 48 (NO API CALL - BUG)
Order Created: {
  _id: ObjectId,
  userId: string,
  items: array,
  amount: number,
  address: object,
  status: "Order Placed",
  paymentMethod: string,
  payment: false (for COD), true (for others),
  date: timestamp
}
```

#### Place Order - Stripe ⚠️ PLACEHOLDER
```
POST /api/order/stripe
Headers: { Authorization: Bearer <user_token> }
Body: Same as /place
Response: Same as /place
Status: 
  ⚠️ BACKEND PLACEHOLDER (calls placeOrder, no payment processing)
  ❌ FRONTEND NOT CALLING
Frontend: PlaceOrder.jsx - method selection exists but no handler
Issue: No actual Stripe integration
```

#### Place Order - Razorpay ⚠️ PLACEHOLDER
```
POST /api/order/razorpay
Headers: { Authorization: Bearer <user_token> }
Body: Same as /place
Response: Same as /place
Status:
  ⚠️ BACKEND PLACEHOLDER (calls placeOrder, no payment processing)
  ❌ FRONTEND NOT CALLING
Frontend: PlaceOrder.jsx - method selection exists but no handler
Issue: No actual Razorpay integration
```

#### Get User Orders ❌ FRONTEND MISSING
```
POST /api/order/userorders
Headers: { Authorization: Bearer <user_token> }
Body: {} (empty, userId from token)
Response: { success: true, orders: [...] }
Auth: User required
Status:
  ✅ BACKEND READY
  ❌ FRONTEND NOT CALLING
Frontend: Orders.jsx (shows fake product data instead - BUG)
Orders Returned: Array of order objects (see /place response)
```

#### List All Orders (Admin) ⚠️ FRONTEND MISSING
```
POST /api/order/list
Headers: { token: <admin_token> }
Body: {} (empty)
Response: { success: true, orders: [...] }
Auth: Admin required
Status:
  ✅ BACKEND READY
  ❌ FRONTEND COMPONENT EMPTY
Frontend: Admin/Orders.jsx (completely empty - BUG)
Orders Returned: Array of all orders sorted by date (newest first)
```

#### Update Order Status (Admin) ⚠️ FRONTEND MISSING
```
POST /api/order/status
Headers: { token: <admin_token> }
Body: { orderId: string, status: string }
Response: { success: true, order: {...} }
Auth: Admin required
Status:
  ✅ BACKEND READY
  ❌ FRONTEND NOT CALLING
Frontend: Admin/Orders.jsx (should be in orders list - not implemented)
Status Values: "Order Placed", "Processing", "Shipped", "Delivered" (or custom)
```

---

## DEBUGGING ENDPOINTS

### Debug Products (Static HTML)
```
GET /debug/static-products
Response: HTML page with product cards and JSON
Auth: None
Status: ✅ WORKING
Use: http://localhost:4000/debug/static-products
Purpose: Visual debugging of products
```

---

## AUTHENTICATION

### Token Format
All user requests use:
```
Headers: {
  Authorization: "Bearer <token>"
}
```

All admin requests use:
```
Headers: {
  token: "<token>"
}
```

⚠️ **INCONSISTENCY**: User routes use "Authorization" header, admin routes use "token" header

### Token Contents
```
{
  _id: string,
  role: "user" | "admin",
  iat: number,
  exp: number  // 7 days
}
```

---

## ERROR RESPONSES

All endpoints return consistent error format:
```
{ success: false, message: "error description" }

HTTP Status Codes:
400 - Bad Request (missing fields, validation error)
401 - Unauthorized (missing token or invalid token)
403 - Forbidden (not admin when admin required)
404 - Not Found (user, order, product not found)
409 - Conflict (duplicate email on register)
500 - Server Error
```

---

## CART DATA STRUCTURE

Frontend localStorage and backend user.cartData:
```
{
  "product_id_1": {
    "S": 2,      // Size S: quantity 2
    "M": 1,      // Size M: quantity 1
    "L": 0
  },
  "product_id_2": {
    "XL": 3
  }
}
```

---

## ADDRESS OBJECT (When Used)

Expected by `/api/order/place`:
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  street: string,
  city: string,
  state: string,
  pincode: string,
  country: string,
  phone: string
}
```

Currently NOT used because PlaceOrder.jsx doesn't submit address

---

## FRONTEND-BACKEND MISMATCH SUMMARY

| Issue | Backend | Frontend | Status |
|-------|---------|----------|--------|
| Product remove method | DELETE | POST | ❌ |
| Auth header - users | Authorization | Authorization | ✅ |
| Auth header - admin | token | token | ✅ |
| Order placement API | ✅ Ready | ❌ No call | ❌ |
| User orders API | ✅ Ready | ❌ No call | ❌ |
| Admin orders API | ✅ Ready | ❌ No call | ❌ |
| Order status API | ✅ Ready | ❌ No call | ❌ |
| Stripe payment | ⚠️ Stub | ❌ No handler | ❌ |
| Razorpay payment | ⚠️ Stub | ❌ No handler | ❌ |

---

## TESTING COMMANDS

### Test with curl

#### Register
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

#### Login
```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

#### Get Products
```bash
curl http://localhost:4000/api/product/list
```

#### Add to Cart
```bash
curl -X POST http://localhost:4000/api/cart/add \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"itemId":"product_id","size":"M"}'
```

#### Place Order
```bash
curl -X POST http://localhost:4000/api/order/place \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "items":{"product_id":{"S":2}},
    "amount":5999,
    "address":{"firstName":"John","lastName":"Doe","email":"john@example.com","street":"123 Main St","city":"City","state":"State","pincode":"12345","country":"Country","phone":"1234567890"},
    "paymentMethod":"cod"
  }'
```

---

## IMPLEMENTATION CHECKLIST

### To make orders work:
- [ ] PlaceOrder.jsx - Add form data collection
- [ ] PlaceOrder.jsx - Add axios.post call to /api/order/place
- [ ] PlaceOrder.jsx - Clear cart on success
- [ ] Orders.jsx - Add axios.post call to /api/order/userorders
- [ ] Orders.jsx - Display real order data
- [ ] Admin/Orders.jsx - Implement order list
- [ ] Admin/Orders.jsx - Add axios.post for /api/order/list
- [ ] Admin/Orders.jsx - Add status update handler

### To make payments work:
- [ ] Install Stripe library
- [ ] Implement Stripe flow in PlaceOrder.jsx
- [ ] Implement Stripe handler in backend
- [ ] Install Razorpay library
- [ ] Implement Razorpay flow in PlaceOrder.jsx
- [ ] Implement Razorpay handler in backend
- [ ] Update order status after payment

### To fix current bugs:
- [ ] Admin/List.jsx - Change axios.post to axios.delete for product remove
- [ ] ShopContext.jsx - Add clear cart function
- [ ] PlaceOrder.jsx - Call clear cart after order placed
