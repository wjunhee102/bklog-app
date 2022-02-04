import { Block } from "../abstract/Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockDataInitProps, TextBlockData, TextBlockDataProps, TextGenericType } from "../type";
import { createContentsElement } from "../../../utils";
import { createContentsText } from "../../../../preBlock/utils";

export class BaseTextBlock<Meta = unknown> extends Block<TextGenericType, Meta> implements BlockFrame<TextGenericType> {

  static get createBlockData() {
    return (props: TextBlockDataProps | TextBlockData) => {
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

  regeneration(props: TextBlockDataProps): [ BaseTextBlock<Meta>, TextBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData(props);
    const newBlock: BaseTextBlock<Meta> = new BaseTextBlock<Meta>(blockData, null as any);

    return [ newBlock, preBlockDataProps ];
  }

}
