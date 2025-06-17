import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      <div className="space-y-6">
        {children}
      </div>
      <div className="border-b border-gray-200 mt-8"></div>
    </div>
  );
}; 