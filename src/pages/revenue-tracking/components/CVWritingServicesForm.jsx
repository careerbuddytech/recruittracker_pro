import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import { cvWritingServicesData } from 'data/revenueStreams';
import { CV_SERVICE_TIERS, PAYMENT_STATUS } from 'constants/serviceTypes';

const CVWritingServicesForm = () => {
  const [activeView, setActiveView] = useState('list');
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    serviceType: '',
    serviceTier: 'basic',
    industry: '',
    experienceLevel: '',
    rushOrder: false,
    specialRequirements: '',
    acquisitionSource: 'Website',
    acquisitionCost: ''
  });

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Marketing', 'Education', 
    'Legal', 'Engineering', 'Sales', 'Human Resources', 'Consulting',
    'Manufacturing', 'Retail', 'Media', 'Real Estate', 'Other'
  ];

  const experienceLevels = [
    'Entry-level', 'Mid-level', 'Senior', 'Executive', 'Career Change'
  ];

  const acquisitionSources = [
    'Website', 'Referral', 'Google Ads', 'LinkedIn', 'Facebook', 
    'Word of Mouth', 'Partner', 'Cold Outreach', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CV Writing Services Form Data:', formData);
    // Handle form submission
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getSelectedTier = () => {
    return CV_SERVICE_TIERS.find(tier => 
      tier.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '') === formData.serviceTier
    ) || CV_SERVICE_TIERS[0];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-100 text-success-700';
      case 'in_progress': return 'bg-primary-100 text-primary-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getPaymentStatusColor = (status) => {
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
          <h2 className="text-xl font-semibold text-text-primary">CV Writing Services</h2>
          <p className="text-text-secondary">Professional CV writing and career document services</p>
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
              View Orders
            </button>
            <button
              onClick={() => setActiveView('form')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeView === 'form' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name="Plus" size={14} className="inline mr-1" />
              New Order
            </button>
          </div>
        </div>
      </div>

      {activeView === 'form' && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Client Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter client full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="client@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+1-555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Experience Level *
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select level</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Any specific requirements or preferences..."
                  />
                </div>
              </div>

              {/* Service Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Service Details</h3>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Service Package *
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {CV_SERVICE_TIERS.map((tier) => {
                      const tierValue = tier.name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
                      return (
                        <div key={tierValue} className="relative">
                          <input
                            type="radio"
                            name="serviceTier"
                            value={tierValue}
                            checked={formData.serviceTier === tierValue}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <label className="flex cursor-pointer p-4 border border-border rounded-lg hover:bg-secondary-50 peer-checked:border-primary peer-checked:bg-primary-50 transition-colors duration-200">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-text-primary">{tier.name}</h4>
                                <span className="text-lg font-bold text-primary">{formatCurrency(tier.price)}</span>
                              </div>
                              <p className="text-sm text-text-secondary mb-2">{tier.turnaround}</p>
                              <ul className="text-xs text-text-secondary space-y-1">
                                {tier.features.map((feature, index) => (
                                  <li key={index} className="flex items-center">
                                    <Icon name="Check" size={12} className="text-success mr-2" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="rushOrder"
                    name="rushOrder"
                    checked={formData.rushOrder}
                    onChange={handleInputChange}
                    className="w-4 h-4 border border-border rounded focus:ring-2 focus:ring-primary-500"
                  />
                  <label htmlFor="rushOrder" className="text-sm font-medium text-text-secondary">
                    Rush Order (+50% fee)
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      How did they find us? *
                    </label>
                    <select
                      name="acquisitionSource"
                      value={formData.acquisitionSource}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      {acquisitionSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Acquisition Cost ($)
                    </label>
                    <input
                      type="number"
                      name="acquisitionCost"
                      value={formData.acquisitionCost}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="25"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-secondary-50 rounded-lg p-4">
                  <h4 className="font-medium text-text-primary mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Service:</span>
                      <span className="text-text-primary">{getSelectedTier().name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Base Price:</span>
                      <span className="text-text-primary">{formatCurrency(getSelectedTier().price)}</span>
                    </div>
                    {formData.rushOrder && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Rush Fee (50%):</span>
                        <span className="text-text-primary">{formatCurrency(getSelectedTier().price * 0.5)}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between font-medium">
                        <span className="text-text-primary">Total:</span>
                        <span className="text-text-primary">
                          {formatCurrency(getSelectedTier().price * (formData.rushOrder ? 1.5 : 1))}
                        </span>
                      </div>
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
                Create Order
              </button>
            </div>
          </form>
        </div>
      )}

      {activeView === 'list' && (
        <div className="bg-surface border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Recent Orders</h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">{cvWritingServicesData.length} orders</span>
                <button
                  onClick={() => setActiveView('form')}
                  className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm"
                >
                  <Icon name="Plus" size={14} className="inline mr-1" />
                  New Order
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Service</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Industry</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Order Date</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Amount</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Payment</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cvWritingServicesData.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary-50 transition-colors duration-200">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{order.clientName}</p>
                        <p className="text-sm text-text-secondary">{order.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{order.serviceType}</p>
                        {order.rushOrder && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-warning-100 text-warning-700">
                            <Icon name="Zap" size={10} className="mr-1" />
                            Rush
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                        {order.industry}
                      </span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm text-text-primary">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        {order.deliveryDate && (
                          <p className="text-xs text-text-secondary">
                            Due: {new Date(order.deliveryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-text-primary">{formatCurrency(order.totalAmount)}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('_', ' ')}
                        </span>
                        {order.clientSatisfaction && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning fill-current" />
                            <span className="text-xs text-text-secondary">{order.clientSatisfaction}%</span>
                          </div>
                        )}
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

export default CVWritingServicesForm;