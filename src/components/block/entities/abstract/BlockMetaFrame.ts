

export abstract class BlockMetaFrame<T> {
  private meta: T

  public getMeta() {
    this.meta;
  };

  public abstract setMeta: (payload: any) => this;
}