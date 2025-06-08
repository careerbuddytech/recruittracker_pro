import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const UserFormModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'active',
    permissions: [],
    securityFlags: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        department: user.department || '',
        status: user.status || 'active',
        permissions: user.permissions || [],
        securityFlags: user.securityFlags || []
      });
    }
  }, [user]);

  const departments = [
    { id: 'recruitment', name: 'Recruitment' },
    { id: 'finance', name: 'Finance' },
    { id: 'it', name: 'IT' },
    { id: 'management', name: 'Management' }
  ];

  const roles = [
    { id: 'admin', name: 'System Administrator' },
    { id: 'finance_manager', name: 'Finance Manager' },
    { id: 'team_lead', name: 'Team Lead' },
    { id: 'senior_recruiter', name: 'Senior Recruiter' },
    { id: 'recruiter', name: 'Recruitment Consultant' }
  ];

  const permissions = [
    { id: 'full_access', name: 'Full Access', category: 'System' },
    { id: 'user_management', name: 'User Management', category: 'System' },
    { id: 'system_config', name: 'System Configuration', category: 'System' },
    { id: 'invoice_management', name: 'Invoice Management', category: 'Finance' },
    { id: 'financial_reports', name: 'Financial Reports', category: 'Finance' },
    { id: 'commission_calc', name: 'Commission Calculator', category: 'Finance' },
    { id: 'candidate_management', name: 'Candidate Management', category: 'Recruitment' },
    { id: 'client_communication', name: 'Client Communication', category: 'Recruitment' },
    { id: 'role_posting', name: 'Role Posting', category: 'Recruitment' },
    { id: 'team_management', name: 'Team Management', category: 'Management' },
    { id: 'performance_reports', name: 'Performance Reports', category: 'Management' }
  ];

  const securityOptions = [
    { id: 'mfa_enabled', name: 'Multi-Factor Authentication', description: 'Require MFA for login' },
    { id: 'admin_access', name: 'Administrative Access', description: 'Grant administrative privileges' },
    { id: 'api_access', name: 'API Access', description: 'Allow API key generation' },
    { id: 'audit_exempt', name: 'Audit Exempt', description: 'Exempt from audit logging' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(id => id !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleSecurityToggle = (flagId) => {
    setFormData(prev => ({
      ...prev,
      securityFlags: prev.securityFlags.includes(flagId)
        ? prev.securityFlags.filter(id => id !== flagId)
        : [...prev.securityFlags, flagId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = 'At least one permission is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              {user ? 'Edit User' : 'Create New User'}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {user ? 'Update user information and permissions' : 'Add a new user to the system'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-secondary-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-text-primary border-b border-border pb-2">
                  Basic Information
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.name ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-error mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-sm text-error mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.role ? 'border-error' : 'border-border'
                    }`}
                  >
                    <option value="">Select a role</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-sm text-error mt-1">{errors.role}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.department ? 'border-error' : 'border-border'
                    }`}
                  >
                    <option value="">Select a department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-sm text-error mt-1">{errors.department}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Permissions and Security */}
              <div className="space-y-4">
                <h3 className="font-medium text-text-primary border-b border-border pb-2">
                  Permissions & Security
                </h3>
                
                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Permissions *
                  </label>
                  {errors.permissions && (
                    <p className="text-sm text-error mb-2">{errors.permissions}</p>
                  )}
                  <div className="space-y-3 max-h-48 overflow-y-auto border border-border rounded-lg p-3">
                    {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-text-primary mb-2">{category}</h4>
                        <div className="space-y-1 ml-4">
                          {categoryPermissions.map(permission => (
                            <label key={permission.id} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.permissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                              />
                              <span className="text-sm text-text-primary">{permission.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Flags */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Security Settings
                  </label>
                  <div className="space-y-2">
                    {securityOptions.map(option => (
                      <label key={option.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.securityFlags.includes(option.id)}
                          onChange={() => handleSecurityToggle(option.id)}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500 mt-0.5"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{option.name}</p>
                          <p className="text-xs text-text-secondary">{option.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
            <div className="text-sm text-text-secondary">
              * Required fields
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-secondary-600 hover:text-text-primary transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  user ? 'Update User' : 'Create User'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;