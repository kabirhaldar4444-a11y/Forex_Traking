# 🚀 MongoDB Installation for Windows (Quick Guide)

## Status
MongoDB is **NOT currently installed** on your system.

---

## Option 1: Install MongoDB Community Edition (Recommended)

### Step 1: Download
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** 7.0 (or latest)
   - **Platform:** Windows x64
   - **Package:** MSI
3. Click **Download**

### Step 2: Install
1. Run the downloaded `.msi` file
2. Click **Next** through the installer
3. Accept License Agreement
4. Choose **Setup Type**: Select "Complete"
5. At "Service Configuration":
   - ✅ Install MongoDB as a Service
   - ✅ Run the service as Local or Network Service
6. At "MongoDB Compass":
   - ✅ Install MongoDB Compass (optional, helpful for viewing data)
7. Click **Install** and wait
8. Click **Finish**

### Step 3: Verify Installation
```bash
# Open PowerShell and run:
mongosh --version

# Should show version number like:
# mongosh 2.x.x
```

### Step 4: Start MongoDB
```bash
# MongoDB should start automatically as a Windows service
# Verify it's running:
mongosh

# Should show:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
# Tip: use "show dbs" to see list of databases
```

---

## Option 2: Use MongoDB Atlas (Cloud - No Installation)

If you don't want to install locally:

### Step 1: Create Account
- Go to: https://www.mongodb.com/cloud/atlas
- Sign up for free account

### Step 2: Create Cluster
- Click "Build a Cluster"
- Choose free tier (M0)
- Select region
- Click "Create"
- Wait 2-3 minutes

### Step 3: Create User
- Go to "Security" → "Database Access"
- Click "Add New Database User"
- Username: `admin`
- Password: Generate secure password (copy this!)
- Click "Add User"

### Step 4: Add IP
- Go to "Security" → "Network Access"
- Click "Add IP Address"
- Select "Allow Access from Anywhere"
- Click "Confirm"

### Step 5: Get Connection String
- Click "Connect" → "Connect your application"
- Copy the connection string
- Should look like:
```
mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Update .env
```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Replace:
- `YOUR_PASSWORD` with your password
- `cluster0.xxxxx` with your actual cluster URL

---

## ✅ Quick Fix Right Now

### Fastest Solution: Use MongoDB Atlas

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Create free account**
3. **Create free cluster** (takes 2-3 minutes)
4. **Get connection string** (see Step 5 above)
5. **Update .env** (see Step 6 above)
6. **Run backend:**
   ```bash
   npm start
   ```
   Should show: ✅ MongoDB connected successfully

---

## 🔧 If You Want Local MongoDB

### Windows Installation Steps:

1. **Download:** https://www.mongodb.com/try/download/community
2. **Run installer (.msi)**
3. **Accept defaults, click Next throughout**
4. **Make sure "Run as service" is checked**
5. **Click Install**
6. **Click Finish**
7. **Open PowerShell:**
   ```bash
   mongosh
   ```
   If it connects, you're done!

---

## 🎯 What to Do Now

### Option A: MongoDB Atlas (Quickest)
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create cluster (free)
3. Get connection string
4. Update .env with Atlas URI
5. Run `npm start`

### Option B: Install Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Click through with defaults
4. Verify: `mongosh` in PowerShell
5. Run `npm start`

---

## ✨ After MongoDB is Ready

```bash
# Test connection
mongosh

# Create admin user
node scripts/createAdmin.js

# Start backend
npm start

# In new terminal, start frontend
cd client
npm start
```

---

## 🆘 Troubleshooting

### "mongosh is not recognized"
→ MongoDB not installed or not in PATH
→ Solution: Reinstall MongoDB Community Edition

### "connect ECONNREFUSED"
→ MongoDB not running
→ Solution: Start MongoDB service or use Atlas

### "bad auth : authentication failed"
→ Wrong password in connection string
→ Solution: Check .env has correct credentials

---

## 📝 Current Status

✅ .env is set to LOCAL MongoDB
✅ Connection string ready: `mongodb://localhost:27017/forexshipping`
❌ MongoDB not installed yet

### Next Steps:
1. Choose Option A (Atlas) or Option B (Local)
2. Follow the steps
3. Test with `mongosh` command
4. Run `npm start`

---

**Choose your path and let me know if you need help! 🚀**
