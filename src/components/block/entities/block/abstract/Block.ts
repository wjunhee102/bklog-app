import { 
  BlockData, 
  RawBlockData, 
  BlockDataProps, 
  UnionBlockGenericType, 
  BlockDataInitProps,
  FrameBlockData
} from "../type";
import { createBlockDataHandler } from "../utils";

export abstract class Block<T extends UnionBlockGenericType = UnionBlockGenericType, Meta = unknown> {
  private _id: RawBlockData<T>['id']                 = "none";
  protected _index: FrameBlockData['index']          = 0;
  protected _parentId: FrameBlockData['parentId']    = "null";
  protected _position: RawBlockData<T>['position']   = "0";
  protected _type:    RawBlockData<T>['type']        = "text";
  protected _styleType: RawBlockData<T>['styleType'] = "none";
  protected _styles: RawBlockData<T>['styles']       = null;
  protected _contents: RawBlockData<T>['contents']   = [];

  static createBlockData<T extends UnionBlockGenericType>(type: T["type"], props: BlockDataProps<T>): BlockData<T> {
    if(createBlockDataHandler.hasOwnProperty(type)) {
      return createBlockDataHandler[type as T['type']](props as never);
    } 

    throw new Error("not block type");
  }

  constructor(props: BlockDataInitProps<T>, protected _meta: Meta) {
    this.init(props);
    this._meta = _meta;
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
  
  protected updateBlockData(props: BlockDataProps<T>): [ BlockData<T>, BlockDataProps<T> ]{
    if(Object.keys(props).length < 0) throw new Error("props null");

    const preBlockDataPropsList: Array<BlockDataProps<T>> = [];

    for(const key in props) {
      preBlockDataPropsList.push({[`${key}`]: this[`_${key as keyof BlockData<T>}`]} as BlockDataProps<T>);
    }

    return [ Object.assign(this.getBlockData, props) as BlockData<T> , Object.assign({}, ...preBlockDataPropsList) as BlockDataProps<T> ];
  }
}
