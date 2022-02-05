import { Block } from "../abstract/Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockDataInitProps, TextBlockData, TextBlockDataProps, TextGenericType, TextRawBlockData } from "../type";
import { createContentsElement } from "../../../utils";
import { createContentsText } from "../../../../preBlock/utils";
import { BlockMetaText } from "../type/types/text";

export class BaseTextBlock<Meta extends BlockMetaText = null> extends Block<TextGenericType, Meta> implements BlockFrame<TextGenericType> {

  static get createBlockData() {
    return (props: TextBlockDataProps | TextBlockData | TextRawBlockData) => {
      return Block.createBlockData<TextGenericType>("text", props);
    }
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
    const preBlockDataProps = this.updateBlockData(props);
    const newBlock: BaseTextBlock<Meta> = new BaseTextBlock<Meta>(this.getBlockData, this.meta);

    return [ newBlock, preBlockDataProps ];
  }

}


