import { BlockDataInitProps, TextBlockData, TextBlockDataProps, TextGenericType } from "../type";
import { BaseTextBlock } from "./BaseTextBlock";

export class NumberedBlock extends BaseTextBlock<{ order: number }> {

  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props, { order: 0 });
    this._type = "numbered";
  }

  public setOrder(order: number) {
    this._meta = { order };

    return this;
  }

  // regeneration(props: TextBlockProps) {
  //   const preBlockDataProps: TextBlockProps = this.updateBlockData(props);

  //   const newBlock = new NumberedBlock(this.getBlockData as TextBlockData);
  //   newBlock.setOrder(this.meta.order);

  //   return {
  //     newBlock,
  //     preBlockDataProps
  //   }
  // }

  regeneration(props: TextBlockDataProps): [ NumberedBlock, TextBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData(props);
    const newBlock = new NumberedBlock(blockData);
    newBlock.setOrder(this.meta.order);

    return [ newBlock, preBlockDataProps ];
  }
}