import React from 'react';
import Icon from 'components/AppIcon';
import SERVICE_TYPES from 'constants/serviceTypes';

const RoleDetailsSection = ({ register, errors, currency, watch, setValue, serviceType }) => {
  const salary = watch('salary');
  const terms = watch('terms');
  
  // Calculate commission amount
  const commissionAmount = salary && terms ? (salary * (terms / 100)).toFixed(2) : 0;
  
  // Format currency display
  const formatCurrency = (amount) => {
    if (!amount) return '0';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'NGN' ? 'NGN' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
  };

  // Get service type display name
  const getServiceTypeName = () => {
    const service = SERVICE_TYPES.find(s => s.id === serviceType);
    return service?.name || 'Recruitment';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary flex items-center">
        <Icon name="Briefcase" size={20} className="mr-2 text-primary" />
        {serviceType === 'recruitment' ? 'Role Details' : `${getServiceTypeName()} Service Details`}
      </h2>
      
      <div>
        <label htmlFor="roleTitle" className="block text-sm font-medium text-text-secondary mb-1">
          {serviceType === 'recruitment' ? 'Role Title' : 'Service Description'} <span className="text-error">*</span>
        </label>
        <input
          id="roleTitle"
          type="text"
          {...register('roleTitle', { required: 'Description is required' })}
          className={`w-full px-4 py-2 border ${errors?.roleTitle ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
          placeholder={serviceType === 'recruitment' ? 'e.g. Senior Software Engineer' : 'e.g. Media Ad Campaign / Outsourced Team'}
        />
        {errors?.roleTitle && (
          <p className="text-error text-sm mt-1">{errors.roleTitle.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dateClosed" className="block text-sm font-medium text-text-secondary mb-1">
            Date Closed <span className="text-error">*</span>
          </label>
          <div className="relative">
            <input
              id="dateClosed"
              type="date"
              {...register('dateClosed', { required: 'Date closed is required' })}
              className={`w-full px-4 py-2 border ${errors?.dateClosed ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            <Icon name="Calendar" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" />
          </div>
          {errors?.dateClosed && (
            <p className="text-error text-sm mt-1">{errors.dateClosed.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-text-secondary mb-1">
            {serviceType === 'recruitment' ? 'Salary' : 'Revenue Amount'} <span className="text-error">*</span> ({currency === 'NGN' ? '₦' : '$'})
          </label>
          <div className="relative">
            <input
              id="salary"
              type="number"
              step="0.01"
              min="0"
              {...register('salary', { 
                required: 'Amount is required',
                min: { value: 0, message: 'Amount must be positive' },
                valueAsNumber: true
              })}
              className={`w-full pl-8 pr-4 py-2 border ${errors?.salary ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="0.00"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-600 font-medium">
              {currency === 'NGN' ? '₦' : '$'}
            </div>
          </div>
          {errors?.salary && (
            <p className="text-error text-sm mt-1">{errors.salary.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="terms" className="flex justify-between text-sm font-medium text-text-secondary mb-1">
          <span>Terms (%) <span className="text-error">*</span></span>
          <span>{terms}%</span>
        </label>
        <input
          id="terms"
          type="range"
          min="0"
          max="30"
          step="0.5"
          {...register('terms', { 
            required: 'Terms percentage is required',
            valueAsNumber: true 
          })}
          className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        {errors?.terms && (
          <p className="text-error text-sm mt-1">{errors.terms.message}</p>
        )}
        
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>0%</span>
          <span>15%</span>
          <span>30%</span>
        </div>
      </div>
      
      <div className="bg-secondary-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-text-primary mb-2">Commission Calculation (Estimate)</h3>
        <div className="flex justify-between">
          <span className="text-text-secondary">Amount:</span>
          <span className="font-semibold text-text-primary">{formatCurrency(commissionAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default RoleDetailsSection;