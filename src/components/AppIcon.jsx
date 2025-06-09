import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, size = 24, color, className = '', ...props }) => {
  const IconComponent = LucideIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide icons`);
    return null;
  }
  
  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className}
      {...props}
    />
  );
};

export default Icon;