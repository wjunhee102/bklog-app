import React from 'react';
import { UseBkPageTypes } from '../../../../pages/bkpage/hooks/useBkPage';
import './EditorBlock.scss';

interface EditorBlockProps {
  bkPageHooks: UseBkPageTypes;
}

const EditorBlock: React.FC<EditorBlockProps> = ({
  bkPageHooks
}) => {
  const {
    usePageHooks,
    useBklogHooks
  } = bkPageHooks;

  const {
    pageState: {
      pageEditor
    }
  } = usePageHooks;

  return (
    <div className="editor-block-container">

      {/* {
        pageEditor? 
        <div className="editor-info">
          <div className="sidebar-icon-box">
            {
              pageEditor.photo?
              <img src={pageEditor.photo} alt=""/> :
              <img src="/img/smile.png" alt="default" />
            }
            
          </div>
          <div className="sidebar-contents-box">
            {pageEditor.penName}
          </div>
        </div> : null
      }       */}

      {/* <div className="test-editor-block">
      
        <div className="user-image">
          <svg xmlns="http://www.w3.org/2000/svg" className="user-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <div className="user-text">
          <div className="user-penname">Test</div>
          <div className="user-bio">테스트입니다.</div>
        </div>
      </div> */}

      <div className="test2-editor-block gradient">
        <div className="editor-block-top">

          <div className="user-image">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="user-svg" fill="white" viewBox="0 0 24 24" stroke="rgb(254, 202, 202)">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="user-svg" fill="transparent" viewBox="0 0 24 24" stroke="#fff">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="user-penname">
            {pageEditor.penName}
          </div>
          
        </div>

        <div className="editor-block-bottom">
        <div className="user-bio"> 
          {
            pageEditor.bio? pageEditor.bio : `안녕하세요. ${pageEditor.penName}입니다.`
          } 
        </div>
        </div>
      </div>

    </div>
  );
}

export default EditorBlock;