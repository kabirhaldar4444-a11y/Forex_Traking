# Quick Reference Commands

## 🚀 Starting the Project

### Terminal 1 - Backend
```bash
cd c:\Users\Iron Man\Downloads\fghfgh\Forex
npm install          # First time only
npm start            # Starts on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd c:\Users\Iron Man\Downloads\fghfgh\Forex\client
npm install          # First time only
npm start            # Starts on http://localhost:3000
```

### Terminal 3 - MongoDB
```bash
mongod              # Starts MongoDB (if not as service)
```

---

## 🔑 Login Credentials

**Email:** admin@forexshipping.com
**Password:** password123

---

## 📱 Application URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **MongoDB:** mongodb://localhost:27017/forexshipping

---

## 🛠️ First-Time Setup

```bash
# 1. Install backend dependencies
cd c:\Users\Iron Man\Downloads\fghfgh\Forex
npm install

# 2. Create default admin user
node scripts/createAdmin.js

# 3. Start MongoDB (if not auto-starting)
mongod

# 4. Start backend
npm start

# 5. In new terminal, install frontend dependencies
cd client
npm install

# 6. Start frontend
npm start
```

---

## 📋 Common Tasks

### View All Orders
```javascript
// In browser console (Frontend):
const response = await fetch('http://localhost:5000/api/orders', {
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});
const data = await response.json();
console.log(data.orders);
```

### Create Order via API
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "deliveryAddress": "123 Main St",
    "state": "Karnataka",
    "productName": "Macbook M4 Air",
    "quantity": 1
  }'
```

### Check Database
```bash
mongosh
> use forexshipping
> db.orders.find().pretty()
> db.admins.find().pretty()
```

### Create New Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newadmin@forexshipping.com",
    "password": "securepassword123",
    "name": "New Admin"
  }'
```

---

## 🐛 Troubleshooting Commands

### Check if Node is running
```bash
node -v
npm -v
```

### Check if MongoDB is running
```bash
mongosh
> db.version()
> exit
```

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :5000
lsof -i :3000
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
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

## 📊 Database Commands

### Backup
```bash
mongodump --db forexshipping --out ./backup
```

### Restore
```bash
mongorestore --db forexshipping ./backup/forexshipping
```

### Drop Database
```bash
mongosh
> use forexshipping
> db.dropDatabase()
```

### Count Orders
```bash
mongosh
> use forexshipping
> db.orders.countDocuments()
```

### Find Order by Tracking ID
```bash
mongosh
> use forexshipping
> db.orders.findOne({trackingId: "FXS-4989C7922DE8"})
```

---

## 🔍 Testing Endpoints with Postman

### 1. Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@forexshipping.com",
  "password": "password123"
}
```

### 2. Get All Orders
```
GET http://localhost:5000/api/orders
Authorization: Bearer <TOKEN>
```

### 3. Create Order
```
POST http://localhost:5000/api/orders
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "customerName": "Jayanta Basak",
  "email": "jayanta@gmail.com",
  "deliveryAddress": "404A Block 1",
  "state": "Karnataka",
  "productName": "Macbook M4 Air",
  "quantity": 1
}
```

### 4. Get Order by Tracking ID
```
GET http://localhost:5000/api/orders/tracking/FXS-4989C7922DE8
```

### 5. Update Order Status
```
PUT http://localhost:5000/api/orders/<ORDER_ID>
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "status": "In Transit"
}
```

### 6. Delete Order
```
DELETE http://localhost:5000/api/orders/<ORDER_ID>
Authorization: Bearer <TOKEN>
```

---

## 📁 File Edit Locations

### Add New State
File: `client/src/constants/index.js`
```javascript
export const INDIAN_STATES = [
  // ... existing states
  'New State Name'  // Add here
];
```

### Add New Product
File: `client/src/constants/index.js`
```javascript
export const PRODUCTS = [
  // ... existing products
  'New Product Name'  // Add here
];
```

### Change API URL
File: `client/src/services/api.js`
```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

### Change Port
File: `.env`
```env
PORT=5001  # Change from 5000
```

### Change JWT Secret
File: `.env`
```env
JWT_SECRET=your_new_secret_key
```

---

## 🎨 Styling Locations

### Update Colors
- Login CSS: `client/src/styles/Login.css`
- Dashboard CSS: `client/src/styles/Dashboard.css`
- Create Order CSS: `client/src/styles/CreateOrder.css`

Replace `#0052cc` with your color:
```css
.button {
  color: #0052cc;  /* Change this */
}
```

---

## 📝 Environment Variables

### Development (.env)
```env
MONGODB_URI=mongodb://localhost:27017/forexshipping
JWT_SECRET=dev_secret_key
PORT=5000
NODE_ENV=development
```

### Production (.env.production)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/forexshipping
JWT_SECRET=production_secret_key_min_32_chars
PORT=5000
NODE_ENV=production
```

---

## 🚀 Build & Deploy Commands

### Build Frontend
```bash
cd client
npm run build
```

Output: `client/build/` directory

### Deploy Backend to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create forexshipping-admin

# Set environment variables
heroku config:set JWT_SECRET=production_secret
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main
```

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET before deploying
- [ ] Change admin password
- [ ] Update MONGODB_URI to production database
- [ ] Enable HTTPS on frontend
- [ ] Restrict CORS to specific domain
- [ ] Add rate limiting
- [ ] Enable HTTPS on backend
- [ ] Set NODE_ENV to production
- [ ] Remove console.logs from production code
- [ ] Test error handling

---

## 📞 Quick Support

### Can't Connect to MongoDB?
```bash
# Check if mongod is running
mongosh

# If fails, start MongoDB
mongod
```

### Backend Won't Start?
```bash
# Check dependencies
npm install

# Check Node version
node -v  # Should be v14+

# Check port
netstat -ano | findstr :5000
```

### Frontend Won't Start?
```bash
# Check dependencies
cd client && npm install

# Clear cache
npm cache clean --force

# Check port
netstat -ano | findstr :3000
```

### Wrong Tracking ID Format?
Check: `models/Order.js` line with `generateTrackingId()`

---

## 🎯 Development Workflow

1. Make changes to code
2. Backend auto-restarts (nodemon)
3. Frontend auto-reloads
4. Test in browser
5. Commit changes
6. Repeat

---

## 📊 Project Stats

- **Backend Files:** 13
- **Frontend Files:** 14
- **Total Lines of Code:** ~2000+
- **API Endpoints:** 9
- **Database Collections:** 2
- **Indian States:** 36
- **Products:** 7
- **Authentication:** JWT

---

## 🎓 Learning Resources

- Express.js: https://expressjs.com/
- React: https://react.dev/
- MongoDB: https://docs.mongodb.com/
- JWT: https://jwt.io/
- Axios: https://axios-http.com/

---

## ✨ Pro Tips

1. **Use Postman** - Test APIs without frontend
2. **MongoDB Compass** - Visual database management
3. **React DevTools** - Debug frontend easily
4. **Chrome DevTools** - Network, Console, Debugger
5. **Thunder Client** - Lightweight API testing in VS Code

---

**Last Updated:** April 14, 2026
**Version:** 1.0.0
