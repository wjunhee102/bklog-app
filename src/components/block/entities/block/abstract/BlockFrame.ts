import { BlockDataProps, UnionBlockGenericType, UnionBlock } from "../type";

export abstract class BlockFrame<T extends UnionBlockGenericType> {

  public abstract regeneration: (props: BlockDataProps<T>) => [
    newBlock: UnionBlock,
    preBlockDataProps: BlockDataProps<T>
  ]

}
