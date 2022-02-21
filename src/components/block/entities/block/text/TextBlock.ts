import { BlockDataInitProps, TextBlockDataProps, TextGenericType } from "../type";
import { BaseTextBlock } from "./BaseTextBlock"

export class TextBlock extends BaseTextBlock<null> {
  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props, null);
  }

  public regeneration(props: TextBlockDataProps): [ TextBlock, TextBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData<TextGenericType>(props);
    const newBlock = new TextBlock(blockData);

    return [ newBlock, preBlockDataProps ];
  }
}