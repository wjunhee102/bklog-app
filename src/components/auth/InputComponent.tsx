import React from 'react';

interface InputComponentProps {
  boxClass?: string;
  labelClass?: string;
  onChange: any;
  value: string | number; 
  placeholder: string;
  label: string;
  className?: string;
  type: string;
  name: string;
  id?: string;
  children?: any;
  autoComplete?: string;
  onBlur?: any;
}

function InputComponent({
  boxClass,
  labelClass,
  onChange,
  value,
  placeholder,
  label,
  className,
  type,
  name,
  id,
  autoComplete,
  children,
  onBlur
}: InputComponentProps) {
  return (
    <div className={boxClass}>
      <label 
        htmlFor={type} 
        className={labelClass}
      >
        { label }
      </label>
      <input 
        id={id} 
        name={name} 
        type={type} 
        className={className}
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onBlur={onBlur}
      />
      { children }
    </div>
  )
}

export default InputComponent;