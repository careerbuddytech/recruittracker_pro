import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkOperationsModal = ({ selectedUsers, users, onClose, onAction }) => {
  const [activeOperation, setActiveOperation] = useState('role_assignment');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [statusChange, setStatusChange] = useState('');
  const [confirmationText, setConfirmationText] = useState('');

  const selectedUserData = users.filter(user => selectedUsers.includes(user.id));

  const operations = [
    { id: 'role_assignment', name: 'Role Assignment', icon: 'UserCheck' },
    { id: 'permission_update', name: 'Permission Update', icon: 'Key' },
    { id: 'status_change', name: 'Status Change', icon: 'ToggleLeft' },
    { id: 'security_action', name: 'Security Actions', icon: 'Shield' }
  ];

  const roles = [
    { id: 'admin', name: 'System Administrator' },
    { id: 'finance_manager', name: 'Finance Manager' },
    { id: 'team_lead', name: 'Team Lead' },
    { id: 'recruiter', name: 'Recruiter' }
  ];

  const permissions = [
    { id: 'invoice_management', name: 'Invoice Management' },
    { id: 'financial_reports', name: 'Financial Reports' },
    { id: 'candidate_management', name: 'Candidate Management' },
    { id: 'client_communication', name: 'Client Communication' },
    { id: 'team_management', name: 'Team Management' },
    { id: 'user_management', name: 'User Management' }
  ];

  const securityActions = [
    { id: 'enable_mfa', name: 'Enable Multi-Factor Authentication', icon: 'Shield' },
    { id: 'force_password_reset', name: 'Force Password Reset', icon: 'RefreshCw' },
    { id: 'terminate_sessions', name: 'Terminate All Sessions', icon: 'LogOut' },
    { id: 'unlock_account', name: 'Unlock Account', icon: 'Unlock' }
  ];

  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleExecute = () => {
    let actionData = {};
    
    switch (activeOperation) {
      case 'role_assignment':
        if (!selectedRole) return;
        actionData = { type: 'role_assignment', role: selectedRole };
        break;
      case 'permission_update':
        if (selectedPermissions.length === 0) return;
        actionData = { type: 'permission_update', permissions: selectedPermissions };
        break;
      case 'status_change':
        if (!statusChange) return;
        actionData = { type: 'status_change', status: statusChange };
        break;
      case 'security_action':
        if (!confirmationText) return;
        actionData = { type: 'security_action', action: confirmationText };
        break;
    }

    onAction(actionData);
  };

  const isExecuteDisabled = () => {
    switch (activeOperation) {
      case 'role_assignment':
        return !selectedRole;
      case 'permission_update':
        return selectedPermissions.length === 0;
      case 'status_change':
        return !statusChange;
      case 'security_action':
        return !confirmationText;
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Bulk Operations</h2>
            <p className="text-sm text-text-secondary mt-1">
              Performing actions on {selectedUsers.length} selected user{selectedUsers.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} className="text-secondary-400" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Operation Selection */}
          <div className="w-1/3 border-r border-border p-4">
            <h3 className="font-medium text-text-primary mb-4">Select Operation</h3>
            <div className="space-y-2">
              {operations.map(operation => (
                <button
                  key={operation.id}
                  onClick={() => setActiveOperation(operation.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                    activeOperation === operation.id
                      ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary'
                  }`}
                >
                  <Icon name={operation.icon} size={18} />
                  <span className="font-medium">{operation.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Users Preview */}
            <div className="mt-6">
              <h4 className="font-medium text-text-primary mb-3">Selected Users</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedUserData.map(user => (
                  <div key={user.id} className="flex items-center space-x-2 p-2 bg-secondary-50 rounded">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
                      <p className="text-xs text-text-secondary truncate">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Operation Configuration */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeOperation === 'role_assignment' && (
              <div>
                <h3 className="font-medium text-text-primary mb-4">Assign Role</h3>
                <div className="space-y-3">
                  {roles.map(role => (
                    <label key={role.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={selectedRole === role.id}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{role.name}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeOperation === 'permission_update' && (
              <div>
                <h3 className="font-medium text-text-primary mb-4">Update Permissions</h3>
                <div className="space-y-3">
                  {permissions.map(permission => (
                    <label key={permission.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                      />
                      <div>
                        <p className="font-medium text-text-primary">{permission.name}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeOperation === 'status_change' && (
              <div>
                <h3 className="font-medium text-text-primary mb-4">Change Status</h3>
                <div className="space-y-3">
                  {['active', 'inactive', 'suspended'].map(status => (
                    <label key={status} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary-50 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={statusChange === status}
                        onChange={(e) => setStatusChange(e.target.value)}
                        className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                      />
                      <div>
                        <p className="font-medium text-text-primary capitalize">{status}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeOperation === 'security_action' && (
              <div>
                <h3 className="font-medium text-text-primary mb-4">Security Actions</h3>
                <div className="space-y-3">
                  {securityActions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => setConfirmationText(action.id)}
                      className={`w-full flex items-center space-x-3 p-3 border rounded-lg text-left transition-colors duration-200 ${
                        confirmationText === action.id
                          ? 'border-primary bg-primary-50 text-primary' :'border-border hover:bg-secondary-50 text-text-primary'
                      }`}
                    >
                      <Icon name={action.icon} size={18} />
                      <span className="font-medium">{action.name}</span>
                    </button>
                  ))}
                </div>

                {confirmationText && (
                  <div className="mt-6 p-4 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-warning-800 mb-2">Confirmation Required</h4>
                        <p className="text-sm text-warning-700">
                          This action will affect {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} and cannot be undone. 
                          Please confirm you want to proceed.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-secondary-600 hover:text-text-primary transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleExecute}
              disabled={isExecuteDisabled()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Execute Operation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsModal;