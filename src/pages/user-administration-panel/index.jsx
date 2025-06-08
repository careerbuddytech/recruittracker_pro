import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import UserDirectoryTree from './components/UserDirectoryTree';
import UserDetailsGrid from './components/UserDetailsGrid';
import ConfigurationPanel from './components/ConfigurationPanel';
import BulkOperationsModal from './components/BulkOperationsModal';
import UserFormModal from './components/UserFormModal';
import SecurityAlertsPanel from './components/SecurityAlertsPanel';

const UserAdministrationPanel = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [permissionFilter, setPermissionFilter] = useState('all');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showSecurityAlerts, setShowSecurityAlerts] = useState(false);
  const [currentView, setCurrentView] = useState('grid'); // grid, tree, security

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@recruitpro.com",
      role: "Finance Manager",
      department: "Finance",
      status: "active",
      lastLogin: new Date(Date.now() - 3600000),
      permissions: ["invoice_management", "financial_reports", "user_view"],
      securityFlags: [],
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      joinDate: "2023-01-15",
      sessionCount: 3,
      failedLogins: 0
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@recruitpro.com",
      role: "Senior Recruiter",
      department: "Recruitment",
      status: "active",
      lastLogin: new Date(Date.now() - 7200000),
      permissions: ["candidate_management", "client_communication", "role_posting"],
      securityFlags: ["mfa_enabled"],
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      joinDate: "2022-08-20",
      sessionCount: 1,
      failedLogins: 0
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@recruitpro.com",
      role: "System Administrator",
      department: "IT",
      status: "active",
      lastLogin: new Date(Date.now() - 1800000),
      permissions: ["full_access", "user_management", "system_config", "security_monitoring"],
      securityFlags: ["admin_access", "mfa_enabled"],
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      joinDate: "2021-03-10",
      sessionCount: 2,
      failedLogins: 0
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@recruitpro.com",
      role: "Recruitment Consultant",
      department: "Recruitment",
      status: "inactive",
      lastLogin: new Date(Date.now() - 86400000 * 7),
      permissions: ["candidate_view", "basic_reporting"],
      securityFlags: ["account_locked"],
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      joinDate: "2023-06-01",
      sessionCount: 0,
      failedLogins: 3
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@recruitpro.com",
      role: "Team Lead",
      department: "Recruitment",
      status: "active",
      lastLogin: new Date(Date.now() - 10800000),
      permissions: ["team_management", "performance_reports", "candidate_management"],
      securityFlags: ["mfa_enabled"],
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      joinDate: "2022-11-15",
      sessionCount: 1,
      failedLogins: 0
    }
  ];

  // Mock data for departments
  const departments = [
    { id: 'all', name: 'All Departments', userCount: users.length },
    { id: 'recruitment', name: 'Recruitment', userCount: 3 },
    { id: 'finance', name: 'Finance', userCount: 1 },
    { id: 'it', name: 'IT', userCount: 1 }
  ];

  // Mock data for roles
  const roles = [
    { id: 'all', name: 'All Roles' },
    { id: 'admin', name: 'System Administrator' },
    { id: 'finance_manager', name: 'Finance Manager' },
    { id: 'team_lead', name: 'Team Lead' },
    { id: 'senior_recruiter', name: 'Senior Recruiter' },
    { id: 'recruiter', name: 'Recruitment Consultant' }
  ];

  // Mock security alerts
  const securityAlerts = [
    {
      id: 1,
      type: "failed_login",
      severity: "high",
      message: "Multiple failed login attempts detected for david.thompson@recruitpro.com",
      timestamp: new Date(Date.now() - 1800000),
      resolved: false
    },
    {
      id: 2,
      type: "suspicious_activity",
      severity: "medium",
      message: "Unusual login location detected for michael.chen@recruitpro.com",
      timestamp: new Date(Date.now() - 3600000),
      resolved: false
    },
    {
      id: 3,
      type: "permission_change",
      severity: "low",
      message: "Bulk permission update completed for 15 users",
      timestamp: new Date(Date.now() - 7200000),
      resolved: true
    }
  ];

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || user.department.toLowerCase() === selectedDepartment;
      const matchesRole = selectedRole === 'all' || user.role.toLowerCase().includes(selectedRole.replace('_', ' '));
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesPermission = permissionFilter === 'all' || user.permissions.includes(permissionFilter);

      return matchesSearch && matchesDepartment && matchesRole && matchesStatus && matchesPermission;
    });
  }, [users, searchQuery, selectedDepartment, selectedRole, statusFilter, permissionFilter]);

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    setShowBulkModal(false);
    setSelectedUsers([]);
  };

  const handleExportUsers = () => {
    const exportData = filteredUsers.map(user => ({
      Name: user.name,
      Email: user.email,
      Role: user.role,
      Department: user.department,
      Status: user.status,
      'Last Login': user.lastLogin.toLocaleDateString(),
      Permissions: user.permissions.join(', ')
    }));
    
    console.log('Exporting user data:', exportData);
  };

  const unreadAlerts = securityAlerts.filter(alert => !alert.resolved).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">User Administration Panel</h1>
            <p className="text-text-secondary">
              Manage user accounts, permissions, and security policies across the organization
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Toggle */}
            <div className="flex bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === 'grid' ?'bg-white text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                }`}
              >
                <Icon name="Grid3X3" size={16} className="inline mr-2" />
                Grid View
              </button>
              <button
                onClick={() => setCurrentView('tree')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === 'tree' ?'bg-white text-primary shadow-sm' :'text-secondary-600 hover:text-text-primary'
                }`}
              >
                <Icon name="GitBranch" size={16} className="inline mr-2" />
                Tree View
              </button>
            </div>

            {/* Security Alerts */}
            <button
              onClick={() => setShowSecurityAlerts(!showSecurityAlerts)}
              className="relative p-2 bg-surface border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200"
            >
              <Icon name="Shield" size={20} className="text-secondary-600" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* Action Buttons */}
            <button
              onClick={handleCreateUser}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              <Icon name="UserPlus" size={16} className="inline mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-surface border border-border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={handleExportUsers}
                className="flex-1 bg-secondary-100 text-secondary-700 px-3 py-2 rounded-lg hover:bg-secondary-200 transition-colors duration-200 text-sm font-medium"
              >
                <Icon name="Download" size={16} className="inline mr-1" />
                Export
              </button>
              {selectedUsers.length > 0 && (
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="flex-1 bg-accent text-white px-3 py-2 rounded-lg hover:bg-accent-600 transition-colors duration-200 text-sm font-medium"
                >
                  <Icon name="Settings" size={16} className="inline mr-1" />
                  Bulk ({selectedUsers.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* User Directory Tree - 25% */}
          <div className="lg:col-span-1">
            <UserDirectoryTree 
              departments={departments}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={setSelectedDepartment}
              users={users}
            />
          </div>

          {/* User Details Grid - 50% */}
          <div className="lg:col-span-2">
            <UserDetailsGrid 
              users={filteredUsers}
              selectedUsers={selectedUsers}
              onUserSelect={handleUserSelect}
              onSelectAll={handleSelectAll}
              onEditUser={handleEditUser}
              currentView={currentView}
            />
          </div>

          {/* Configuration Panel - 25% */}
          <div className="lg:col-span-1">
            <ConfigurationPanel 
              selectedUsers={selectedUsers}
              onBulkAction={handleBulkAction}
            />
          </div>
        </div>

        {/* Security Alerts Panel */}
        {showSecurityAlerts && (
          <div className="mt-6">
            <SecurityAlertsPanel 
              alerts={securityAlerts}
              onClose={() => setShowSecurityAlerts(false)}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showBulkModal && (
        <BulkOperationsModal
          selectedUsers={selectedUsers}
          users={users}
          onClose={() => setShowBulkModal(false)}
          onAction={handleBulkAction}
        />
      )}

      {showUserModal && (
        <UserFormModal
          user={editingUser}
          onClose={() => setShowUserModal(false)}
          onSave={(userData) => {
            console.log('Saving user:', userData);
            setShowUserModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserAdministrationPanel;