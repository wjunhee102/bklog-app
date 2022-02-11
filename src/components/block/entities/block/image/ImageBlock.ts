import { Block } from "../abstract/Block";
import { BlockDataInitProps, ImageBlockData, ImageBlockDataProps, ImageGenericType, ImageRawBlockData } from "../type";
import { BlockFrame } from "../abstract/BlockFrame";

export class ImageBlock extends Block<ImageGenericType, null> implements BlockFrame<ImageGenericType> {

  static get createBlockData() {
    return (props: ImageBlockDataProps | ImageBlockData | ImageRawBlockData) => {
      return Block.createBlockData<ImageGenericType>("image", props);
    }
  }

  constructor(props: BlockDataInitProps<ImageGenericType>, meta = null) {
    super(props, meta);
  }

  public regeneration(props: ImageBlockDataProps): [ ImageBlock, ImageBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData<ImageGenericType>(props);
    const newImageBlock: ImageBlock = new ImageBlock(blockData);

    return [ newImageBlock, preBlockDataProps ];
  }

}