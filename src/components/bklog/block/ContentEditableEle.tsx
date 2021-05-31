import React, { useMemo } from 'react';

interface ContentEditableEle {
  className: string;
  onKeyDown?: (e: any) => void;
  onKeyPress?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  onClick?: (e: any) => void;
  onMouseUp?: (e: any) => void;
  onMouseDown?: (e: any) => void;
  onMouseMove?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
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