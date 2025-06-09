import React from 'react';
import Icon from 'components/AppIcon';

const ExecutiveDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Executive Dashboard</h1>
        <div className="flex items-center space-x-3">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Icon name="Download" size={16} className="inline mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-text-primary">$2.4M</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Active Placements</p>
              <p className="text-2xl font-bold text-text-primary">156</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Commission Earned</p>
              <p className="text-2xl font-bold text-text-primary">$480K</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm">Outstanding Invoices</p>
              <p className="text-2xl font-bold text-text-primary">$125K</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle" size={14} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">New placement completed</p>
                <p className="text-xs text-text-secondary">Software Engineer at TechCorp</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="FileText" size={14} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Invoice generated</p>
                <p className="text-xs text-text-secondary">INV-2024-001 - $15,000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Performers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Sarah Johnson</p>
                  <p className="text-xs text-text-secondary">Senior Recruiter</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">$85K</p>
                <p className="text-xs text-text-secondary">This month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;