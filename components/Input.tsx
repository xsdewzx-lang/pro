import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ icon: Icon, label, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Icon size={20} />
          </div>
        )}
        <input 
          className={`w-full bg-white border border-gray-200 text-gray-800 rounded-xl py-3 ${Icon ? 'pl-10' : 'pl-4'} pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
          {...props}
        />
      </div>
    </div>
  );
};