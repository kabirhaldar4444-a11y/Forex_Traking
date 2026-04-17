<<<<<<< HEAD
# ForexShipping Admin Panel

A complete MERN (MongoDB, Express, React, Node.js) stack application for managing shipping orders with admin authentication.

## Features

- **Admin Login Authentication** - JWT-based authentication with secure password hashing
- **Dashboard** - View all orders with tracking information
- **Create Orders** - Create new shipments with:
  - Customer information (name, email, address)
  - All 36 Indian states dropdown + "Others" option
  - Fixed product list (7 products)
  - Quantity selection
  - Auto-generated tracking IDs (Format: FXS-XXXXXXXXXXXX)
- **Tracking ID System** - Unique auto-generated IDs using UUID
- **MongoDB Integration** - Persistent data storage

## Project Structure

```
forexshipping-admin/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Order.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── orders.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.js
    │   ├── constants/
    │   │   └── index.js
    │   ├── controllers/
    │   │   └── authController.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   └── CreateOrder.js
    │   ├── services/
    │   │   ├── api.js
    │   │   └── auth.js
    │   ├── styles/
    │   │   ├── Login.css
    │   │   ├── Dashboard.css
    │   │   └── CreateOrder.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation

### Prerequisites

- Node.js v14+
- MongoDB installed and running

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd forexshipping-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/forexshipping
   JWT_SECRET=your_secure_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   ```

4. Start MongoDB:
   ```bash
   mongod
   ```

5. Create a default admin user (optional - you can register via API):
   ```bash
   node scripts/createAdmin.js
   ```

6. Start the backend server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login admin
- `POST /api/auth/register` - Register new admin
- `GET /api/auth/me` - Get current admin (protected)

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get all orders (protected)
- `GET /api/orders/stats` - Get order statistics (protected)
- `GET /api/orders/tracking/:trackingId` - Get order by tracking ID
- `PUT /api/orders/:id` - Update order (protected)
- `DELETE /api/orders/:id` - Delete order (protected)

## Available Products

1. Macbook M4 Air
2. Iphone 16 Pro Max
3. Ipad Air 11 M3
4. Apple Watch Series 11
5. Meta Quest 3
6. Apple Airpods Max Wireless
7. Sony Bravia Theatre System (HT-S60)

## Indian States

All 36 Indian states/territories included:
- Andaman and Nicobar Islands
- Andhra Pradesh
- Arunachal Pradesh
- Assam
- Bihar
- Chandigarh
- Chhattisgarh
- Dadra and Nagar Haveli and Daman and Diu
- Delhi
- Goa
- Gujarat
- Haryana
- Himachal Pradesh
- Jharkhand
- Karnataka
- Kerala
- Ladakh
- Lakshadweep
- Madhya Pradesh
- Maharashtra
- Manipur
- Meghalaya
- Mizoram
- Nagaland
- Odisha
- Puducherry
- Punjab
- Rajasthan
- Sikkim
- Tamil Nadu
- Telangana
- Tripura
- Uttar Pradesh
- Uttarakhand
- West Bengal
- **Others** (with custom state input field)

## Tracking ID Format

Format: `FXS-XXXXXXXXXXXX`
- Prefix: `FXS` (ForexShipping)
- Followed by: 12 random alphanumeric characters
- Generated using UUID v4
- Guaranteed unique with database duplicate checking

## Authentication Flow

1. Admin logs in with email and password
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. Token included in all protected requests
5. Backend verifies token before processing requests

## Default Admin Credentials (First Time Setup)

Email: `admin@forexshipping.com`
Password: `password123`

(Change these in production!)

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **uuid** - Tracking ID generation

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Development Notes

- All sensitive data in `.env` file
- Passwords hashed with bcrypt before storage
- JWTs expire after 7 days
- Tracking IDs are unique with duplicate checking
- CORS enabled for local development
- Protected routes require valid JWT token

## License

ISC

## Support

For issues or questions, please contact the development team.
=======
# Forex_Traking
>>>>>>> e5259c2b293eba54c57690d60feb1723edaed559
