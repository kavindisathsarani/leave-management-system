# Quick Setup Guide

This guide will help you get the Leave Management System up and running in minutes.

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (check: `node --version`)
- ✅ MongoDB installed and running (check: `mongod --version`)
- ✅ npm installed (check: `npm --version`)

## Quick Start (5 Minutes)

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=supersecretkey123456789
```

### 3. Start MongoDB
```bash
# Windows (run as Administrator)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 4. Seed Database
```bash
# Still in the server folder
npm run seed
```

Expected output:
```
Connected to MongoDB
Admin user created successfully
Email: admin@example.com
Password: admin123
Employee user created successfully
Email: employee@example.com
Password: employee123
```

### 5. Start Backend Server
```bash
npm start
```

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### 6. Install Frontend Dependencies (New Terminal)
```bash
cd client
npm install
```

### 7. Start Frontend
```bash
npm start
```

Browser will automatically open at `http://localhost:3000`

## Test the Application

### Test as Employee
1. Login with:
   - Email: `employee@example.com`
   - Password: `employee123`
2. Click "Apply Leave"
3. Fill the form and submit
4. See your leave in the history table

### Test as Admin
1. Logout and login with:
   - Email: `admin@example.com`
   - Password: `admin123`
2. See all leave requests
3. Click "Approve" or "Reject" on pending requests

## Troubleshooting

### Issue: MongoDB not running
```bash
# Check if MongoDB is running
ps aux | grep mongod  # macOS/Linux
tasklist | findstr mongod  # Windows
```

### Issue: Port 5000 already in use
Change `PORT=5001` in the `.env` file

### Issue: Port 3000 already in use
React will ask if you want to use another port (press Y)

### Issue: Cannot connect to backend
- Check if backend is running on port 5000
- Check console for any errors
- Verify `.env` file exists in server folder

## What's Next?

- Explore the API endpoints using tools like Postman
- Check the audit logs in the MongoDB database
- Customize the UI to match your preferences
- Add more features as needed

## Need Help?

Check the main README.md for detailed documentation and API references.

