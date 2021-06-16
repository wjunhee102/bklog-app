import React, { useEffect, useMemo } from "react";
import { UseBlockTypes } from "./hooks/useBlock";
import { BlockData } from "./types";
import { 
  contentsElement,
  copyInClipboard,
  createClipboardContentsText,
  createContentsElement
} from './utils';
import { 
  getSelectionStart,
  getSelectionEnd,
  setSelectionRange
} from './utils/selectionText';

interface BlockEleProps {
  idx: number;
  blockData: BlockData,
  hooks: UseBlockTypes
}

const BlockElement: React.FC<BlockEleProps> = ({
  idx,
  blockData,
  hooks
}) => {

  const {
    initBlock
  } = hooks

  const createMarkup = useMemo(()=> {
    const htmlElement = blockData.contents[0]?
    (!blockData.contents[1]? 
      contentsElement(blockData.contents[0])
      : blockData.contents.reduce(createContentsElement)
    ) : "";

    return {
      __html: htmlElement
    }
  }, [blockData.contents]);

  const childrenBlock = initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null;

  // useEffect(()=> {
  //   console.log(initBlock.hasOwnProperty(blockData.id),initBlock.hasOwnProperty(blockData.id)? 
  //   initBlock[blockData.id] : null);
  // },[initBlock]);

  return (
    <div className="block-zone">
      <div
        className="bk-block relative pr-8"
      > 
        <div
          className={blockData.styleType}
          dangerouslySetInnerHTML={createMarkup}
        >
        </div>

      </div>

      {
        childrenBlock?
        childrenBlock.map((block: any, idx: number) => 
          <BlockElement
            idx={idx}
            key={idx}
            blockData={block}
            hooks={hooks}
          />
        ) : null
      }

    </div>
  )
}

export default BlockElement;
