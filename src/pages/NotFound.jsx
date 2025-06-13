import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/executive-dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" />
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            <Icon name="Home" size={20} className="inline mr-2" />
            Go to Dashboard
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-secondary-100 text-secondary-700 py-3 px-6 rounded-lg hover:bg-secondary-200 transition-colors duration-200 font-medium"
          >
            <Icon name="ArrowLeft" size={20} className="inline mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-text-secondary">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@recruitpro.com" className="text-primary hover:text-primary-700 transition-colors duration-200">
              support@recruitpro.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;