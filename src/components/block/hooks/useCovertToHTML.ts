import { useMemo } from "react";
import { BlockContentsText } from "../entities/block/type/types/text";
import { createContentsElement } from "../utils";

function useConvertToHTML(contents: BlockContentsText | string) {
  return useMemo(() => {
    let htmlElement: string;

    if(typeof contents === "string") {
      htmlElement = contents;
    } else {
      htmlElement = contents.reduce(createContentsElement, "");
    } 

    return {
      __html: htmlElement
    }
  }, [contents]);
}

export default useConvertToHTML;