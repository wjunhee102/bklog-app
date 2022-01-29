import { RawBlockData } from "../../types";
import { Block } from "../Block";
import { BlockDataInitProps, ImageGenericType, ImageRawBlockData } from "../type";

export class ImageBlock extends Block<ImageGenericType> {

  constructor(props: BlockDataInitProps<ImageGenericType>) {
    super(props)
  }
}