# API Documentation

Complete API reference for the Leave Management System.

## Base URL
```
http://localhost:5000
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Access:** Public

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64abc123def456789",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

**Validation Errors (400):**
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### 2. Create Leave Request

**POST** `/leaves`

Create a new leave request (Employee only).

**Access:** Employee

**Headers:**
```
Authorization: Bearer <employee_token>
```

**Request Body:**
```json
{
  "startDate": "2024-01-15",
  "endDate": "2024-01-20",
  "reason": "Family vacation to celebrate new year"
}
```

**Success Response (201):**
```json
{
  "message": "Leave request created successfully",
  "leave": {
    "_id": "64abc789def123456",
    "employee": {
      "_id": "64abc123def456789",
      "name": "Employee User",
      "email": "employee@example.com"
    },
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-01-20T00:00:00.000Z",
    "reason": "Family vacation to celebrate new year",
    "status": "pending",
    "totalDays": 6,
    "createdAt": "2024-01-10T10:30:00.000Z",
    "updatedAt": "2024-01-10T10:30:00.000Z"
  }
}
```

**Error Responses:**

*Unauthorized (401):*
```json
{
  "message": "Authentication required"
}
```

*Access Denied (403):*
```json
{
  "message": "Access denied. Employee only."
}
```

*Validation Error (400):*
```json
{
  "errors": [
    {
      "msg": "End date cannot be before start date",
      "param": "endDate",
      "location": "body"
    }
  ]
}
```

---

### 3. Get My Leaves

**GET** `/leaves/my-leaves`

Get employee's own leave history.

**Access:** Employee

**Headers:**
```
Authorization: Bearer <employee_token>
```

**Success Response (200):**
```json
{
  "leaves": [
    {
      "_id": "64abc789def123456",
      "employee": {
        "_id": "64abc123def456789",
        "name": "Employee User",
        "email": "employee@example.com"
      },
      "startDate": "2024-01-15T00:00:00.000Z",
      "endDate": "2024-01-20T00:00:00.000Z",
      "reason": "Family vacation",
      "status": "approved",
      "totalDays": 6,
      "approvedBy": {
        "_id": "64def456abc789123",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "approvedAt": "2024-01-11T14:20:00.000Z",
      "createdAt": "2024-01-10T10:30:00.000Z",
      "updatedAt": "2024-01-11T14:20:00.000Z"
    }
  ]
}
```

---

### 4. Get All Leaves

**GET** `/leaves/all`

Get all leave requests from all employees (Admin only).

**Access:** Admin

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "leaves": [
    {
      "_id": "64abc789def123456",
      "employee": {
        "_id": "64abc123def456789",
        "name": "Employee User",
        "email": "employee@example.com"
      },
      "startDate": "2024-01-15T00:00:00.000Z",
      "endDate": "2024-01-20T00:00:00.000Z",
      "reason": "Family vacation",
      "status": "pending",
      "totalDays": 6,
      "createdAt": "2024-01-10T10:30:00.000Z",
      "updatedAt": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

**Error Response (403):**
```json
{
  "message": "Access denied. Admin only."
}
```

---

### 5. Update Leave Status

**PUT** `/leaves/:id/status`

Approve or reject a leave request (Admin only).

**Access:** Admin

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameters:**
- `id` (string): Leave request ID

**Request Body:**
```json
{
  "status": "approved"
}
```

*Note: status must be either "approved" or "rejected"*

**Success Response (200):**
```json
{
  "message": "Leave request approved successfully",
  "leave": {
    "_id": "64abc789def123456",
    "employee": {
      "_id": "64abc123def456789",
      "name": "Employee User",
      "email": "employee@example.com"
    },
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-01-20T00:00:00.000Z",
    "reason": "Family vacation",
    "status": "approved",
    "totalDays": 6,
    "approvedBy": {
      "_id": "64def456abc789123",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "approvedAt": "2024-01-11T14:20:00.000Z",
    "createdAt": "2024-01-10T10:30:00.000Z",
    "updatedAt": "2024-01-11T14:20:00.000Z"
  }
}
```

**Error Responses:**

*Not Found (404):*
```json
{
  "message": "Leave request not found"
}
```

*Already Processed (400):*
```json
{
  "message": "Leave request already processed"
}
```

*Validation Error (400):*
```json
{
  "errors": [
    {
      "msg": "Status must be either approved or rejected",
      "param": "status",
      "location": "body"
    }
  ]
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Validation Error) |
| 401 | Unauthorized (Authentication Required) |
| 403 | Forbidden (Insufficient Permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Data Models

### User
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  role: 'employee' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Leave
```typescript
{
  _id: ObjectId,
  employee: ObjectId (ref: User),
  startDate: Date,
  endDate: Date,
  reason: string,
  status: 'pending' | 'approved' | 'rejected',
  totalDays: number,
  approvedBy: ObjectId (ref: User) | null,
  approvedAt: Date | null,
  createdAt: Date,
  updatedAt: Date
}
```

### AuditLog
```typescript
{
  _id: ObjectId,
  admin: ObjectId (ref: User),
  leave: ObjectId (ref: Leave),
  action: 'approved' | 'rejected',
  message: string,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"employee@example.com","password":"employee123"}'
```

### Create Leave
```bash
curl -X POST http://localhost:5000/leaves \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "reason": "Family vacation to celebrate new year"
  }'
```

### Get My Leaves
```bash
curl -X GET http://localhost:5000/leaves/my-leaves \
  -H "Authorization: Bearer <your_token>"
```

### Get All Leaves (Admin)
```bash
curl -X GET http://localhost:5000/leaves/all \
  -H "Authorization: Bearer <admin_token>"
```

### Update Leave Status (Admin)
```bash
curl -X PUT http://localhost:5000/leaves/<leave_id>/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin_token>" \
  -d '{"status": "approved"}'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production use.

## Versioning

Current API Version: 1.0.0

Future versions will be prefixed: `/api/v2/...`

