import React from 'react';

interface ContentEditableEle {
  className: string;
  editable: boolean;
  onKeyDown?: any;
  onKeyPress?: any;
  onKeyUp?: any;
  onCopy?: any;
  onPaste?: any;
  onClick?: any;
  onMouseUp?: any;
  onMouseDown?: any;
  onMouseMove?: any;
  onFocus?: any;
  onBlur?: any;
  placeholder?: string;
  dangerouslySetInnerHTML?: {
    __html: any
  }
  contents?: string;
}

const ContentEditableEle = React.forwardRef<HTMLDivElement, ContentEditableEle>(({
  className,
  editable,
  onKeyPress, 
  onKeyUp,
  onKeyDown,
  onCopy,
  onPaste,
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
      className={`bk-contentEditable bk-text-contents ${className? className : ""}`}
      ref={ref}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onCopy={onCopy}
      onPaste={onPaste}
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onFocus={onFocus}
      onBlur={onBlur}
      contentEditable={editable}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      placeholder={placeholder} 
      suppressContentEditableWarning={true}
    >
      { contents }
    </div>
  )
})

export default ContentEditableEle;