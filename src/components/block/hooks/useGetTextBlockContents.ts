import { useMemo } from "react";
import { UnionTextBlock } from "../entities/block/type";

function useGetTextBlockContents(block: UnionTextBlock) {
  return useMemo(() => {
    return {
      __html: block.getHtmlContents
    }
  }, [block.contents]);
}

export default useGetTextBlockContents;