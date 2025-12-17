# Frontend Client

This is the frontend client for the Leave Management System built with React.js.

## Structure

```
client/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── AdminDashboard.js     # Admin dashboard component
│   │   ├── EmployeeDashboard.js  # Employee dashboard component
│   │   ├── Login.js              # Login component
│   │   └── Navbar.js             # Navigation bar component
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── App.js               # Main App component
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── .gitignore
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Available Scripts

### Start Development Server
```bash
npm start
```
Runs on [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```
Creates optimized production build in `build/` folder

### Run Tests
```bash
npm test
```

## Components

### Login
- Simple login form
- Email and password validation
- Displays test credentials
- Redirects based on user role

### EmployeeDashboard
- Apply for leave button
- Leave application form
- Personal leave history table
- Status badges (pending/approved/rejected)

### AdminDashboard
- View all leave requests
- Filter by status (all/pending/approved/rejected)
- Approve/Reject actions
- Employee information display

### Navbar
- Display user name and role
- Logout functionality

## API Integration

The frontend uses Axios to communicate with the backend API:

- Base URL: `http://localhost:5000`
- Authentication: JWT token in Authorization header
- Automatic token injection using interceptors

## Styling

- Bootstrap 5 for UI components
- Custom CSS for additional styling
- Responsive design for all screen sizes

## State Management

- React hooks (useState, useEffect)
- Local storage for authentication persistence
- React Router for navigation

## Authentication Flow

1. User enters credentials on login page
2. API returns JWT token and user data
3. Token and user data stored in localStorage
4. Token included in all subsequent API requests
5. User redirected to appropriate dashboard
6. On logout, token and user data cleared

## Environment Variables

Create `.env` file for custom API URL:
```env
REACT_APP_API_URL=http://localhost:5000
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

