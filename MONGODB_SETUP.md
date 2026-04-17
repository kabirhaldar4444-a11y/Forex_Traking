# MongoDB Connection Setup Guide

## Current Status
Your `.env` has been updated to use **Local MongoDB** (Development)

```env
MONGODB_URI=mongodb://localhost:27017/forexshipping
```

---

## ✅ OPTION 1: Local MongoDB (Recommended for Development)

### Setup Instructions

#### Windows

1. **Start MongoDB Service:**
   ```bash
   # MongoDB should auto-start if installed as service
   # Check if running:
   mongosh
   ```

2. **Verify MongoDB is Running:**
   ```bash
   mongosh
   > db.version()
   > exit
   ```

3. **Run Backend:**
   ```bash
   cd c:\Users\Iron Man\Downloads\fghfgh\Forex
   npm start
   ```

#### Mac

```bash
# Start MongoDB
mongod

# Or with Homebrew
brew services start mongodb-community
```

#### Linux (Ubuntu)

```bash
# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## ⚠️ OPTION 2: MongoDB Atlas (Cloud - For Production)

### Setup Steps

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create free account

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Choose free tier
   - Select region
   - Click "Create"

3. **Create Database User:**
   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Username: `forexshipping_user`
   - Password: (Generate strong password)
   - Note: Save this password!
   - Click "Add User"

4. **Whitelist IP Address:**
   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for dev only!)
   - Click "Confirm"

5. **Get Connection String:**
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy connection string
   - Should look like:
   ```
   mongodb+srv://forexshipping_user:PASSWORD@cluster0.xxxx.mongodb.net/forexshipping?retryWrites=true&w=majority
   ```

6. **Update .env File:**
   ```env
   MONGODB_URI=mongodb+srv://forexshipping_user:YOUR_PASSWORD@cluster0.xxxx.mongodb.net/forexshipping?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

7. **Replace Placeholders:**
   - Replace `YOUR_PASSWORD` with the password you created
   - Replace `cluster0.xxxx` with your actual cluster name

---

## 🐛 Troubleshooting

### Error: "bad auth : authentication failed"

**Cause:** Wrong password in connection string

**Fix:**
1. Check your password is correct
2. Make sure you didn't copy special characters incorrectly
3. If using Atlas, re-generate the password:
   - Go to "Database Access"
   - Click three dots next to user
   - Select "Edit Password"
   - Generate new password
   - Update .env

### Error: "connect ECONNREFUSED 127.0.0.1:27017"

**Cause:** MongoDB isn't running

**Fix:**
- Windows: Check MongoDB service is running
- Mac: Run `brew services start mongodb-community`
- Linux: Run `sudo systemctl start mongod`

### Error: "MongoServerError: bad auth"

**Cause:** MongoDB Atlas credentials wrong

**Fix:**
```bash
# Verify connection string format
# Should be: mongodb+srv://USERNAME:PASSWORD@CLUSTER/DATABASE

# Common mistakes:
# ❌ Missing @
# ❌ Wrong password
# ❌ Special characters not URL encoded
# ✅ Use %40 for @ symbol
# ✅ Use %3A for : symbol
```

---

## 🔒 Security Notes

### Local Development (.env)
```env
MONGODB_URI=mongodb://localhost:27017/forexshipping
# No authentication needed for local
```

### Production (Atlas)
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER/DATABASE
# Keep this .env file secret!
# Never commit to Git!
```

### Special Characters in Password

If your password has special characters, URL encode them:
```
@  →  %40
:  →  %3A
!  →  %21
#  →  %23
$  →  %24
%  →  %25
&  →  %26
```

Example:
```
Password: my@password!123
Encoded: my%40password%21123
```

---

## ✅ Verify Setup

### Test Local MongoDB

```bash
# Open terminal
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true

# Exit
> exit
```

### Test Backend Connection

```bash
cd c:\Users\Iron Man\Downloads\fghfgh\Forex
npm start

# You should see:
# Server running on port 5000
# MongoDB connected successfully
```

### Create Default Admin

```bash
node scripts/createAdmin.js

# You should see:
# MongoDB connected
# Default admin created successfully
# Email: admin@forexshipping.com
# Password: password123
```

---

## 🚀 Quick Fix Steps (For You Right Now)

Since you're using local MongoDB:

1. **Ensure MongoDB is running:**
   ```bash
   mongosh
   ```
   Should connect without errors. If not, MongoDB isn't running.

2. **Start Backend:**
   ```bash
   cd c:\Users\Iron Man\Downloads\fghfgh\Forex
   npm start
   ```

3. **Create Admin:**
   ```bash
   node scripts/createAdmin.js
   ```

4. **Start Frontend:**
   ```bash
   cd client
   npm start
   ```

---

## 📝 .env File Reference

### Local Development
```env
MONGODB_URI=mongodb://localhost:27017/forexshipping
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### MongoDB Atlas Cloud
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/forexshipping?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Production
```env
MONGODB_URI=mongodb+srv://USERNAME:SECURE_PASSWORD@CLUSTER.mongodb.net/forexshipping?retryWrites=true&w=majority
JWT_SECRET=VERY_LONG_RANDOM_SECRET_MIN_32_CHARACTERS
PORT=5000
NODE_ENV=production
```

---

## 🎯 Recommended Setup

### For Development (Right Now)
✅ Use **Local MongoDB**
- Faster
- No internet needed
- Simpler setup
- Use the .env I provided

### For Production Deployment
✅ Use **MongoDB Atlas**
- Scalable
- Cloud backup
- No local infrastructure
- Secure with credentials

---

## 💡 Next Steps

1. Make sure MongoDB is running:
   ```bash
   mongosh
   ```

2. Start backend:
   ```bash
   npm start
   ```
   Should show: ✅ **MongoDB connected successfully**

3. If still getting errors, check:
   - Is MongoDB running?
   - Is .env file correct?
   - Any firewall issues?

---

**Your .env is now set to use Local MongoDB on localhost:27017**

**Try running now and let me know if it works! 🚀**
