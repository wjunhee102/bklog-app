import { BlockDataProps, BlockGenericTypes, Blocks } from "../type";

export abstract class BlockFrame<T extends BlockGenericTypes> {

  public abstract regeneration: (props: BlockDataProps<T>) => [
    newBlock: Blocks,
    preBlockDataProps: BlockDataProps<T>
  ]

}
