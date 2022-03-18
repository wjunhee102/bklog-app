import { Block } from "../abstract/Block";
import { BlockFrame } from "../abstract/BlockFrame";
import { BlockData, BlockDataInitProps, BlockDataProps, TitleBlockDataProps, TitleGenericType } from "../type";

export class TitleBlock extends Block<TitleGenericType, null> implements BlockFrame<TitleGenericType> {
  
  static createBlockData(title: string): BlockData<TitleGenericType> {
    return {
      index: 0,
      previousId: null,
      parentId: null,
      id: "title",
      type: "title",
      styleType: "title",
      styles: {},
      contents: title
    } as BlockData<TitleGenericType>
  }

  constructor(props: BlockDataInitProps<TitleGenericType>) {
    super(props, null);
  }

  public regeneration(props: BlockDataProps<TitleGenericType>): [ TitleBlock, TitleBlockDataProps ] {
    const [ blockData, preBlockDataProps ] = this.updateBlockData<TitleGenericType>(props);
    const newBlock: TitleBlock = new TitleBlock(blockData);

    return [ newBlock, preBlockDataProps ];
  }

}