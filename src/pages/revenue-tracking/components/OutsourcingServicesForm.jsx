import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { outsourcingServicesData } from 'data/revenueStreams';
import { OUTSOURCING_SERVICE_TYPES, CONTRACT_TYPES, PAYMENT_TERMS, PROJECT_STATUS } from 'constants/serviceTypes';

const OutsourcingServicesForm = () => {
  const [activeView, setActiveView] = useState('list');
  const [formData, setFormData] = useState({
    clientName: '',
    serviceType: '',
    projectName: '',
    startDate: '',
    endDate: '',
    contractType: 'monthly',
    teamSize: '',
    hourlyRate: '',
    totalContractValue: '',
    paymentTerms: 'monthly',
    acquisitionCost: '',
    expectedCompletionRate: '',
    kpiTargets: {
      responseTime: '',
      resolutionRate: '',
      clientRetention: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Outsourcing Services Form Data:', formData);
    // Handle form submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('kpi_')) {
      const kpiField = name.replace('kpi_', '');
      setFormData(prev => ({
        ...prev,
        kpiTargets: {
          ...prev.kpiTargets,
          [kpiField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case PROJECT_STATUS.ACTIVE: return 'bg-success-100 text-success-700';
      case PROJECT_STATUS.COMPLETED: return 'bg-primary-100 text-primary-700';
      case PROJECT_STATUS.ON_HOLD: return 'bg-warning-100 text-warning-700';
      case PROJECT_STATUS.CANCELLED: return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Outsourcing Services</h2>
          <p className="text-text-secondary">Manage project-based services and team outsourcing</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-secondary-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('list')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeView === 'list' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="List" size={14} className="inline mr-1" />
              View Projects
            </button>
            <button
              onClick={() => setActiveView('form')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeView === 'form' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Plus" size={14} className="inline mr-1" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {activeView === 'form' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Project Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter client company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Service Type *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select service type</option>
                    {OUTSOURCING_SERVICE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Contract Type *
                  </label>
                  <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {CONTRACT_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Financial & Team Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Team Size *
                    </label>
                    <input
                      type="number"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Hourly Rate ($) *
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="45"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Total Contract Value ($) *
                  </label>
                  <input
                    type="number"
                    name="totalContractValue"
                    value={formData.totalContractValue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="475200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Payment Terms *
                  </label>
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    {PAYMENT_TERMS.map(term => (
                      <option key={term.value} value={term.value}>{term.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Client Acquisition Cost ($)
                  </label>
                  <input
                    type="number"
                    name="acquisitionCost"
                    value={formData.acquisitionCost}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="15000"
                  />
                </div>

                {/* KPI Targets */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-text-primary">KPI Targets</h4>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        Response Time Target
                      </label>
                      <input
                        type="text"
                        name="kpi_responseTime"
                        value={formData.kpiTargets.responseTime}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="2 hours"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        Resolution Rate Target (%)
                      </label>
                      <input
                        type="number"
                        name="kpi_resolutionRate"
                        value={formData.kpiTargets.resolutionRate}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="95"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        Client Retention Target (%)
                      </label>
                      <input
                        type="number"
                        name="kpi_clientRetention"
                        value={formData.kpiTargets.clientRetention}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="98"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => setActiveView('list')}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {activeView === 'list' && (
        <div className="bg-surface border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Active Projects</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">{outsourcingServicesData.length} projects</span>
                <button
                  onClick={() => setActiveView('form')}
                  className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm"
                >
                  <Icon name="Plus" size={14} className="inline mr-1" />
                  New Project
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Project</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Service Type</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Team</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Contract Value</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Performance</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {outsourcingServicesData.map((project) => (
                  <tr key={project.id} className="hover:bg-secondary-50 transition-colors duration-200">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{project.projectName}</p>
                        <p className="text-sm text-text-secondary">
                          {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-text-primary">{project.clientName}</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        {project.serviceType}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{project.teamSize} members</p>
                        <p className="text-sm text-text-secondary">${project.hourlyRate}/hr</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{formatCurrency(project.totalContractValue)}</p>
                        <p className="text-sm text-text-secondary">{formatCurrency(project.monthlyRevenue)}/mo</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary">Completion:</span>
                          <span className="text-text-primary">{project.completionRate}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary">Satisfaction:</span>
                          <span className="text-text-primary">{project.clientSatisfaction}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200">
                          <Icon name="Eye" size={14} className="text-text-secondary" />
                        </button>
                        <button className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200">
                          <Icon name="Edit3" size={14} className="text-text-secondary" />
                        </button>
                        <button className="p-1 rounded hover:bg-secondary-100 transition-colors duration-200">
                          <Icon name="MoreHorizontal" size={14} className="text-text-secondary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutsourcingServicesForm;