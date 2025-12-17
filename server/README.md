# Backend Server

This is the backend server for the Leave Management System built with Node.js, Express.js, and MongoDB.

## Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── leaveController.js   # Leave management logic
├── middleware/
│   ├── auth.js              # JWT authentication & authorization
│   └── validation.js        # Request validation rules
├── models/
│   ├── User.js              # User model (Employee/Admin)
│   ├── Leave.js             # Leave request model
│   └── AuditLog.js          # Audit log model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── leaves.js            # Leave management routes
├── seeders/
│   └── adminSeeder.js       # Database seeder script
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies and scripts
└── server.js               # Main server file
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_jwt_secret_key
```

## Available Scripts

### Start Server
```bash
npm start
```

### Development Mode (with nodemon)
```bash
npm run dev
```

### Seed Database
```bash
npm run seed
```

## API Endpoints

### Authentication
- `POST /auth/login` - Login

### Leaves
- `POST /leaves` - Create leave (Employee)
- `GET /leaves/my-leaves` - Get own leaves (Employee)
- `GET /leaves/all` - Get all leaves (Admin)
- `PUT /leaves/:id/status` - Update leave status (Admin)

## Models

### User
- name: String
- email: String (unique)
- password: String (hashed)
- role: String (employee/admin)

### Leave
- employee: ObjectId (ref: User)
- startDate: Date
- endDate: Date
- reason: String
- status: String (pending/approved/rejected)
- totalDays: Number
- approvedBy: ObjectId (ref: User)
- approvedAt: Date

### AuditLog
- admin: ObjectId (ref: User)
- leave: ObjectId (ref: Leave)
- action: String (approved/rejected)
- message: String

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Input validation and sanitization
- CORS enabled

## Business Logic

- Automatic calculation of total leave days
- Date validation (end date >= start date)
- Status workflow: pending → approved/rejected
- Audit logging for admin actions

