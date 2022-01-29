import { 
  BlockData, 
  RawBlockData, 
  BlockDataProps, 
  BlockGenericTypes, 
  FrameBlockDataProps,
  BlockDataInitProps
} from "./type";
import { createBlockDataHandler } from "./utils";

export class Block<T extends BlockGenericTypes> {
  index: number;
  parentId: string;
  position: string;
  id: string;
  type: T['type'];
  styleType: string;
  styles: T['styles'];
  contents: T['contents'];

  meta: any;

  static createBlockData<T extends BlockGenericTypes>(type: T["type"], props: BlockDataProps<T> | BlockData): BlockData | null {
    if(createBlockDataHandler.hasOwnProperty(type)) {
      return createBlockDataHandler[type as string](props);
    } 

    return null;
  }
  
  constructor(props: BlockDataInitProps<T>) {
    this.init(props);
  }

  init({
    index,
    parentId,
    position,
    id,
    type,
    styleType,
    styles,
    contents
  }: BlockDataInitProps<T>) {
    this.index = index? index : 0;
    this.parentId = parentId? parentId : "null",
    this.position = position,
    this.id = id,
    this.type = type,
    this.styleType = styleType,
    this.contents = contents,
    this.styles = styles
  }

  get getBlockData(): BlockData {
    return {
      index: this.index,
      parentId: this.parentId,
      position: this.position,
      id: this.id,
      type: this.type,
      styleType: this.styleType,
      contents: this.contents,
      styles: this.styles
    }
  }

  get getMeta() {
    return this.meta;
  }

  get getRawBlockData(): RawBlockData<T> {
    return {
      position: this.position,
      id: this.id,
      type: this.type,
      styleType: this.styleType,
      contents: this.contents,
      styles: this.styles
    }
  }

  setMeta(meta: any) {
    this.meta = meta;
  }
}
