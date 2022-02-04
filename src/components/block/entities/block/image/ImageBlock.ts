import { Block } from "../abstract/Block";
import { BlockDataInitProps, ImageBlockData, ImageBlockDataProps, ImageGenericType } from "../type";
import { BlockFrame } from "../abstract/BlockFrame";

export class ImageBlock extends Block<ImageGenericType> implements BlockFrame<ImageGenericType> {

  static get createBlockData() {
    return (props: ImageBlockDataProps | ImageBlockData) => {
      return Block.createBlockData<ImageGenericType>("image", props);
    }
  }

  constructor(props: BlockDataInitProps<ImageGenericType>) {
    super(props, null);
  }

  regeneration(props: ImageBlockDataProps): [ ImageBlock, ImageBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData(props);
    const newImageBlock: ImageBlock = new ImageBlock(blockData);

    return [ newImageBlock, preBlockDataProps ];
  }

}