import React, { useMemo } from 'react';
import { placeholder } from '@babel/types';

interface ContentEditableEle {
  className: string;
  onKeyPress?: any;
  onKeyUp?: any;
  onClick?: any;
  onMouseUp?: any;
  onMouseDown?: any;
  onMouseMove?: any;
  onFocus?:any;
  onBlur?:any;
  placeholder?: string;
  dangerouslySetInnerHTML?: {
    __html: any
  }
  contents?: string;
}

const ContentEditableEle = React.forwardRef<HTMLDivElement, ContentEditableEle>(({
  className,
  onKeyPress, 
  onKeyUp,
  onClick,
  onMouseUp,
  onMouseDown,
  onMouseMove,
  onFocus,
  onBlur,
  dangerouslySetInnerHTML,
  contents,
  placeholder
}, ref) => {
  
  return (
    <div 
      className={`bk-contentEditable ${className? className : ""}`}
      ref={ref}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onFocus={onFocus}
      onBlur={onBlur}
      contentEditable={true}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      placeholder={placeholder} 
    >
      { contents }
    </div>
  )
})

export default ContentEditableEle;