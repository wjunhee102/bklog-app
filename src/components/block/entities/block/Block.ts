import { 
  BlockData, 
  RawBlockData, 
  BlockDataProps, 
  BlockGenericTypes, 
  BlockDataInitProps,
} from "./type";
import { createBlockDataHandler } from "./utils";
export abstract class Block<T extends BlockGenericTypes = BlockGenericTypes, TMeta = any> {
  private _index: number = 0;
  private _parentId: string = "null";
  private _position: string = "0";
  private _id: string = "none";
  private _type: T['type'] = "text";
  private _styleType: string = "none";
  private _styles: T['styles'] = null;
  private _contents: T['contents'] = [];
  // mount된 후 정보를 담는 property
  private _meta: TMeta;

  static createBlockData<T extends BlockGenericTypes>(type: T["type"], props: BlockDataProps<T>): BlockData | null {
    if(createBlockDataHandler.hasOwnProperty(type)) {
      return createBlockDataHandler[type as T["type"]](props as never);
    } 

    return null;
  }

  constructor(props: BlockDataInitProps<T>, meta: TMeta) {
    this.init(props);
    this.setMeta(meta);
  }

  private init({
    index,
    parentId,
    position,
    id,
    type,
    styleType,
    styles,
    contents
  }: BlockDataInitProps<T>) {
    this._index = index? index : 0;
    this._parentId = parentId? parentId : "null",
    this._position = position,
    this._id = id,
    this._type = type,
    this._styleType = styleType,
    this._contents = contents,
    this._styles = styles
  }

  get index(): number {
    return this._index;
  }

  get parentId(): string {
    return this._parentId;
  }

  get position(): string {
    return this._position;
  }

  get id(): string {
    return this._id;
  }

  get type(): T["type"] {
    return this._type;
  }

  get styleType(): string {
    return this._styleType;
  }

  get styles(): T["styles"] {
    return this._styles;
  }

  get contents(): T["contents"] {
    return this._contents;
  }

  get meta(): TMeta | null {
    return this._meta;
  }


  get getRawBlockData(): RawBlockData<T> {
    return {
      position: this._position,
      id: this._id,
      type: this._type,
      styleType: this._styleType,
      contents: this._contents,
      styles: this._styles
    }
  }

  get getBlockData(): BlockData {
    return {
      index: this._index,
      parentId: this._parentId,
      position: this._position,
      id: this._id,
      type: this._type,
      styleType: this._styleType,
      contents: this._contents,
      styles: this._styles
    }
  }

  public setIndex(index: number) {
    this._index = index;
    
    return this;
  }

  public setParentId(parentId: string) {
    this._parentId = parentId;

    return this;
  }

  public setPosition(position: string) {
    this._position = position;

    return this;
  }

  public setType(type: T["type"]) {
    this._type = type;

    return this;
  }

  public setStyleType(styleType: string) {
    this._styleType = styleType;

    return this;
  }

  public setMeta(meta: TMeta) {
    this._meta = meta;

    return this;
  }
  
  public updateBlockData(props: BlockDataProps<T>): BlockDataProps<T> {
    let preBlockDataProps: BlockDataProps<T>;

    for(const key in props) {
      preBlockDataProps[key] = this[`_${key}`];
      this[`_${key}`] = props[key];
    }

    if(!preBlockDataProps) throw new Error(`${this.id} updateBlockData not props`);

    return preBlockDataProps;
  }
}
