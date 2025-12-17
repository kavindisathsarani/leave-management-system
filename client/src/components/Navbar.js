import React from 'react';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand">Leave Management System</span>
        <div className="d-flex align-items-center">
          <span className="text-white me-3">
            Welcome, {user.name} ({user.role})
          </span>
          <button className="btn btn-outline-light" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

