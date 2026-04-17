# Project Directory Structure

```
📦 Forex (Root)
│
├── 📋 Documentation Files
│   ├── README.md                    ← Start here!
│   ├── SETUP_GUIDE.md               ← Setup instructions
│   ├── API_DOCUMENTATION.md         ← API reference
│   ├── PROJECT_SUMMARY.md           ← Project overview
│   └── QUICK_REFERENCE.md           ← This file
│
├── 📝 Configuration Files
│   ├── package.json                 ← Backend dependencies
│   ├── .env                         ← Environment variables
│   ├── .gitignore                   ← Git ignore rules
│   └── server.js                    ← Main server file
│
├── 📂 Backend - config/
│   └── database.js                  ← MongoDB connection
│
├── 📂 Backend - models/
│   ├── Admin.js                     ← Admin schema + password hashing
│   └── Order.js                     ← Order schema + tracking ID generation
│
├── 📂 Backend - controllers/
│   ├── authController.js            ← Login, Register, GetMe logic
│   └── orderController.js           ← CRUD operations for orders
│
├── 📂 Backend - middleware/
│   └── auth.js                      ← JWT verification middleware
│
├── 📂 Backend - routes/
│   ├── auth.js                      ← Authentication endpoints
│   └── orders.js                    ← Order endpoints
│
├── 📂 Backend - scripts/
│   └── createAdmin.js               ← Create default admin user
│
└── 📂 Frontend - client/
    │
    ├── 📝 package.json              ← Frontend dependencies
    │
    ├── 📂 public/
    │   └── index.html               ← HTML template
    │
    └── 📂 src/
        │
        ├── 📂 components/
        │   └── ProtectedRoute.js    ← Route protection wrapper
        │
        ├── 📂 constants/
        │   └── index.js             ← Indian states & products list
        │
        ├── 📂 pages/
        │   ├── Login.js             ← Login page (admin auth)
        │   ├── Dashboard.js         ← Dashboard (view orders)
        │   └── CreateOrder.js       ← Create order form
        │
        ├── 📂 services/
        │   ├── api.js               ← Axios API client
        │   └── auth.js              ← API service functions
        │
        ├── 📂 styles/
        │   ├── Login.css            ← Login page styling
        │   ├── Dashboard.css        ← Dashboard styling
        │   ├── CreateOrder.css      ← Order form styling
        │   └── index.css            ← Global styles
        │
        ├── App.js                   ← Main app routing
        └── index.js                 ← React entry point
```

---

## 📍 Quick Navigation Guide

### For Backend Development
```
config/database.js          ← MongoDB connection
  ↓
models/Order.js             ← Order data structure
models/Admin.js             ← Admin data structure
  ↓
controllers/orderController.js  ← Business logic
controllers/authController.js   ← Auth logic
  ↓
routes/orders.js            ← API endpoints
routes/auth.js              ← Auth endpoints
  ↓
middleware/auth.js          ← JWT protection
  ↓
server.js                   ← All wired together
```

### For Frontend Development
```
constants/index.js          ← States & products
  ↓
services/api.js             ← API setup
services/auth.js            ← API calls
  ↓
components/ProtectedRoute.js ← Route protection
  ↓
pages/Login.js              ← Login page
pages/Dashboard.js          ← Order list
pages/CreateOrder.js        ← Order form
  ↓
styles/                     ← Styling for each page
  ↓
App.js                      ← Routing
```

---

## 🎯 File Purposes Summary

### Backend Files
| File | Purpose |
|------|---------|
| server.js | Express server initialization |
| config/database.js | MongoDB connection setup |
| models/Admin.js | Admin user schema |
| models/Order.js | Order schema with tracking ID |
| controllers/authController.js | Authentication logic |
| controllers/orderController.js | Order CRUD logic |
| middleware/auth.js | JWT token verification |
| routes/auth.js | Authentication routes |
| routes/orders.js | Order API routes |
| scripts/createAdmin.js | Create default admin |

### Frontend Files
| File | Purpose |
|------|---------|
| App.js | Main routing component |
| index.js | React entry point |
| pages/Login.js | Admin login page |
| pages/Dashboard.js | Order list & stats |
| pages/CreateOrder.js | Order creation form |
| components/ProtectedRoute.js | Route authentication |
| services/api.js | Axios API client |
| services/auth.js | API methods |
| constants/index.js | Indian states & products |
| styles/Login.css | Login styling |
| styles/Dashboard.css | Dashboard styling |
| styles/CreateOrder.css | Form styling |

---

## 📊 Data Flow Diagram

### Order Creation Flow
```
User (Browser)
    ↓
CreateOrder.js (Form input)
    ↓
services/auth.js (createOrder API call)
    ↓
services/api.js (Axios request)
    ↓
Backend: routes/orders.js
    ↓
controllers/orderController.js (Validate & process)
    ↓
models/Order.js (Create document)
    ↓
MongoDB (Save with tracking ID)
    ↓
Response back to frontend
    ↓
Dashboard shows new order
```

