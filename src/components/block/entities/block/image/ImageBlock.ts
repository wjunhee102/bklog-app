import { Block } from "../Block";
import { BlockDataInitProps,  BlockDataProps, Blocks, ImageBlockData, ImageBlockProps, ImageGenericType } from "../type";
import { BlockFrame } from "../abstract/BlockFrame";

export class ImageBlock extends Block<ImageGenericType> implements BlockFrame<ImageGenericType> {

  static get createBlockData() {
    return (props: ImageBlockProps | ImageBlockData) => {
      return Block.createBlockData<ImageGenericType>("image", props);
    }
  }

  constructor(props: BlockDataInitProps<ImageGenericType>) {
    super(props, null);
  }

  regeneration(props: ImageBlockProps) {
    const preBlockDataProps: ImageBlockProps = this.updateBlockData(props);
    const newImageBlock: ImageBlock = new ImageBlock(this.getBlockData as ImageBlockData);

    return {
      newBlock: newImageBlock, 
      preBlockDataProps: preBlockDataProps 
    }
  }

}