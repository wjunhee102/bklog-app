import { Block } from "../abstract/Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockDataInitProps, TextBlockData, TextBlockDataProps, TextGenericType, TextRawBlockData } from "../type";
import { createContentsElement, createContentsText } from "../../../utils";
import { BlockMetaText } from "../type/types/text";
import { parseHtmlContents } from "./utils";

export class BaseTextBlock<Meta extends BlockMetaText = null> extends Block<TextGenericType, Meta> implements BlockFrame<TextGenericType> {

  static createBlockData(props: TextBlockDataProps | TextBlockData | TextRawBlockData) {
    return Block.createBlockData<TextGenericType>("text", props);
  }

  static parseHtmlContents(HTML: string) {
    return parseHtmlContents(HTML);
  }

  constructor(props: BlockDataInitProps<TextGenericType>, meta: Meta) {
    super(props, meta);
  }

  get getHtmlContents() {
    return this.contents.reduce(createContentsElement, "");
  }

  get getTextContents() {
    return this.contents.reduce(createContentsText, "");
  }

  public regeneration(props: TextBlockDataProps): [ BaseTextBlock<Meta>, TextBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData<TextGenericType>(props);
    const newBlock: BaseTextBlock<Meta> = new BaseTextBlock<Meta>(blockData, this.meta);

    return [ newBlock, preBlockDataProps ];
  }

}


