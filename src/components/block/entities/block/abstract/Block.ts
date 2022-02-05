import { 
  BlockData, 
  RawBlockData, 
  BlockDataProps, 
  UnionBlockGenericType, 
  BlockDataInitProps,
  UnionBlock,
  UnionMeta,
  UnionBlockData,
  UnionRawBlockData,
  RawBlockDataProps
} from "../type";
import { createBlockDataTable } from "../utils";

export abstract class Block<T extends UnionBlockGenericType = UnionBlockGenericType, Meta extends UnionMeta = null> {

  private   _id:        BlockData<T>['id']        = "none";

  protected _index:     BlockData<T>['index']     = 0;
  protected _parentId:  BlockData<T>['parentId']  = "null";
  protected _position:  BlockData<T>['position']  = "0";
  protected _type:      BlockData<T>['type']      = "text";
  protected _styleType: BlockData<T>['styleType'] = "none";
  protected _styles:    BlockData<T>['styles']    = null;
  protected _contents:  BlockData<T>['contents']  = [];

  static createBlockData<T extends UnionBlockGenericType>(type: T["type"], props: BlockDataProps<T>): BlockData<T> | null {
    if(createBlockDataTable.hasOwnProperty(type)) {
      return createBlockDataTable[type as T['type']](props as never);
    } 

    return null;
  }

  constructor(props: BlockDataInitProps<T> | BlockData<T>, protected _meta: Meta) {
    this.init(props);
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
  }: BlockDataInitProps<T> | BlockData<T>) {
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

  get meta(): Meta {
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

  get getBlockData(): BlockData<T> {
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

  public updateBlockData<G extends UnionBlockGenericType = T>(props: BlockDataProps<G>): RawBlockDataProps<G> {
    const keyList = Object.keys(props) as Array<keyof BlockDataProps<T>>;
    
    if(keyList.length < 0) throw new Error("props null");

    const preBlockDataProps: BlockDataProps<T> = {};

    for(const key of keyList) {
      preBlockDataProps[key] = this[`_${key}`] as any;
      this[`_${key}`] = props[key] as never;
    }

    preBlockDataProps.index = undefined;
    preBlockDataProps.parentId = undefined;

    return preBlockDataProps;
  }

}