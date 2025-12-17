import React, { useState, useEffect } from 'react';
import { getAllLeaves, updateLeaveStatus } from '../services/api';

function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await getAllLeaves();
      setLeaves(response.leaves);
    } catch (err) {
      setError('Failed to fetch leaves');
    }
  };

  const handleStatusUpdate = async (leaveId, status) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await updateLeaveStatus(leaveId, status);
      setSuccess(`Leave request ${status} successfully!`);
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${status} leave request`);
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

  const filteredLeaves = leaves.filter((leave) => {
    if (filter === 'all') return true;
    return leave.status === filter;
  });

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      
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
        <label className="form-label me-2">Filter by Status:</label>
        <div className="btn-group" role="group">
          <button
            type="button"
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            className={`btn ${filter === 'approved' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
          <button
            type="button"
            className={`btn ${filter === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">All Leave Requests</h5>
          {filteredLeaves.length === 0 ? (
            <p className="text-muted">No leave requests found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.employee.name}</td>
                      <td>{formatDate(leave.startDate)}</td>
                      <td>{formatDate(leave.endDate)}</td>
                      <td>{leave.totalDays}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(leave.status)}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td>
                        {leave.status === 'pending' ? (
                          <div className="btn-group btn-group-sm" role="group">
                            <button
                              className="btn btn-success"
                              onClick={() => handleStatusUpdate(leave._id, 'approved')}
                              disabled={loading}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleStatusUpdate(leave._id, 'rejected')}
                              disabled={loading}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted">
                            {leave.status} by {leave.approvedBy?.name}
                          </span>
                        )}
                      </td>
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

export default AdminDashboard;

