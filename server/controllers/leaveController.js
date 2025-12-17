const Leave = require('../models/Leave');
const AuditLog = require('../models/AuditLog');

// Helper function to calculate total days
const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
  return diffDays;
};

// Create leave request (Employee only)
const createLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    // Calculate total days
    const totalDays = calculateTotalDays(startDate, endDate);

    // Create leave request
    const leave = new Leave({
      employee: req.userId,
      startDate,
      endDate,
      reason,
      totalDays
    });

    await leave.save();

    // Populate employee details
    await leave.populate('employee', 'name email');

    res.status(201).json({
      message: 'Leave request created successfully',
      leave
    });
  } catch (error) {
    console.error('Create leave error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get employee's own leave history
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.userId })
      .populate('employee', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (error) {
    console.error('Get my leaves error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all leave requests (Admin only)
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('employee', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (error) {
    console.error('Get all leaves error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update leave status (Admin only)
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find leave request
    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Check if already processed
    if (leave.status !== 'pending') {
      return res.status(400).json({ message: 'Leave request already processed' });
    }

    // Update leave status
    leave.status = status;
    leave.approvedBy = req.userId;
    leave.approvedAt = new Date();
    await leave.save();

    // Create audit log
    const auditLog = new AuditLog({
      admin: req.userId,
      leave: leave._id,
      action: status,
      message: `Admin ${req.user.name} ${status} leave request ${leave._id} at ${new Date().toISOString()}`
    });
    await auditLog.save();

    // Populate details
    await leave.populate('employee', 'name email');
    await leave.populate('approvedBy', 'name email');

    res.json({
      message: `Leave request ${status} successfully`,
      leave
    });
  } catch (error) {
    console.error('Update leave status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
};

