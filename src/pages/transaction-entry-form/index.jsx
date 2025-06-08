import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/ui/Breadcrumbs';

import ClientSection from './components/ClientSection';
import RoleDetailsSection from './components/RoleDetailsSection';
import CandidateSection from './components/CandidateSection';
import CurrencySwitcher from './components/CurrencySwitcher';
import ActionButtons from './components/ActionButtons';
import IntegrationStatus from './components/IntegrationStatus';
import { useForm } from 'react-hook-form';
import SERVICE_TYPES from 'constants/serviceTypes';

const TransactionEntryForm = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('NGN'); // Default to Naira
  const [conversionRate, setConversionRate] = useState(1500); // Mock conversion rate: 1 USD = 1500 NGN
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceType, setServiceType] = useState('recruitment'); // Default to recruitment
  const [integrationStatus, setIntegrationStatus] = useState({
    clientDatabase: { status: 'connected', message: 'Client database connected' },
    commissionCalculator: { status: 'syncing', message: 'Commission calculator syncing' }
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      client: '',
      roleTitle: '',
      dateClosed: '',
      resumptionDate: '',
      candidateName: '',
      terms: 15, // Default to 15%
      salary: '',
      closer: '',
      cvSource: '',
      serviceType: 'recruitment' // Default service type
    }
  });

  // For auto-complete suggestions
  const [suggestions, setSuggestions] = useState({
    clients: [],
    candidates: [],
    recruiters: []
  });

  // Mock data for dropdowns and auto-complete
  useEffect(() => {
    // Simulating API call to fetch data
    setSuggestions({
      clients: [
        { id: 'c1', name: 'TechCorp Solutions' },
        { id: 'c2', name: 'Global Dynamics' },
        { id: 'c3', name: 'InnovateLabs Inc' },
        { id: 'c4', name: 'StartupVenture Co' },
        { id: 'c5', name: 'Enterprise Systems' }
      ],
      candidates: [
        { id: 'cand1', name: 'Michael Rodriguez' },
        { id: 'cand2', name: 'Emily Watson' },
        { id: 'cand3', name: 'James Wilson' },
        { id: 'cand4', name: 'Anna Martinez' },
        { id: 'cand5', name: 'Robert Kim' }
      ],
      recruiters: [
        { id: 'r1', name: 'Sarah Johnson' },
        { id: 'r2', name: 'David Chen' },
        { id: 'r3', name: 'Lisa Park' },
        { id: 'r4', name: 'Mark Thompson' }
      ]
    });
  }, []);

  // CV source options
  const cvSourceOptions = [
    { value: 'internal_database', label: 'Internal Database' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'referral', label: 'Referral' },
    { value: 'job_board', label: 'Job Board' },
    { value: 'direct_application', label: 'Direct Application' },
    { value: 'agency', label: 'Agency Partnership' },
    { value: 'headhunting', label: 'Headhunting' },
    { value: 'other', label: 'Other' }
  ];

  // Handle currency switch
  const handleCurrencySwitch = (newCurrency) => {
    const currentSalary = watch('salary');
    
    if (currentSalary) {
      // Convert the salary to the new currency
      let newSalary;
      if (currency === 'NGN' && newCurrency === 'USD') {
        newSalary = (currentSalary / conversionRate).toFixed(2);
      } else if (currency === 'USD' && newCurrency === 'NGN') {
        newSalary = (currentSalary * conversionRate).toFixed(2);
      }
      
      setValue('salary', newSalary);
    }
    
    setCurrency(newCurrency);
  };

  // Handle service type change
  const handleServiceTypeChange = (newServiceType) => {
    setServiceType(newServiceType);
    setValue('serviceType', newServiceType);
  };

  // Handle form submission
  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Add currency information to the data
    const formattedData = {
      ...data,
      currency,
      serviceType,
      dateClosed: new Date(data.dateClosed).toISOString(),
      resumptionDate: new Date(data.resumptionDate).toISOString(),
      terms: parseFloat(data.terms),
      salary: parseFloat(data.salary)
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log('Transaction data submitted:', formattedData);
      
      // Show success message
      alert('Transaction saved successfully');
      
      // Reset form or navigate to another page
      reset();
      setIsSubmitting(false);
      
      // Optionally navigate to a confirmation page or back to dashboard
      // navigate('/financial-analytics-dashboard');
    }, 1500);
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, onSubmit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <Breadcrumbs />
        
        {/* Header with Currency Switcher */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Transaction Entry Form</h1>
            <p className="text-text-secondary">
              Record placement details and financial data for tracking and commission calculations
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Service Type Selector */}
            <div className="flex items-center bg-surface border border-border rounded-lg p-1">
              {SERVICE_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleServiceTypeChange(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                    serviceType === type.id ? 'bg-primary text-white' : 'hover:bg-secondary-50 text-text-secondary'
                  }`}
                >
                  <span>{type.name}</span>
                </button>
              ))}
            </div>

            <CurrencySwitcher 
              currency={currency} 
              onCurrencyChange={handleCurrencySwitch} 
            />
          </div>
        </div>
        
        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface border border-border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {/* Client Section */}
              <ClientSection 
                register={register} 
                errors={errors} 
                clientSuggestions={suggestions.clients} 
              />
              
              {/* Role Details Section */}
              <RoleDetailsSection 
                register={register} 
                errors={errors} 
                currency={currency} 
                watch={watch}
                setValue={setValue}
                serviceType={serviceType}
              />
            </div>
            
            <div className="space-y-8">
              {/* Candidate Section */}
              <CandidateSection 
                register={register} 
                errors={errors} 
                candidateSuggestions={suggestions.candidates} 
                cvSourceOptions={cvSourceOptions} 
                recruiterOptions={suggestions.recruiters}
                serviceType={serviceType}
              />
              
              {/* Integration Status */}
              <IntegrationStatus status={integrationStatus} />
            </div>
          </div>
          
          {/* Action Buttons */}
          <ActionButtons 
            isSubmitting={isSubmitting} 
            isDirty={isDirty} 
            onCancel={() => {
              if (confirm('Are you sure you want to discard changes?')) {
                reset();
              }
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default TransactionEntryForm;