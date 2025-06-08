import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/executive-dashboard': {
      label: 'Executive Dashboard',
      parent: null
    },
    '/client-candidate-database': {
      label: 'Client & Candidate Database',
      parent: null
    },
    '/invoice-management-center': {
      label: 'Invoice Management Center',
      parent: null
    },
    '/financial-analytics-dashboard': {
      label: 'Financial Analytics Dashboard',
      parent: null
    },
    '/commission-calculator': {
      label: 'Commission Calculator',
      parent: null
    },
    '/user-administration-panel': {
      label: 'User Administration Panel',
      parent: null
    }
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/executive-dashboard' }];

    if (pathSegments.length > 0) {
      const currentPath = `/${pathSegments.join('/')}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo && currentPath !== '/executive-dashboard') {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={breadcrumb.path} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-secondary-400 mx-2" 
                />
              )}
              
              {isLast ? (
                <span className="text-text-primary font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <button
                  onClick={() => handleBreadcrumbClick(breadcrumb.path)}
                  className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
                >
                  {breadcrumb.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;