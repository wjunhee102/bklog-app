import { BlockDataInitProps, TextBlockProps, TextGenericType } from "../type";
import { TextBlock } from "./TextBlock";

export class NumberedBlock extends TextBlock<{ order: number }> {

  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props);
    
    this.setType("numbered");
    this.setOrder(0);
  }

  public setOrder(order: number) {
    this.setMeta({ order });

    return this;
  }

  regeneration(props: TextBlockProps) {
    const preBlockDataProps: TextBlockProps = this.updateBlockData(props);

    const newBlock = new NumberedBlock(this.getBlockData as NumberedBlock);
    newBlock.setOrder(this.meta.order);

    return {
      newBlock,
      preBlockDataProps
    }
  }
}