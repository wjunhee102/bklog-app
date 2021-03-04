import React from 'react';
import classNames from 'classnames';

interface InputProps {
  className?: string;
  value: string | number;
  type?: string;
  onChange: any;
  placeholder?: string;
  name?: string;
  label: string;
  error?: boolean;
  errorMessage?: string;
}

function BkInput({ 
  className,
  value, 
  type, 
  onChange,
  placeholder,
  name,
  label,
  error,
  errorMessage
}: InputProps) {
  return (
    <label className={classNames("bk-label")}>
      <span className="">{ label } {error? errorMessage : null }</span>
      <div>
        <input
          className={classNames(
            "bk-input px-2 py-1 rounded-xl w-36 border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            , className,
            {"border-red-500": error}
            )}
          type={type? type : "text"} 
          name={name}
          value={value} 
          onChange={onChange} 
          placeholder={placeholder? placeholder : " 데이터를 입력해주세요..."}
        /> 
      </div>
    </label>
  )
}

export default BkInput;