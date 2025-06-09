import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <Icon name="FileQuestion" size={64} className="mx-auto text-text-tertiary" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">Page Not Found</p>
        <Link 
          to="/" 
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;