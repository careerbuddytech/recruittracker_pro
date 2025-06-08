import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const CalculationEngine = ({ commissionStructures }) => {
  const [formData, setFormData] = useState({
    placementValue: '',
    commissionTier: '',
    customRate: '',
    useCustomRate: false,
    teamSplits: [{ name: '', percentage: 100 }],
    bonusApplicable: false,
    notes: ''
  });

  const [calculationResult, setCalculationResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Mock recruiter data for team splits
  const recruiters = [
    'Sarah Johnson',
    'David Chen',
    'Lisa Park',
    'Mark Thompson',
    'Emily Watson',
    'James Wilson'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.placementValue || formData.placementValue <= 0) {
      newErrors.placementValue = 'Placement value is required and must be positive';
    }

    if (!formData.useCustomRate && !formData.commissionTier) {
      newErrors.commissionTier = 'Commission tier is required';
    }

    if (formData.useCustomRate && (!formData.customRate || formData.customRate <= 0)) {
      newErrors.customRate = 'Custom rate is required and must be positive';
    }

    const totalPercentage = formData.teamSplits.reduce((sum, split) => sum + (parseFloat(split.percentage) || 0), 0);
    if (Math.abs(totalPercentage - 100) > 0.01) {
      newErrors.teamSplits = 'Team splits must total 100%';
    }

    formData.teamSplits.forEach((split, index) => {
      if (!split.name) {
        newErrors[`teamSplit_${index}_name`] = 'Recruiter name is required';
      }
      if (!split.percentage || split.percentage <= 0) {
        newErrors[`teamSplit_${index}_percentage`] = 'Percentage is required and must be positive';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCommission = () => {
    if (!validateForm()) return;

    const placementValue = parseFloat(formData.placementValue);
    let commissionRate;

    if (formData.useCustomRate) {
      commissionRate = parseFloat(formData.customRate);
    } else {
      const selectedTier = commissionStructures.find(tier => tier.id === formData.commissionTier);
      commissionRate = selectedTier.baseRate;
      
      // Apply bonus if applicable
      if (formData.bonusApplicable && placementValue >= selectedTier.bonusThreshold) {
        commissionRate += selectedTier.bonusRate;
      }
    }

    const totalCommission = (placementValue * commissionRate) / 100;
    
    const teamBreakdown = formData.teamSplits.map(split => ({
      name: split.name,
      percentage: parseFloat(split.percentage),
      amount: (totalCommission * parseFloat(split.percentage)) / 100
    }));

    setCalculationResult({
      placementValue,
      commissionRate,
      totalCommission,
      teamBreakdown,
      calculatedAt: new Date().toISOString()
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear related errors
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleTeamSplitChange = (index, field, value) => {
    const newTeamSplits = [...formData.teamSplits];
    newTeamSplits[index] = {
      ...newTeamSplits[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      teamSplits: newTeamSplits
    }));

    // Clear related errors
    const errorKey = `teamSplit_${index}_${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: undefined,
        teamSplits: undefined
      }));
    }
  };

  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamSplits: [...prev.teamSplits, { name: '', percentage: 0 }]
    }));
  };

  const removeTeamMember = (index) => {
    if (formData.teamSplits.length > 1) {
      setFormData(prev => ({
        ...prev,
        teamSplits: prev.teamSplits.filter((_, i) => i !== index)
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      placementValue: '',
      commissionTier: '',
      customRate: '',
      useCustomRate: false,
      teamSplits: [{ name: '', percentage: 100 }],
      bonusApplicable: false,
      notes: ''
    });
    setCalculationResult(null);
    setErrors({});
  };

  const saveCalculation = () => {
    if (calculationResult) {
      console.log('Saving calculation:', calculationResult);
      // Handle save functionality
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text-primary">Calculation Engine</h2>
          <button
            onClick={resetForm}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-secondary-600 hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="RotateCcw" size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Placement Value */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Placement Value *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">$</span>
            <input
              type="number"
              value={formData.placementValue}
              onChange={(e) => handleInputChange('placementValue', e.target.value)}
              placeholder="85,000"
              className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${
                errors.placementValue ? 'border-error' : 'border-border'
              }`}
            />
          </div>
          {errors.placementValue && (
            <p className="mt-1 text-sm text-error">{errors.placementValue}</p>
          )}
        </div>

        {/* Commission Rate Selection */}
        <div>
          <div className="flex items-center space-x-4 mb-3">
            <label className="flex items-center">
              <input
                type="radio"
                checked={!formData.useCustomRate}
                onChange={() => handleInputChange('useCustomRate', false)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-text-primary">Use Tier Structure</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={formData.useCustomRate}
                onChange={() => handleInputChange('useCustomRate', true)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-text-primary">Custom Rate</span>
            </label>
          </div>

          {!formData.useCustomRate ? (
            <div>
              <select
                value={formData.commissionTier}
                onChange={(e) => handleInputChange('commissionTier', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${
                  errors.commissionTier ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select commission tier</option>
                {commissionStructures.map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} - {tier.baseRate}% ({tier.description})
                  </option>
                ))}
              </select>
              {errors.commissionTier && (
                <p className="mt-1 text-sm text-error">{errors.commissionTier}</p>
              )}
              
              {formData.commissionTier && (
                <label className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    checked={formData.bonusApplicable}
                    onChange={(e) => handleInputChange('bonusApplicable', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-text-secondary">Apply bonus rate if threshold met</span>
                </label>
              )}
            </div>
          ) : (
            <div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={formData.customRate}
                  onChange={(e) => handleInputChange('customRate', e.target.value)}
                  placeholder="15.0"
                  className={`w-full pr-8 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${
                    errors.customRate ? 'border-error' : 'border-border'
                  }`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400">%</span>
              </div>
              {errors.customRate && (
                <p className="mt-1 text-sm text-error">{errors.customRate}</p>
              )}
            </div>
          )}
        </div>

        {/* Team Splits */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-text-primary">Team Splits *</label>
            <button
              onClick={addTeamMember}
              className="flex items-center space-x-1 text-sm text-primary hover:text-primary-700 transition-colors duration-200"
            >
              <Icon name="Plus" size={14} />
              <span>Add Member</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.teamSplits.map((split, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <select
                    value={split.name}
                    onChange={(e) => handleTeamSplitChange(index, 'name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${
                      errors[`teamSplit_${index}_name`] ? 'border-error' : 'border-border'
                    }`}
                  >
                    <option value="">Select recruiter</option>
                    {recruiters.map(recruiter => (
                      <option key={recruiter} value={recruiter}>{recruiter}</option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={split.percentage}
                      onChange={(e) => handleTeamSplitChange(index, 'percentage', e.target.value)}
                      className={`w-full pr-8 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 ${
                        errors[`teamSplit_${index}_percentage`] ? 'border-error' : 'border-border'
                      }`}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-secondary-400 text-sm">%</span>
                  </div>
                </div>
                {formData.teamSplits.length > 1 && (
                  <button
                    onClick={() => removeTeamMember(index)}
                    className="p-2 text-error hover:bg-error-50 rounded-lg transition-colors duration-200"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.teamSplits && (
            <p className="mt-1 text-sm text-error">{errors.teamSplits}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Additional notes about this commission calculation..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateCommission}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
        >
          <Icon name="Calculator" size={16} className="inline mr-2" />
          Calculate Commission
        </button>

        {/* Results */}
        {calculationResult && (
          <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Calculation Results</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-text-secondary">Placement Value</p>
                <p className="text-lg font-semibold text-text-primary">
                  ${calculationResult.placementValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Commission Rate</p>
                <p className="text-lg font-semibold text-text-primary">
                  {calculationResult.commissionRate}%
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-text-secondary">Total Commission</p>
              <p className="text-2xl font-bold text-primary">
                ${calculationResult.totalCommission.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-text-primary">Team Breakdown:</p>
              {calculationResult.teamBreakdown.map((member, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span className="text-sm text-text-secondary">
                    {member.name} ({member.percentage}%)
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    ${member.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={saveCalculation}
              className="w-full mt-4 bg-success text-white py-2 px-4 rounded-lg hover:bg-success-700 transition-colors duration-200 font-medium"
            >
              <Icon name="Save" size={16} className="inline mr-2" />
              Save Calculation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculationEngine;