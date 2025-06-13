import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ClientSection = ({ register, errors, clientSuggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleClientInput = (e) => {
    const value = e.target.value;
    
    if (value.length > 1) {
      const filtered = clientSuggestions.filter(client =>
        client.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectClient = (clientName) => {
    const clientInput = document.getElementById('client');
    if (clientInput) {
      clientInput.value = clientName;
      // Trigger a change event to update react-hook-form
      const event = new Event('change', { bubbles: true });
      clientInput.dispatchEvent(event);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-primary flex items-center">
        <Icon name="Building" size={20} className="mr-2 text-primary" />
        Client Information
      </h2>
      
      <div className="relative">
        <label htmlFor="client" className="block text-sm font-medium text-text-secondary mb-1">
          Client Company <span className="text-error">*</span>
        </label>
        <div className="relative">
          <input
            id="client"
            type="text"
            {...register('client', { 
              required: 'Client company is required',
              onChange: handleClientInput
            })}
            className={`w-full px-4 py-2 border ${errors?.client ? 'border-error' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
            placeholder="Start typing to search for clients..."
            autoComplete="off"
          />
          <Icon name="Search" size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
        </div>
        {errors?.client && (
          <p className="text-error text-sm mt-1">{errors.client.message}</p>
        )}
        
        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-lg shadow-elevated max-h-60 overflow-y-auto">
            {filteredSuggestions.map((client) => (
              <button
                key={client.id}
                type="button"
                onClick={() => selectClient(client.name)}
                className="w-full text-left px-4 py-2 hover:bg-secondary-50 transition-colors duration-200"
              >
                <p className="font-medium text-text-primary">{client.name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <button 
          type="button"
          className="flex items-center text-primary text-sm hover:text-primary-700 transition-colors duration-200"
        >
          <Icon name="PlusCircle" size={16} className="mr-1" />
          Add New Client
        </button>
      </div>
    </div>
  );
};

export default ClientSection;