import { Block } from "../abstract/Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockDataInitProps, BlockDataProps, ContainerBlockData, ContainerBlockDataProps, ContainerGenericType, ContainerRawBlockData } from "../type";
import { BlockMetaContainer } from "../type/types/container";


export class ContainerBlock<Meta extends BlockMetaContainer = null> extends Block<ContainerGenericType, Meta> implements BlockFrame<ContainerGenericType> {

  static get createBlockData() {
    return (props: ContainerBlockDataProps | ContainerBlockData | ContainerRawBlockData) => {
      return Block.createBlockData<ContainerGenericType>("container", props);
    }
  }

  constructor(props: BlockDataInitProps<ContainerGenericType>, meta: Meta) {
    super(props, meta);
  }

  public regeneration(props: BlockDataProps<ContainerGenericType>): [ ContainerBlock<Meta>, ContainerBlockDataProps ] {
    const [ blockData, preBlockDataProps ] =  this.updateBlockData<ContainerGenericType>(props);
    const newBlock: ContainerBlock<Meta> = new ContainerBlock<Meta>(blockData, this.meta);

    return [ newBlock, preBlockDataProps ];
  }

}