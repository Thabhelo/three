import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllApplications, getApplicationStats, updateApplicationStatus } from '../api/applications';
import { supabase } from '../lib/supabase';

// Admin Authentication Component
const AdminAuth = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        onAuthenticated(data.user);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-black text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600">DreamSprint Dashboard</p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              placeholder="admin@dreamsprint.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              placeholder="••••••••"
              required
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, color, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.6, type: "spring" }}
    className={`${color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
    whileHover={{ scale: 1.02, y: -2 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold opacity-80">{title}</p>
        <motion.p
          className="text-3xl font-black mt-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
        >
          {value}
        </motion.p>
      </div>
      <div className="text-3xl opacity-60">{icon}</div>
    </div>
  </motion.div>
);

// Application Row Component
const ApplicationRow = ({ app, onStatusUpdate, index, onViewDetails }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      await updateApplicationStatus(app.id, newStatus);
      onStatusUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'under_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'waitlisted': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="font-semibold text-gray-900">{app.full_name}</div>
        <div className="text-sm text-gray-500">{app.occupation || 'Not specified'}</div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <div className="text-gray-900">{app.email}</div>
        <div className="text-sm text-gray-500">{app.phone}</div>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 text-center">
        <span className="font-semibold text-gray-900">{app.age || 'N/A'}</span>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(app.status)}`}>
          {app.status.replace('_', ' ').toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">
        {new Date(app.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <select
          value={app.status}
          onChange={(e) => handleStatusUpdate(e.target.value)}
          disabled={isUpdating}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:opacity-50"
        >
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="waitlisted">Waitlisted</option>
        </select>
      </td>
      <td className="px-6 py-4 border-b border-gray-200">
        <motion.button
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewDetails(app)}
        >
          View Details
        </motion.button>
      </td>
    </motion.tr>
  );
};

// Application Details Modal
const ApplicationDetailsModal = ({ app, isOpen, onClose }) => {
  if (!isOpen || !app) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Personal Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Full Name:</span> {app.full_name}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Email:</span> {app.email}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Phone:</span> {app.phone}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Age Range:</span> {app.age || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Sex:</span> {app.sex || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Gender Identity:</span> {app.gender_identity || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Location:</span> {app.location || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Preferred Chat:</span> {app.preferred_chat || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Occupation:</span> {app.occupation || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">School/Company:</span> {app.school_or_company || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">LinkedIn:</span> {app.linkedin || 'Not provided'}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Social Media:</span> {app.social || 'Not provided'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Application Status</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Status:</span> {app.status?.replace('_', ' ').toUpperCase()}</p>
                  <p className="text-gray-800"><span className="font-medium text-gray-900">Applied:</span> {new Date(app.created_at).toLocaleDateString()}</p>
                  {app.reviewed_at && (
                    <p className="text-gray-800"><span className="font-medium text-gray-900">Reviewed:</span> {new Date(app.reviewed_at).toLocaleDateString()}</p>
                  )}
                  {app.admin_notes && (
                    <p className="text-gray-800"><span className="font-medium text-gray-900">Admin Notes:</span> {app.admin_notes}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Brag Zone */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Brag Zone</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Achievements</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.achievements || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">What makes you a great housemate?</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.great_housemate || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* The Project */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">The Project</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Project Description</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.project_description || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">What does "done" look like?</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.project_done_look_like || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Why is this important?</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.project_importance || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Tools & Technologies</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.project_tools || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Work Style */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Work Style</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Work Experience</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.work_experience || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Focus Method</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.focus_method || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Sleep Commitment</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.sleep_commitment || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Ideal Sleep Schedule</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.ideal_sleep || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Planning Input */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Planning & Logistics</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Availability</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.availability || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Miami OK?</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.miami_ok || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Cost Saving Ideas</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.cost_saving_ideas || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Dietary Restrictions</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.dietary_restrictions || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Filming Permission</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.filming_permission ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Consent & Commitments</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-800"><span className="font-medium text-gray-900">Commitment Checkbox:</span> {app.commitment_checkbox ? 'Agreed' : 'Not agreed'}</p>
                <p className="text-gray-800"><span className="font-medium text-gray-900">Not a Vacation Checkbox:</span> {app.not_vacation_checkbox ? 'Agreed' : 'Not agreed'}</p>
                <p className="text-gray-800"><span className="font-medium text-gray-900">Liability Checkbox:</span> {app.liability_checkbox ? 'Agreed' : 'Not agreed'}</p>
              </div>
            </div>

            {/* Final Notes */}
            {app.anything_else && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b pb-1">Additional Notes</h3>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{app.anything_else}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [appsData, statsData] = await Promise.all([
        getAllApplications({ 
          status: filterStatus === 'all' ? null : filterStatus 
        }),
        getApplicationStats()
      ]);
      setApplications(appsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedApp(null);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (!user) {
    return <AdminAuth onAuthenticated={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-gray-900">DreamSprint Admin</h1>
              <p className="text-gray-600 mt-1">Application Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Applications"
              value={stats.total_applications || 0}
              color="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M9 8h6m-9 8V8a2 2 0 012-2h8a2 2 0 012 2v12l-4-2-4 2-4-2z" /></svg>}
              delay={0}
            />
            <StatsCard
              title="Accepted"
              value={stats.accepted || 0}
              color="bg-gradient-to-br from-green-500 to-green-600 text-white"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
              delay={0.1}
            />
            <StatsCard
              title="Under Review"
              value={stats.under_review || 0}
              color="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              delay={0.2}
            />
            <StatsCard
              title="Age Ranges"
              value={stats.total_applications ? stats.total_applications : 0}
              color="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-4m-4 5H3v-2a3 3 0 013-3h4m0 0a3 3 0 100-6 3 3 0 000 6zm8-3a3 3 0 10-6 0" /></svg>}
              delay={0.3}
            />
          </div>
        )}

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="waitlisted">Waitlisted</option>
              </select>
              <motion.button
                onClick={loadData}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Refresh
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">
              Applications ({filteredApplications.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <motion.div
                className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-4 text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-xl font-semibold">No applications found</p>
              <p className="mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Age Range
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Applied
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app, index) => (
                    <ApplicationRow
                      key={app.id}
                      app={app}
                      onStatusUpdate={loadData}
                      onViewDetails={handleViewDetails}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Application Details Modal */}
      <ApplicationDetailsModal
        app={selectedApp}
        isOpen={showDetailsModal}
        onClose={closeDetailsModal}
      />
    </div>
  );
};

export default AdminDashboard;