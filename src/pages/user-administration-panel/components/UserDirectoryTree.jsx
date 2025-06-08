import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const UserDirectoryTree = ({ departments, selectedDepartment, onDepartmentSelect, users }) => {
  const [expandedDepartments, setExpandedDepartments] = useState(['recruitment']);

  const toggleDepartment = (deptId) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const getDepartmentUsers = (deptName) => {
    return users.filter(user => user.department.toLowerCase() === deptName.toLowerCase());
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-success rounded-full" />;
      case 'inactive':
        return <div className="w-2 h-2 bg-secondary-400 rounded-full" />;
      case 'suspended':
        return <div className="w-2 h-2 bg-warning rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-secondary-300 rounded-full" />;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Organization Structure</h3>
        <p className="text-sm text-text-secondary">Browse users by department and team</p>
      </div>

      <div className="p-4">
        {/* All Users */}
        <div className="mb-4">
          <button
            onClick={() => onDepartmentSelect('all')}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
              selectedDepartment === 'all' ?'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={18} className={selectedDepartment === 'all' ? 'text-primary' : 'text-secondary-400'} />
              <span className="font-medium">All Users</span>
            </div>
            <span className="text-sm bg-secondary-100 text-secondary-600 px-2 py-1 rounded-full">
              {users.length}
            </span>
          </button>
        </div>

        {/* Department Tree */}
        <div className="space-y-2">
          {departments.filter(dept => dept.id !== 'all').map(department => {
            const deptUsers = getDepartmentUsers(department.name);
            const isExpanded = expandedDepartments.includes(department.id);
            const isSelected = selectedDepartment === department.id;

            return (
              <div key={department.id} className="space-y-1">
                {/* Department Header */}
                <div className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                  isSelected 
                    ? 'bg-primary-50 text-primary border border-primary-200' :'hover:bg-secondary-50 text-text-primary'
                }`}>
                  <button
                    onClick={() => onDepartmentSelect(department.id)}
                    className="flex items-center space-x-3 flex-1"
                  >
                    <Icon 
                      name="Building" 
                      size={18} 
                      className={isSelected ? 'text-primary' : 'text-secondary-400'} 
                    />
                    <span className="font-medium">{department.name}</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm bg-secondary-100 text-secondary-600 px-2 py-1 rounded-full">
                      {deptUsers.length}
                    </span>
                    <button
                      onClick={() => toggleDepartment(department.id)}
                      className="p-1 hover:bg-secondary-100 rounded transition-colors duration-200"
                    >
                      <Icon 
                        name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                        size={14} 
                        className="text-secondary-400" 
                      />
                    </button>
                  </div>
                </div>

                {/* Department Users */}
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {deptUsers.map(user => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary-50 transition-colors duration-200"
                      >
                        <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} className="text-secondary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-secondary truncate">
                            {user.role}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          {user.securityFlags.includes('mfa_enabled') && (
                            <Icon name="Shield" size={12} className="text-success" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3">Quick Stats</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Active Users</span>
              <span className="font-medium text-success">
                {users.filter(u => u.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Inactive Users</span>
              <span className="font-medium text-secondary-600">
                {users.filter(u => u.status === 'inactive').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">MFA Enabled</span>
              <span className="font-medium text-primary">
                {users.filter(u => u.securityFlags.includes('mfa_enabled')).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Admin Users</span>
              <span className="font-medium text-warning">
                {users.filter(u => u.securityFlags.includes('admin_access')).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDirectoryTree;