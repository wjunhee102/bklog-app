import { BlockDataInitProps, TextGenericType } from "../type";
import { BaseTextBlock } from "./BaseTextBlock"

export class TextBlock extends BaseTextBlock<null> {
  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props, null);
  }
}