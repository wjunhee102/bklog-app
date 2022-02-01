import { Block } from "../abstract/Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockDataInitProps, TextBlockData, TextBlockProps, TextGenericType } from "../type";
import { createContentsElement } from "../../../utils";
import { createContentsText } from "../../../../preBlock/utils";

export class TextBlock<TMeta = null> extends Block<TextGenericType, TMeta> implements BlockFrame<TextGenericType> {

  static get createBlockData() {
    return (props: TextBlockProps | TextBlockData) => {
      return Block.createBlockData<TextGenericType>("text", props);
    }
  }

  constructor(props: BlockDataInitProps<TextGenericType>, meta?: TMeta) {
    super(props, meta? meta : null);
  }

  get getHtmlContents() {
    return this.contents.reduce(createContentsElement, "");
  }

  get getTextContents() {
    return this.contents.reduce(createContentsText, "");
  }


  regeneration(props: TextBlockProps) {
    const preBlockDataProps: TextBlockProps = this.updateBlockData(props);
    const newBlock: TextBlock<TMeta> = new TextBlock<TMeta>(this.getBlockData as TextBlockData);

    return {
      newBlock, 
      preBlockDataProps
    }
  }
}