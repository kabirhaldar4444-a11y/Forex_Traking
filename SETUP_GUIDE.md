# Setup Guide - ForexShipping Admin Panel

## Quick Start (5 minutes)

### Step 1: Prerequisites
Make sure you have installed:
- **Node.js** v14+ (from https://nodejs.org/)
- **MongoDB** (from https://www.mongodb.com/try/download/community)

### Step 2: Clone and Install Backend

```bash
# Navigate to project directory
cd c:\Users\Iron Man\Downloads\fghfgh\Forex

# Install backend dependencies
npm install
```

### Step 3: Configure MongoDB

1. Start MongoDB:
   - If installed as service: It should start automatically
   - If not, run: `mongod` in a terminal

2. Verify MongoDB is running:
   ```bash
   mongosh
   > db.version()
   > exit
   ```

### Step 4: Create Admin User

```bash
# From project root directory
node scripts/createAdmin.js
```

You should see:
```
MongoDB connected
Default admin created successfully
Email: admin@forexshipping.com
Password: password123

⚠️  IMPORTANT: Change the password in production!
```

### Step 5: Start Backend Server

```bash
# From project root
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 6: Setup Frontend (in a new terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Step 7: Login

Use the credentials:
- **Email:** admin@forexshipping.com
- **Password:** password123

---

## Detailed Setup Instructions

### MongoDB Installation

#### Windows
1. Download Community Edition: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Install as a Service"
4. MongoDB will start automatically

#### macOS
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Node.js Installation

Download from https://nodejs.org/ and install the LTS version.

Verify installation:
```bash
node --version
npm --version
```

---

## Project Structure Verification

After setup, your directory should look like:

```
Forex/
├── config/
│   └── database.js
├── models/
│   ├── Admin.js
│   └── Order.js
├── controllers/
│   ├── authController.js
│   └── orderController.js
├── middleware/
│   └── auth.js
├── routes/
│   ├── auth.js
│   └── orders.js
├── scripts/
│   └── createAdmin.js
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server.js
├── package.json
├── .env
├── .gitignore
├── README.md
└── API_DOCUMENTATION.md
```

---

## Environment Variables (.env)

Located in project root:

```env
MONGODB_URI=mongodb://localhost:27017/forexshipping
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Explanation:
- **MONGODB_URI** - Local MongoDB connection string
- **JWT_SECRET** - Secret key for token signing (change in production!)
- **PORT** - Backend server port
- **NODE_ENV** - Environment (development/production)

---

## Running the Application

### Terminal 1 - Backend
```bash
cd c:\Users\Iron Man\Downloads\fghfgh\Forex
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Terminal 2 - Frontend
```bash
cd c:\Users\Iron Man\Downloads\fghfgh\Forex\client
npm start
```

Expected output:
```
Compiled successfully!
You can now view forexshipping-admin-client in the browser.
Local:    http://localhost:3000
```

---

## First Time Usage

### 1. Login
Navigate to http://localhost:3000

Enter:
- Email: `admin@forexshipping.com`
- Password: `password123`

Click "Sign In"

### 2. Dashboard
You'll see:
- Total Orders count
- List of all orders (empty initially)
- Button to create new order

### 3. Create Order
Click "+ Create New Order" button

Fill in the form:
- **Customer Name**: Enter a name
- **Email**: Valid email address
- **Delivery Address**: Full address
- **State**: Select from dropdown (36 Indian states + Others)
- **Product**: Select from 7 products
- **Quantity**: Number of items

If you select "Others" for state, a text field appears for custom state.

Click "Create Order"

### 4. Success
You'll see:
- Success message with Tracking ID (e.g., FXS-4989C7922DE8)
- Redirects to Dashboard
- New order appears in the table

---

## API Testing with Postman

### 1. Import Collection
Create a new Postman collection or manually add requests:

### 2. Login Request
```
POST http://localhost:5000/api/auth/login

Body (JSON):
{
  "email": "admin@forexshipping.com",
  "password": "password123"
}
```

Copy the token from response.

### 3. Create Order Request
```
POST http://localhost:5000/api/orders

Headers:
Authorization: Bearer <PASTE_TOKEN_HERE>

Body (JSON):
{
  "customerName": "Test User",
  "email": "test@example.com",
  "deliveryAddress": "123 Test Street",
  "state": "Karnataka",
  "customState": null,
  "productName": "Macbook M4 Air",
  "quantity": 1
}
```

### 4. Get All Orders
```
GET http://localhost:5000/api/orders

Headers:
Authorization: Bearer <PASTE_TOKEN_HERE>
```

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Port 5000 Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change PORT in .env or kill process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Port 3000 Already in Use
Navigate to client directory and change in terminal:
```bash
PORT=3001 npm start
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:** Install dependencies
```bash
npm install
cd client && npm install
```

### CORS Error
If frontend can't reach backend, check:
1. Backend is running on port 5000
2. CORS is enabled in server.js
3. API URL in client/src/services/api.js

### JWT Token Expired
**Solution:** Login again to get a new token

### Tracking ID Not Unique
**Solution:** Rarely happens, but if duplicate is generated, database validation catches it and regenerates automatically

---

## Production Deployment

### Before Deploying:

1. **Change JWT Secret:**
   ```env
   JWT_SECRET=your_very_long_random_secret_key_min_32_chars
   ```

2. **Change Admin Password:**
   - Login to admin panel
   - (Add password change feature in future)

3. **Set NODE_ENV:**
   ```env
   NODE_ENV=production
   ```

4. **Update MONGODB_URI:**
   Use your MongoDB Atlas connection string or production database

5. **Update CORS:**
   In server.js, restrict to your domain:
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com'
   }));
   ```

### Deployment Options:
- **Heroku** - Easy for full MERN stack
- **AWS EC2** - More control, more complex
- **DigitalOcean** - Good balance
- **Vercel** (Frontend only) + any backend hosting

---

## Database Backup

### Manual Backup:
```bash
mongodump --db forexshipping --out ./backup
```

### Restore:
```bash
mongorestore --db forexshipping ./backup/forexshipping
```

---

## Development Tips

### Enable Hot Reload
Both frontend and backend support auto-reload:
- **Frontend:** Changes to React files auto-reload
- **Backend:** Uses nodemon for auto-restart

### Debug Mode
Add console.logs to track execution:

Backend (server.js):
```javascript
console.log('Creating order:', req.body);
```

Frontend (services/auth.js):
```javascript
console.log('API Response:', response.data);
```

### Database Inspection
Use MongoDB Compass or mongosh:
```bash
mongosh
> use forexshipping
> db.orders.find()
> db.admins.find()
```

---

## Additional Commands

### View Logs
```bash
# Backend
npm start

# Frontend
cd client && npm start
```

### Kill All Node Processes
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
pkill -f node
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

---

## Support & Documentation

- **API Docs:** See API_DOCUMENTATION.md
- **README:** See README.md
- **MongoDB Docs:** https://docs.mongodb.com/
- **Express Docs:** https://expressjs.com/
- **React Docs:** https://react.dev/

---

## Next Steps

After successful setup:

1. ✅ Create multiple admin accounts
2. ✅ Add more products if needed
3. ✅ Implement order status tracking
4. ✅ Add email notifications
5. ✅ Deploy to production
6. ✅ Set up automated backups
7. ✅ Add advanced analytics

---

**Last Updated:** April 14, 2026
**Version:** 1.0.0
