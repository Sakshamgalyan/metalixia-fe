'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
  id?: string;
}

const Toggle = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  activeColor = '#707FDD', // Primary accent color
  inactiveColor = '#CBD5E1', // slate-300
  className = '',
  id,
}: ToggleProps) => {
  const sizes = {
    sm: { width: 32, height: 18, circle: 12 },
    md: { width: 44, height: 24, circle: 18 },
    lg: { width: 56, height: 30, circle: 24 },
  };

  const { width, height, circle } = sizes[size];
  const padding = (height - circle) / 2;

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium ${
            disabled ? 'text-slate-400' : 'text-slate-700'
          } cursor-pointer select-none`}
          onClick={handleToggle}
        >
          {label}
        </label>
      )}

      <div
        id={id}
        onClick={handleToggle}
        className={`relative inline-flex items-center cursor-pointer transition-opacity ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
        }`}
        style={{
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: checked ? activeColor : inactiveColor,
          transition: 'background-color 0.2s ease',
        }}
      >
        <motion.div
          animate={{
            x: checked ? width - circle - padding : padding,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          style={{
            width: circle,
            height: circle,
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
      </div>
    </div>
  );
};

export default Toggle;
