import React, { useState, useEffect } from 'react';
import { getMyLeaves, createLeave } from '../services/api';

function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getMyLeaves();
      setLeaves(response.leaves);
    } catch (err) {
      setError('Failed to fetch leaves');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await createLeave(formData);
      setSuccess('Leave request submitted successfully!');
      setFormData({ startDate: '', endDate: '', reason: '' });
      setShowForm(false);
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      default:
        return 'bg-warning';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container mt-4">
      <h2>Employee Dashboard</h2>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}
      
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      <div className="mb-4">
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Apply Leave'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Apply for Leave</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="reason" className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  id="reason"
                  name="reason"
                  rows="3"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  minLength="10"
                  placeholder="Please provide a detailed reason (minimum 10 characters)"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Leave Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">My Leave History</h5>
          {leaves.length === 0 ? (
            <p className="text-muted">No leave requests found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Approved By</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{formatDate(leave.startDate)}</td>
                      <td>{formatDate(leave.endDate)}</td>
                      <td>{leave.totalDays}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td>{leave.approvedBy ? leave.approvedBy.name : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

