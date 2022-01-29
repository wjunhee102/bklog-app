import { BlockDataInitProps, TextBlockData, TextBlockProps, TextGenericType } from "../type";
import { TextBlock } from "./TextBlock";

export class NumberedBlock extends TextBlock {
  type: "numbered";
  meta: { order: number; }; 

  constructor(props: BlockDataInitProps<TextGenericType>) {
    super(props);
    
    this.type = "numbered";
    this.setOrder(0);
  }

  public setOrder(order: number) {
    this.setMeta({ order });
  }

  public update(props: TextBlockProps) {
    const numberedBlock = new NumberedBlock(Object.assign({}, this.getBlockData, props));
    numberedBlock.setMeta(this.getMeta.order);

    return numberedBlock;
  }
}