### Authentication Flow
```
User (Browser)
    ↓
Login.js (Email/Password)
    ↓
services/auth.js (loginAdmin API call)
    ↓
services/api.js (Axios request)
    ↓
Backend: routes/auth.js
    ↓
controllers/authController.js (Verify credentials)
    ↓
models/Admin.js (Compare password)
    ↓
JWT Token generated
    ↓
Response with token
    ↓
localStorage (Store token)
    ↓
ProtectedRoute allows access
    ↓
Dashboard accessible
```

---

## 🔄 Modification Guide

### Want to Add a New State?
1. Open: `client/src/constants/index.js`
2. Find: `INDIAN_STATES` array
3. Add: `'New State Name'` to the array
4. Save and restart frontend

### Want to Add a New Product?
1. Open: `client/src/constants/index.js`
2. Find: `PRODUCTS` array
3. Add: `'New Product Name'` to the array
4. Also update: `models/Order.js` enum list
5. Save and restart both

### Want to Change Form Fields?
1. Edit: `client/src/pages/CreateOrder.js` (frontend form)
2. Update: `models/Order.js` (database schema)
3. Update: `controllers/orderController.js` (API logic)
4. Restart both servers

### Want to Change Colors?
1. Open CSS files in: `client/src/styles/`
2. Find: Color value (e.g., `#0052cc`)
3. Replace: With your color
4. Restart frontend

---

## 🧪 Testing Checklist

- [ ] MongoDB is running
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can login with default credentials
- [ ] Can see empty dashboard
- [ ] Can create new order
- [ ] Can see new order in dashboard
- [ ] Tracking ID appears in success message
- [ ] Can view order details
- [ ] Can logout
- [ ] After logout, redirects to login

---

## 📦 Dependencies Summary

### Backend (package.json)
- express - Web framework
- mongoose - MongoDB ORM
- bcryptjs - Password hashing
- jsonwebtoken - JWT tokens
- cors - Cross-origin
- dotenv - Environment vars
- uuid - Tracking IDs

### Frontend (client/package.json)
- react - UI library
- react-dom - React DOM
- react-router-dom - Routing
- axios - HTTP client

---

## 🔐 Security File Locations

| Security Feature | File |
|------------------|------|
| Password Hashing | models/Admin.js |
| JWT Verification | middleware/auth.js |
| Protected Routes | controllers/orderController.js |
| Token Storage | services/api.js |
| Route Protection | components/ProtectedRoute.js |
| CORS Policy | server.js |

---

## 📊 Database File Locations

| DB Operation | File |
|--------------|------|
| Connection | config/database.js |
| Admin Schema | models/Admin.js |
| Order Schema | models/Order.js |
| Tracking ID Gen | models/Order.js (pre-save hook) |
| Unique Index | models/Order.js |

---

## 🎨 UI File Locations

| Page | Files |
|------|-------|
| Login | pages/Login.js + styles/Login.css |
| Dashboard | pages/Dashboard.js + styles/Dashboard.css |
| Create Order | pages/CreateOrder.js + styles/CreateOrder.css |
| Navigation | App.js + components/ProtectedRoute.js |

---

## 📡 API Endpoint File Locations

| Endpoint Group | Files |
|----------------|-------|
| Authentication | routes/auth.js → controllers/authController.js |
| Orders | routes/orders.js → controllers/orderController.js |
| Middleware | middleware/auth.js |

---

## 🚀 Deployment Files

| File | Purpose |
|------|---------|
| .env | Environment configuration |
| package.json | Dependency specification |
| .gitignore | Git exclusions |
| README.md | Project documentation |
| server.js | Server entry point |
| client/package.json | Frontend dependencies |

---

## 💾 Configuration Files

```
.env                        # Environment variables
├── MONGODB_URI             # Database connection
├── JWT_SECRET              # Token signing key
├── PORT                    # Server port
└── NODE_ENV                # Environment type

.gitignore                  # Files to ignore in git
├── node_modules/
├── .env
├── build/
└── dist/
```

---

## 🎯 Key File Relationships

```
server.js (Entry point)
├── config/database.js (DB connection)
├── routes/auth.js → controllers/authController.js
│   └── models/Admin.js
├── routes/orders.js → controllers/orderController.js
│   ├── models/Order.js
│   └── middleware/auth.js
└── .env (Configuration)

client/src/App.js (Frontend entry)
├── pages/Login.js → services/auth.js
├── pages/Dashboard.js → services/auth.js
├── pages/CreateOrder.js → services/auth.js & constants/index.js
├── components/ProtectedRoute.js
└── services/api.js (API client)
```

---

## 📝 Code Statistics

- **Total Files:** 27
- **Backend Files:** 13
- **Frontend Files:** 14
- **Lines of Code:** 2000+
- **Documentation:** 5 files
- **Configuration:** 2 files

---

**Last Updated:** April 14, 2026
**Version:** 1.0.0
