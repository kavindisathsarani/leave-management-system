const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Login validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Leave request validation rules
const leaveValidation = [
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((endDate, { req }) => {
      const start = new Date(req.body.startDate);
      const end = new Date(endDate);
      if (end < start) {
        throw new Error('End date cannot be before start date');
      }
      return true;
    }),
  body('reason')
    .notEmpty()
    .withMessage('Reason is required')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Reason must be at least 10 characters long')
];

// Status update validation rules
const statusValidation = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['approved', 'rejected'])
    .withMessage('Status must be either approved or rejected')
];

module.exports = {
  validate,
  loginValidation,
  leaveValidation,
  statusValidation
};

