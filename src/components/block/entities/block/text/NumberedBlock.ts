import { BlockDataInitProps, TextBlockDataProps, TextGenericType } from "../type";
import { BLOCK_NUMBERED, NumberedBlockMeta } from "../type/types/text";
import { BaseTextBlock } from "./BaseTextBlock";

export class NumberedBlock extends BaseTextBlock<NumberedBlockMeta> {

  constructor(props: BlockDataInitProps<TextGenericType>, meta: NumberedBlockMeta = { order: 0 }) {
    super(props, meta);
    this._type = BLOCK_NUMBERED;
  }

  public setOrder(order: number) {
    this._meta = { order };

    return this;
  }

  public regeneration(props: TextBlockDataProps): [ NumberedBlock, TextBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData<TextGenericType>(props);
    const newBlock = new NumberedBlock(blockData);
    newBlock._meta = this.meta;

    return [ newBlock, preBlockDataProps ];
  }
  
}