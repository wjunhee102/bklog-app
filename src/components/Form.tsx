import React from 'react';

interface FormProps {
  formType: 
    "number" 
    | "text"
    | "password";
  errorMessage: string;
  className: string;
}

function Form({formType, errorMessage, className}:FormProps) {
  return (
    <div className={className}>
      <input type={formType}/>
      {errorMessage}
    </div>
  )
}

Form.defaultProps = {
  formType: "text",
  errorMessage: "error",
  className: "input"
}

export default Form;