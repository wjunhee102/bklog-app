import { useMemo } from "react";
import { TextContents } from "../types";
import { createContentsElement } from "../utils";

function useConvertToHTML(contents: TextContents[] | string) {
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