import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CandidateSection = ({ register, errors, candidateSuggestions, cvSourceOptions, recruiterOptions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleCandidateInput = (e) => {
    const value = e.target.value;
    
    if (value.length > 1) {
      const filtered = candidateSuggestions.filter(candidate =>
        candidate.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCandidate = (candidateName) => {
    const candidateInput = document.getElementById('candidateName');
    if (candidateInput) {
      candidateInput.value = candidateName;
      // Trigger a change event to update react-hook-form
      const event = new Event('change', { bubbles: true });
      candidateInput.dispatchEvent(event);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary flex items-center">
        <Icon name="User" size={20} className="mr-2 text-primary" />
        Candidate Information
      </h2>
      
      <div className="relative">
        <label htmlFor="candidateName" className="block text-sm font-medium text-text-secondary mb-1">
          Candidate Name <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            id="candidateName"
            type="text"
            {...register('candidateName', { 
              required: 'Candidate name is required',
              onChange: handleCandidateInput
            })}
            className={`w-full px-4 py-2 border ${errors?.candidateName ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
            placeholder="Enter candidate name"
            autoComplete="off"
          />
          <Icon name="Search" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
        </div>
        {errors?.candidateName && (
          <p className="text-error text-sm mt-1">{errors.candidateName.message}</p>
        )}
        
        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-lg shadow-elevated max-h-60 overflow-y-auto">
            {filteredSuggestions.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                onClick={() => selectCandidate(candidate.name)}
                className="w-full text-left px-4 py-2 hover:bg-secondary-50 transition-colors duration-200"
              >
                <p className="font-medium text-text-primary">{candidate.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="resumptionDate" className="block text-sm font-medium text-text-secondary mb-1">
          Resumption Date <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            id="resumptionDate"
            type="date"
            {...register('resumptionDate', { required: 'Resumption date is required' })}
            className={`w-full px-4 py-2 border ${errors?.resumptionDate ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          <Icon name="Calendar" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none" />
        </div>
        {errors?.resumptionDate && (
          <p className="text-error text-sm mt-1">{errors.resumptionDate.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="closer" className="block text-sm font-medium text-text-secondary mb-1">
          Closer (Recruiter) <span className="text-error">*</span>
        </label>
        <select
          id="closer"
          {...register('closer', { required: 'Closer is required' })}
          className={`w-full px-4 py-2 border ${errors?.closer ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
        >
          <option value="">Select a recruiter</option>
          {recruiterOptions.map((recruiter) => (
            <option key={recruiter.id} value={recruiter.name}>
              {recruiter.name}
            </option>
          ))}
        </select>
        {errors?.closer && (
          <p className="text-error text-sm mt-1">{errors.closer.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="cvSource" className="block text-sm font-medium text-text-secondary mb-1">
          CV Source <span className="text-error">*</span>
        </label>
        <select
          id="cvSource"
          {...register('cvSource', { required: 'CV source is required' })}
          className={`w-full px-4 py-2 border ${errors?.cvSource ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
        >
          <option value="">Select CV source</option>
          {cvSourceOptions.map((source) => (
            <option key={source.value} value={source.value}>
              {source.label}
            </option>
          ))}
        </select>
        {errors?.cvSource && (
          <p className="text-error text-sm mt-1">{errors.cvSource.message}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <button 
          type="button"
          className="flex items-center text-primary text-sm hover:text-primary-700 transition-colors duration-200"
        >
          <Icon name="PlusCircle" size={16} className="mr-1" />
          Add New Candidate
        </button>
      </div>
    </div>
  );
};

export default CandidateSection;