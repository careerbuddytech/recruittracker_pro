import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ConfigurationPanel = ({ selectedUsers, onBulkAction }) => {
  const [activeTab, setActiveTab] = useState('roles');

  // Mock data for roles and permissions
  const roles = [
    {
      id: 'admin',
      name: 'System Administrator',
      description: 'Full system access and user management',
      permissions: ['full_access', 'user_management', 'system_config'],
      userCount: 1,
      color: 'bg-error-100 text-error-700'
    },
    {
      id: 'finance_manager',
      name: 'Finance Manager',
      description: 'Financial operations and reporting',
      permissions: ['invoice_management', 'financial_reports', 'commission_calc'],
      userCount: 1,
      color: 'bg-primary-100 text-primary-700'
    },
    {
      id: 'team_lead',
      name: 'Team Lead',
      description: 'Team management and performance tracking',
      permissions: ['team_management', 'performance_reports', 'candidate_management'],
      userCount: 1,
      color: 'bg-accent-100 text-accent-700'
    },
    {
      id: 'recruiter',
      name: 'Recruiter',
      description: 'Candidate and client management',
      permissions: ['candidate_management', 'client_communication', 'role_posting'],
      userCount: 2,
      color: 'bg-success-100 text-success-700'
    }
  ];

  const permissions = [
    { id: 'full_access', name: 'Full Access', category: 'System', description: 'Complete system access' },
    { id: 'user_management', name: 'User Management', category: 'System', description: 'Create and manage users' },
    { id: 'system_config', name: 'System Configuration', category: 'System', description: 'Configure system settings' },
    { id: 'invoice_management', name: 'Invoice Management', category: 'Finance', description: 'Create and manage invoices' },
    { id: 'financial_reports', name: 'Financial Reports', category: 'Finance', description: 'View financial analytics' },
    { id: 'commission_calc', name: 'Commission Calculator', category: 'Finance', description: 'Calculate commissions' },
    { id: 'candidate_management', name: 'Candidate Management', category: 'Recruitment', description: 'Manage candidate profiles' },
    { id: 'client_communication', name: 'Client Communication', category: 'Recruitment', description: 'Communicate with clients' },
    { id: 'role_posting', name: 'Role Posting', category: 'Recruitment', description: 'Post and manage job roles' },
    { id: 'team_management', name: 'Team Management', category: 'Management', description: 'Manage team members' },
    { id: 'performance_reports', name: 'Performance Reports', category: 'Management', description: 'View team performance' }
  ];

  const securityPolicies = [
    {
      id: 'password_policy',
      name: 'Password Policy',
      description: 'Minimum 8 characters, special characters required',
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'session_timeout',
      name: 'Session Timeout',
      description: 'Auto logout after 30 minutes of inactivity',
      status: 'active',
      lastUpdated: '2024-01-10'
    },
    {
      id: 'mfa_requirement',
      name: 'MFA Requirement',
      description: 'Multi-factor authentication for admin users',
      status: 'active',
      lastUpdated: '2024-01-20'
    },
    {
      id: 'login_attempts',
      name: 'Failed Login Policy',
      description: 'Account lock after 3 failed attempts',
      status: 'active',
      lastUpdated: '2024-01-12'
    }
  ];

  const handleRoleAssignment = (roleId) => {
    if (selectedUsers.length > 0) {
      onBulkAction(`assign_role_${roleId}`);
    }
  };

  const handlePermissionToggle = (permissionId) => {
    if (selectedUsers.length > 0) {
      onBulkAction(`toggle_permission_${permissionId}`);
    }
  };

  const tabs = [
    { id: 'roles', name: 'Roles', icon: 'UserCheck' },
    { id: 'permissions', name: 'Permissions', icon: 'Key' },
    { id: 'security', name: 'Security', icon: 'Shield' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Configuration Panel</h3>
        <p className="text-sm text-text-secondary">
          {selectedUsers.length > 0 
            ? `Configure settings for ${selectedUsers.length} selected user${selectedUsers.length > 1 ? 's' : ''}`
            : 'Select users to configure their settings'
          }
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-1 p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary' :'text-secondary-600 hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4">
        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text-primary">Role Templates</h4>
              <button className="text-sm text-primary hover:text-primary-700 font-medium">
                <Icon name="Plus" size={14} className="inline mr-1" />
                Create Role
              </button>
            </div>

            <div className="space-y-3">
              {roles.map(role => (
                <div key={role.id} className="border border-border rounded-lg p-3 hover:bg-secondary-50 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-text-primary">{role.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                          {role.userCount} users
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{role.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 2).map(permission => (
                        <span key={permission} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                      {role.permissions.length > 2 && (
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded">
                          +{role.permissions.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleRoleAssignment(role.id)}
                      disabled={selectedUsers.length === 0}
                      className="text-sm text-primary hover:text-primary-700 font-medium disabled:text-secondary-400 disabled:cursor-not-allowed"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab */}
        {activeTab === 'permissions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text-primary">Permission Management</h4>
              <button className="text-sm text-primary hover:text-primary-700 font-medium">
                <Icon name="Settings" size={14} className="inline mr-1" />
                Configure
              </button>
            </div>

            {['System', 'Finance', 'Recruitment', 'Management'].map(category => (
              <div key={category} className="space-y-2">
                <h5 className="text-sm font-medium text-text-primary border-b border-border pb-1">
                  {category}
                </h5>
                <div className="space-y-2">
                  {permissions.filter(p => p.category === category).map(permission => (
                    <div key={permission.id} className="flex items-center justify-between p-2 border border-border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">{permission.name}</p>
                        <p className="text-xs text-text-secondary">{permission.description}</p>
                      </div>
                      <button
                        onClick={() => handlePermissionToggle(permission.id)}
                        disabled={selectedUsers.length === 0}
                        className="text-sm text-primary hover:text-primary-700 font-medium disabled:text-secondary-400 disabled:cursor-not-allowed"
                      >
                        Toggle
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-text-primary">Security Policies</h4>
              <button className="text-sm text-primary hover:text-primary-700 font-medium">
                <Icon name="Plus" size={14} className="inline mr-1" />
                Add Policy
              </button>
            </div>

            <div className="space-y-3">
              {securityPolicies.map(policy => (
                <div key={policy.id} className="border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className="font-medium text-text-primary">{policy.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          policy.status === 'active' ?'bg-success-100 text-success-700' :'bg-secondary-100 text-secondary-700'
                        }`}>
                          {policy.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{policy.description}</p>
                      <p className="text-xs text-text-secondary mt-1">
                        Last updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-secondary-400 hover:text-primary">
                      <Icon name="Settings" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-border pt-4 mt-6">
              <h5 className="font-medium text-text-primary mb-3">Quick Security Actions</h5>
              <div className="grid grid-cols-1 gap-2">
                <button
                  disabled={selectedUsers.length === 0}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Shield" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-text-primary">Enable MFA</span>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-secondary-400" />
                </button>
                
                <button
                  disabled={selectedUsers.length === 0}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="RefreshCw" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-text-primary">Force Password Reset</span>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-secondary-400" />
                </button>
                
                <button
                  disabled={selectedUsers.length === 0}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="LogOut" size={16} className="text-error" />
                    <span className="text-sm font-medium text-text-primary">Terminate Sessions</span>
                  </div>
                  <Icon name="ChevronRight" size={14} className="text-secondary-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfigurationPanel;