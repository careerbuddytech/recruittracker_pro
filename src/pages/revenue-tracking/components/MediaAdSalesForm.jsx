import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { mediaAdSalesData } from 'data/revenueStreams';
import { MEDIA_AD_PLATFORMS, CAMPAIGN_TYPES, PAYMENT_TERMS, PAYMENT_STATUS } from 'constants/serviceTypes';

const MediaAdSalesForm = () => {
  const [activeView, setActiveView] = useState('list');
  const [formData, setFormData] = useState({
    clientName: '',
    campaignName: '',
    platform: '',
    campaignType: '',
    startDate: '',
    endDate: '',
    monthlyBudget: '',
    totalBudget: '',
    expectedRevenue: '',
    profitMargin: '',
    paymentTerms: 'net_30',
    acquisitionCost: '',
    kpiTargets: {
      cpm: '',
      ctr: '',
      conversions: '',
      conversionRate: ''
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Media Ad Sales Form Data:', formData);
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
      case PAYMENT_STATUS.PAID: return 'bg-success-100 text-success-700';
      case PAYMENT_STATUS.PARTIAL: return 'bg-warning-100 text-warning-700';
      case PAYMENT_STATUS.PENDING: return 'bg-accent-100 text-accent-700';
      case PAYMENT_STATUS.OVERDUE: return 'bg-error-100 text-error-700';
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
          <h2 className="text-xl font-semibold text-text-primary">Media Advertisement Sales</h2>
          <p className="text-text-secondary">Track advertising campaigns and client revenue</p>
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
              View Campaigns
            </button>
            <button
              onClick={() => setActiveView('form')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeView === 'form' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Plus" size={14} className="inline mr-1" />
              New Campaign
            </button>
          </div>
        </div>
      </div>

      {activeView === 'form' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Campaign Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Campaign Details</h3>
                
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
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    name="campaignName"
                    value={formData.campaignName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter campaign name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Platform *
                    </label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select platform</option>
                      {MEDIA_AD_PLATFORMS.map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Campaign Type *
                    </label>
                    <select
                      name="campaignType"
                      value={formData.campaignType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select type</option>
                      {CAMPAIGN_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
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
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Financial Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Monthly Budget ($) *
                    </label>
                    <input
                      type="number"
                      name="monthlyBudget"
                      value={formData.monthlyBudget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="15000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Total Budget ($) *
                    </label>
                    <input
                      type="number"
                      name="totalBudget"
                      value={formData.totalBudget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="45000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Expected Revenue ($) *
                    </label>
                    <input
                      type="number"
                      name="expectedRevenue"
                      value={formData.expectedRevenue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="9000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Profit Margin (%) *
                    </label>
                    <input
                      type="number"
                      name="profitMargin"
                      value={formData.profitMargin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="20"
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      placeholder="2500"
                    />
                  </div>
                </div>

                {/* KPI Targets */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-text-primary">KPI Targets</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        CPM Target ($)
                      </label>
                      <input
                        type="number"
                        name="kpi_cpm"
                        value={formData.kpiTargets.cpm}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="12.50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        CTR Target (%)
                      </label>
                      <input
                        type="number"
                        name="kpi_ctr"
                        value={formData.kpiTargets.ctr}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="2.5"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        Conversions Target
                      </label>
                      <input
                        type="number"
                        name="kpi_conversions"
                        value={formData.kpiTargets.conversions}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="145"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary mb-1">
                        Conversion Rate Target (%)
                      </label>
                      <input
                        type="number"
                        name="kpi_conversionRate"
                        value={formData.kpiTargets.conversionRate}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                        placeholder="3.5"
                        step="0.1"
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
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      )}

      {activeView === 'list' && (
        <div className="bg-surface border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Active Campaigns</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">{mediaAdSalesData.length} campaigns</span>
                <button
                  onClick={() => setActiveView('form')}
                  className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm"
                >
                  <Icon name="Plus" size={14} className="inline mr-1" />
                  New Campaign
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Campaign</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Platform</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Budget</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Revenue</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Performance</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mediaAdSalesData.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-secondary-50 transition-colors duration-200">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{campaign.campaignName}</p>
                        <p className="text-sm text-text-secondary">
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-text-primary">{campaign.clientName}</p>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                        {campaign.platform}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{formatCurrency(campaign.totalBudget)}</p>
                        <p className="text-sm text-text-secondary">{formatCurrency(campaign.monthlyBudget)}/mo</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{formatCurrency(campaign.revenue)}</p>
                        <p className="text-sm text-text-secondary">{(campaign.profitMargin * 100).toFixed(1)}% margin</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.paymentStatus)}`}>
                        {campaign.paymentStatus.charAt(0).toUpperCase() + campaign.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary">CPM:</span>
                          <span className="text-text-primary">${campaign.cpmActual}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary">CTR:</span>
                          <span className="text-text-primary">{(campaign.ctrActual * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-text-secondary">Conversions:</span>
                          <span className="text-text-primary">{campaign.conversions}</span>
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

export default MediaAdSalesForm;