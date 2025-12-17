# Employee Leave Management System

A full-stack web application for managing employee leave requests with role-based access control for Employees and Administrators.

## 🚀 Features

### Backend (Node.js + Express + MongoDB)
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Using bcrypt for secure password storage
- **Role-Based Authorization**: Employee and Admin roles with different permissions
- **RESTful API**: Clean and well-structured API endpoints
- **Input Validation**: Using express-validator for request validation
- **Audit Logging**: Track all admin actions on leave requests
- **Business Logic**: Automatic calculation of total leave days and date validation

### Frontend (React.js)
- **Login System**: Simple and secure login interface
- **Employee Dashboard**: Apply for leave and view personal leave history
- **Admin Dashboard**: View all leave requests and approve/reject them
- **Responsive Design**: Bootstrap-based UI that works on all devices

## 📋 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Express-validator
- Cors
- Dotenv

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5

## 📂 Project Structure

```
leave-management-system/
├── server/                 # Backend application
│   ├── config/            # Database configuration
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication & validation middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── seeders/           # Database seeders
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server entry point
│
├── client/                # Frontend application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── App.js         # Main App component
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
│
└── README.md             # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd leave-management-system
```

### Step 2: Setup Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leave-management
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

4. Start MongoDB service:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

5. Seed the database with default users:
```bash
npm run seed
```

This will create:
- **Admin Account**: 
  - Email: `admin@example.com`
  - Password: `admin123`
- **Employee Account**: 
  - Email: `employee@example.com`
  - Password: `employee123`

6. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Step 3: Setup Frontend

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 🔑 Default Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

### Employee Account
- **Email**: employee@example.com
- **Password**: employee123

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/login` | Login for Admin/Employee | Public |

### Leave Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/leaves` | Create a leave request | Employee |
| GET | `/leaves/my-leaves` | Get own leave history | Employee |
| GET | `/leaves/all` | Get all leave requests | Admin |
| PUT | `/leaves/:id/status` | Approve/Reject leave | Admin |

### Request/Response Examples

#### Login Request
```json
POST /auth/login
{
  "email": "employee@example.com",
  "password": "employee123"
}
```

#### Login Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123...",
    "name": "Employee User",
    "email": "employee@example.com",
    "role": "employee"
  }
}
```

#### Create Leave Request
```json
POST /leaves
Headers: Authorization: Bearer <token>
{
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "reason": "Family vacation to celebrate new year"
}
```

#### Update Leave Status
```json
PUT /leaves/:id/status
Headers: Authorization: Bearer <admin-token>
{
  "status": "approved"  // or "rejected"
}
```

## 🎯 Features Implemented

### ✅ Backend Requirements
- [x] JWT-based authentication
- [x] Password hashing using bcrypt
- [x] Role-based authorization (Employee & Admin)
- [x] All required API endpoints
- [x] Date validation (End date not before Start date)
- [x] Automatic calculation of Total Days

### ✅ Frontend Requirements
- [x] Login page with email/password form
- [x] Employee Dashboard with "Apply Leave" and leave history table
- [x] Admin Dashboard with all leave requests and Approve/Reject buttons
- [x] Bootstrap-based UI

### ✅ Advanced Requirements (Bonus)
- [x] Input validation using express-validator
- [x] Audit logging for admin actions
- [x] Database seeder script for admin account

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based authentication with expiration
2. **Password Hashing**: Passwords are hashed using bcrypt before storage
3. **Authorization Middleware**: Role-based access control
4. **Input Validation**: All inputs are validated and sanitized
5. **Error Handling**: Proper error messages without exposing sensitive information

## 🧪 Testing the Application

### As an Employee:
1. Login with employee credentials
2. Click "Apply Leave" button
3. Fill in the leave request form (Start Date, End Date, Reason)
4. Submit the form
5. View your leave history in the table below

### As an Admin:
1. Login with admin credentials
2. View all leave requests from employees
3. Filter requests by status (All/Pending/Approved/Rejected)
4. Click "Approve" or "Reject" buttons for pending requests
5. See the updated status immediately

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check MongoDB URI in `.env` file
- Try connecting to MongoDB using MongoDB Compass

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: React will automatically suggest another port

### CORS Issues
- Ensure the backend CORS middleware is properly configured
- Check that API requests are being sent to the correct URL

## 📝 Business Logic

### Leave Days Calculation
The system automatically calculates the total number of leave days:
- Includes both start and end dates
- Formula: `(endDate - startDate) + 1 day`

### Date Validation
- End date cannot be before start date
- Validation happens both on frontend and backend

### Leave Status Workflow
1. **Pending**: Initial status when employee creates a request
2. **Approved**: Admin approves the request
3. **Rejected**: Admin rejects the request

### Audit Logging
Every admin action is logged with:
- Admin who performed the action
- Leave request ID
- Action type (approved/rejected)
- Timestamp
- Descriptive message

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
cd server
heroku create your-app-name-backend
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
heroku config:set JWT_SECRET=<your-secret-key>
git push heroku main
```

### Frontend Deployment (Example: Netlify)
```bash
cd client
npm run build
# Deploy the build folder to Netlify
```

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as part of a Software Engineer (Backend Focused) assignment.

## 🙏 Acknowledgments

- Express.js for the backend framework
- React.js for the frontend library
- MongoDB for the database
- Bootstrap for the UI components

