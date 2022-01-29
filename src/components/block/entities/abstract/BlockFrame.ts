import { Block } from "../Block";
import { BlockDataProps, BlockGenericTypes } from "../type";

export abstract class BlockFrame<T extends BlockGenericTypes> {
  public abstract update: (props: BlockDataProps<T>) => Block<T>;
}
