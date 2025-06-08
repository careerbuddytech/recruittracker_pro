import React from 'react';
import Icon from 'components/AppIcon';

const ActionButtons = ({ isSubmitting, isDirty, onCancel }) => {
  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
      <div className="text-text-secondary text-sm">
        <span className="inline-flex items-center">
          <Icon name="KeySquare" size={14} className="mr-1" />
          Press <kbd className="mx-1 px-2 py-1 bg-secondary-100 rounded text-text-primary font-mono">Ctrl+S</kbd> to save
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting || !isDirty}
          className="px-4 py-2 border border-border rounded-md text-text-primary hover:bg-secondary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-md text-text-primary hover:bg-secondary-50 transition-colors duration-200"
        >
          Save as Template
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Icon name="Save" size={16} />
              <span>Save Transaction</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;