const express = require('express');
const router = express.Router();
const {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require('../controllers/leaveController');
const { authenticate, isAdmin, isEmployee } = require('../middleware/auth');
const { leaveValidation, statusValidation, validate } = require('../middleware/validation');

// POST /leaves - (Employee only) Create a leave request
router.post('/', authenticate, isEmployee, leaveValidation, validate, createLeave);

// GET /leaves/my-leaves - (Employee only) Get their own history
router.get('/my-leaves', authenticate, isEmployee, getMyLeaves);

// GET /leaves/all - (Admin only) Get all requests
router.get('/all', authenticate, isAdmin, getAllLeaves);

// PUT /leaves/:id/status - (Admin only) Update status
router.put('/:id/status', authenticate, isAdmin, statusValidation, validate, updateLeaveStatus);

module.exports = router;

