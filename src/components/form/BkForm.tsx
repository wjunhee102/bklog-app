import React, { FormEvent } from 'react';
import classNames from 'classnames';

interface FormProps {
  children: any;
  className?: string;
}


function BkForm({children, className}:FormProps) {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  } 

  return (
    <div className={classNames(className, "p-12")}>
      <form className={classNames("w-auto h-auto")} onSubmit={handleSubmit}>
        { children }
      </form>
    </div>
  )
}

export default BkForm;