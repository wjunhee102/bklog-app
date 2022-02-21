import { useMemo } from "react";
import { UnionTextBlock } from "../entities/block/type";
import { BlockContentsText } from "../entities/block/type/types/text";
import { createContentsElement } from "../utils";

function getHtmlContents(block: UnionTextBlock) {
  return block.getHtmlContents;
}

function useGetTextBlockContents(block: UnionTextBlock) {
  return useMemo(() => {
    return {
      __html: getHtmlContents(block)
    }
  }, [block.contents]);
}

export default useGetTextBlockContents;