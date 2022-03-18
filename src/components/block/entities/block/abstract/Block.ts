import { 
  BlockData, 
  RawBlockData, 
  BlockDataProps, 
  UnionBlockGenericType, 
  BlockDataInitProps,
  UnionMeta,
  RawBlockDataProps,
  KeyofBlockDataProps
} from "../type";
import { createBlockDataTable } from "../utils";

export abstract class Block<T extends UnionBlockGenericType = UnionBlockGenericType, Meta extends UnionMeta = null> {

  private   _id:        BlockData<T>['id']        = "none";

  protected _index:      BlockData<T>['index']      = 0;
  protected _previousId: BlockData<T>['previousId'] = null;
  protected _parentId:   BlockData<T>['parentId']   = null;
  protected _type:       BlockData<T>['type']       = "text";
  protected _styleType:  BlockData<T>['styleType']  = "none";
  protected _styles:     BlockData<T>['styles']     = null;
  protected _contents:   BlockData<T>['contents']   = [];

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
    previousId,
    id,
    type,
    styleType,
    styles,
    contents
  }: BlockDataInitProps<T> | BlockData<T>) {
    this._index = index? index : 0;
    this._parentId = parentId;
    this._previousId = previousId;
    this._id = id;
    this._type = type;
    this._styleType = styleType;
    this._contents = contents;
    this._styles = styles;
  }

  get index() {
    return this._index;
  }

  get id(): string {
    return this._id;
  }

  get previousId() {
    return this._previousId;
  }

  get parentId() {
    return this._parentId;
  }

  get type() {
    return this._type;
  }

  get styleType() {
    return this._styleType;
  }

  get styles() {
    return this._styles;
  }

  get contents() {
    return this._contents;
  }

  get meta() {
    return this._meta;
  }


  public getRawBlockData(): RawBlockData<T> {
    return {
      id: this._id,
      previousId: this._previousId,
      parentId: this._parentId,
      type: this._type,
      styleType: this._styleType,
      contents: this._contents,
      styles: this._styles
    }
  }

  public getBlockData(): BlockData<T> {
    return {
      index: this._index,
      previousId: this._previousId,
      parentId: this._parentId,
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

  public updateBlockData<G extends UnionBlockGenericType = UnionBlockGenericType>(props: BlockDataProps<G>): [ BlockData<G>, RawBlockDataProps<G> ] {
    const preBlockDataProps: BlockDataProps<T> = {};

    for(const key in props) {
      Object.assign(preBlockDataProps, {
        [key as KeyofBlockDataProps<T>]: this[`_${key as KeyofBlockDataProps<T>}`]
      });
    }

    return [ 
      Object.assign({}, this.getBlockData(), props), 
      Object.assign(preBlockDataProps) 
    ];
  }

  public updateBlock<G extends UnionBlockGenericType = UnionBlockGenericType>(props: BlockDataProps<G>): BlockDataProps<G> {
    const preBlockDataProps: BlockDataProps<T> = {};

    for(const key in props) {
      if(this[`_${key as KeyofBlockDataProps<T>}`] === props[key as KeyofBlockDataProps<T>]) continue;
      
      preBlockDataProps[key as KeyofBlockDataProps<T>] = this[`_${key as KeyofBlockDataProps<T>}`] as never;
      this[`_${key as KeyofBlockDataProps<T>}`] = props[key as KeyofBlockDataProps<T>] as never;
    }

    return preBlockDataProps;
  }

}