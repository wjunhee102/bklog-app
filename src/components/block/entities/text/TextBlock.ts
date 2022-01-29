import { Block } from "../Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockDataInitProps, TextBlockData, TextBlockProps, TextGenericType } from "../type";
import { createContentsElement } from "../../utils";
import { createContentsText } from "../../../preBlock/utils";

export class TextBlock extends Block<TextGenericType> implements BlockFrame<TextGenericType> {

  static get createBlockData() {
    return (props: TextBlockProps | TextBlockData) => {
      return Block.createBlockData<TextGenericType>("text", props);
    }
  }

  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props);
  }

  get getHtmlContents() {
    return this.contents.reduce(createContentsElement, "");
  }

  get getTextContents() {
    return this.contents.reduce(createContentsText, "");
  }

  public update(props: TextBlockProps) {
    return new TextBlock(Object.assign({}, this.getBlockData, props));
  }
}