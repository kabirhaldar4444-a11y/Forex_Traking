# ForexShipping Admin API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### 1. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "admin@forexshipping.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin",
    "email": "admin@forexshipping.com",
    "role": "admin"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. Register
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "newadmin@forexshipping.com",
  "password": "securepassword123",
  "name": "New Admin"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439012",
    "name": "New Admin",
    "email": "newadmin@forexshipping.com",
    "role": "admin"
  }
}
```

---

### 3. Get Current Admin
**GET** `/auth/me` *(Protected)*

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "admin": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "admin@forexshipping.com",
    "name": "Admin",
    "role": "admin",
    "isActive": true,
    "createdAt": "2026-04-14T10:00:00.000Z"
  }
}
```

---

## Order Endpoints

### 1. Create Order
**POST** `/orders` *(Protected)*

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "customerName": "Jayanta Basak",
  "email": "jayanta@gmail.com",
  "deliveryAddress": "404A Block 1, Saija Patladan Vemur Junction Old Airport Road",
  "state": "Karnataka",
  "customState": null,
  "productName": "Macbook M4 Air",
  "quantity": 1
}
```

**For "Others" state:**
```json
{
  "customerName": "John Doe",
  "email": "john@example.com",
  "deliveryAddress": "123 Main St",
  "state": "Others",
  "customState": "Outer Region",
  "productName": "Iphone 16 Pro Max",
  "quantity": 2
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439013",
    "trackingId": "FXS-A1B2C3D4E5F6",
    "customerName": "Jayanta Basak",
    "email": "jayanta@gmail.com",
    "deliveryAddress": "404A Block 1, Saija Patladan Vemur Junction Old Airport Road",
    "state": "Karnataka",
    "customState": null,
    "productName": "Macbook M4 Air",
    "quantity": 1,
    "companyName": "PMIUSA",
    "companyAddress": "Miami, FL 80095 SW 87th Avenue, Suite 777 Miami, Florida 33176",
    "status": "Pickup Scheduled / Pending Pickup",
    "createdAt": "2026-04-14T10:00:00.000Z",
    "updatedAt": "2026-04-14T10:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

---

### 2. Get All Orders
**GET** `/orders` *(Protected)*

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
?limit=10&page=1&sort=-createdAt
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 210,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "trackingId": "FXS-A1B2C3D4E5F6",
      "customerName": "Jayanta Basak",
      "email": "jayanta@gmail.com",
      "productName": "Macbook M4 Air",
      "state": "Karnataka",
      "status": "Pickup Scheduled / Pending Pickup",
      "createdAt": "2026-04-14T10:00:00.000Z"
    }
    // ... more orders
  ]
}
```

---

### 3. Get Order by Tracking ID
**GET** `/orders/tracking/:trackingId`

**Example:**
```
GET /orders/tracking/FXS-A1B2C3D4E5F6
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439013",
    "trackingId": "FXS-A1B2C3D4E5F6",
    "customerName": "Jayanta Basak",
    "email": "jayanta@gmail.com",
    "deliveryAddress": "404A Block 1, Saija Patladan Vemur Junction Old Airport Road",
    "state": "Karnataka",
    "productName": "Macbook M4 Air",
    "quantity": 1,
    "status": "Pickup Scheduled / Pending Pickup",
    "createdAt": "2026-04-14T10:00:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Order not found"
}
```

---

### 4. Update Order
**PUT** `/orders/:id` *(Protected)*

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (partial update):**
```json
{
  "status": "In Transit"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    // ... updated order object
  },
  "message": "Order updated successfully"
}
```

---

### 5. Delete Order
**DELETE** `/orders/:id` *(Protected)*

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

### 6. Get Statistics
**GET** `/orders/stats` *(Protected)*

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "totalOrders": 210,
  "recentOrders": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "trackingId": "FXS-A1B2C3D4E5F6",
      "customerName": "Jayanta Basak",
      "productName": "Macbook M4 Air",
      "status": "Pickup Scheduled / Pending Pickup",
      "createdAt": "2026-04-14T10:00:00.000Z"
    }
    // ... up to 10 recent orders
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Order not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Valid Values

### Product Names
- Macbook M4 Air
- Iphone 16 Pro Max
- Ipad Air 11 M3
- Apple Watch Series 11
- Meta Quest 3
- Apple Airpods Max Wireless
- Sony Bravia Theatre System (HT-S60)

### Indian States
All 36 states/territories:
Andaman and Nicobar Islands, Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Chandigarh, Chhattisgarh, Dadra and Nagar Haveli and Daman and Diu, Delhi, Goa, Gujarat, Haryana, Himachal Pradesh, Jharkhand, Karnataka, Kerala, Ladakh, Lakshadweep, Madhya Pradesh, Maharashtra, Manipur, Meghalaya, Mizoram, Nagaland, Odisha, Puducherry, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal, **Others**

### Order Status
- Pickup Scheduled / Pending Pickup
- In Transit
- Delivered
- Cancelled

---

## Rate Limiting

Currently not implemented. Recommended for production environment.

---

## CORS Policy

Currently allows all origins for development. Should be restricted in production.

---

## Tracking ID Format

- **Format:** `FXS-XXXXXXXXXXXX`
- **Prefix:** FXS (ForexShipping)
- **Length:** 16 characters total
- **Randomness:** 12 alphanumeric characters
- **Generation:** UUID v4 based
- **Uniqueness:** Guaranteed with database duplicate checking

### Example Tracking IDs:
- FXS-4989C7922DE8
- FXS-808A4B61D931
- FXS-28C770786C29F

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@forexshipping.com",
    "password": "password123"
  }'
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "customerName": "Test User",
    "email": "test@example.com",
    "deliveryAddress": "123 Test St",
    "state": "Karnataka",
    "productName": "Macbook M4 Air",
    "quantity": 1
  }'
```

### Get All Orders
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```
