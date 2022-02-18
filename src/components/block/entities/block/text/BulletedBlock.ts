import { BlockDataInitProps, TextBlockDataProps, TextGenericType } from "../type";
import { BLOCK_BULLETED } from "../type/types/text";
import { BaseTextBlock } from "./BaseTextBlock";

export class BulletedBlock extends BaseTextBlock<null> {

  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props, null);
    this._type = BLOCK_BULLETED;
  }

  public regeneration(props: TextBlockDataProps): [ BulletedBlock, TextBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData<TextGenericType>(props);
    const newBlock = new BulletedBlock(blockData);
    newBlock._meta = this.meta;

    return [ newBlock, preBlockDataProps ];
  }

}