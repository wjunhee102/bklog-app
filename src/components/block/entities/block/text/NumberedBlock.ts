import { BlockDataInitProps, TextBlockDataProps, TextGenericType } from "../type";
import { NumberedBlockMeta } from "../type/types/text";
import { BaseTextBlock } from "./BaseTextBlock";

export class NumberedBlock extends BaseTextBlock<NumberedBlockMeta> {

  constructor(props: BlockDataInitProps<TextGenericType>, meta: NumberedBlockMeta = { order: 0 }) {
    super(props, meta);
    this._type = "numbered";
  }

  public setOrder(order: number) {
    this._meta = { order };

    return this;
  }

  public regeneration(props: TextBlockDataProps): [ NumberedBlock, TextBlockDataProps ] {
    const preBlockDataProps = this.updateBlockData(props);
    const newBlock = new NumberedBlock(this.getBlockData);
    newBlock._meta = this.meta;

    return [ newBlock, preBlockDataProps ];
  }
  
}