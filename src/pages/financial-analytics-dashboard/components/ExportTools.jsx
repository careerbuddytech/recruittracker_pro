import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';

const ExportTools = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);

  const exportOptions = [
    {
      format: 'pdf',
      label: 'PDF Report',
      description: 'Executive summary with charts',
      icon: 'FileText',
      color: 'text-error'
    },
    {
      format: 'excel',
      label: 'Excel Workbook',
      description: 'Detailed data with multiple sheets',
      icon: 'Table',
      color: 'text-success'
    },
    {
      format: 'csv',
      label: 'CSV Data',
      description: 'Raw data for analysis',
      icon: 'Database',
      color: 'text-primary'
    },
    {
      format: 'powerpoint',
      label: 'PowerPoint',
      description: 'Presentation-ready slides',
      icon: 'Presentation',
      color: 'text-warning'
    }
  ];

  const handleExport = (format) => {
    onExport(format, 'financial-analytics');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
      >
        <Icon name="Download" size={18} />
        <span>Export</span>
        <Icon name="ChevronDown" size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-72 bg-surface border border-border rounded-lg shadow-floating z-50"
            >
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-medium text-text-primary">Export Options</h3>
                <p className="text-xs text-text-secondary mt-1">Choose your preferred format</p>
              </div>
              
              <div className="p-2">
                {exportOptions.map((option, index) => (
                  <button
                    key={option.format}
                    onClick={() => handleExport(option.format)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <Icon name={option.icon} size={20} className={option.color} />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-text-primary">{option.label}</p>
                      <p className="text-xs text-text-secondary">{option.description}</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-secondary-400" />
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-secondary-50">
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <Icon name="Info" size={14} />
                  <span>Exports include current filter settings</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportTools;