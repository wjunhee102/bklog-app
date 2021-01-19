import React, { useMemo } from 'react';
import { placeholder } from '@babel/types';

interface ContentEditableEle {
  onKeyPress?: any;
  onKeyUp?: any;
  onMouseUp?: any;
  onMouseDown?: any;
  onFocus?:any;
  onBlur?:any;
  placeholder?: string;
  dangerouslySetInnerHTML?: {
    __html: any
  }
  contents?: string;
}

const ContentEditableEle = React.forwardRef<HTMLDivElement, ContentEditableEle>(({
  onKeyPress, 
  onKeyUp,
  onMouseUp,
  onMouseDown,
  onFocus,
  onBlur,
  dangerouslySetInnerHTML,
  contents,
  placeholder
}, ref) => {
  
  return (
    <div 
      className="bk-contentEditable"
      ref={ref}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
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