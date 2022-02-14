import { UnionBlockGenericType } from "../../block/type";
import { ModifyDataToken } from "../ModifyDataToken";
import { ModifyBlockDataProps, ModifyBlockGenericType, ModifyData, RawModifyData, SET_BLOCK } from "../type";

export class ModifyBlockToken<T extends UnionBlockGenericType = UnionBlockGenericType> extends ModifyDataToken<ModifyBlockGenericType<T>> {

  constructor({ id, command, payload }: ModifyData<ModifyBlockGenericType<T>> | ModifyBlockDataProps<T>) {
    super({ id, set: SET_BLOCK, command, payload });
  }

  public getRawData(): RawModifyData<ModifyBlockGenericType<T>> {
    const payload = Object.assign(this.payload, { index: undefined, parentId: undefined });

    delete payload.index;
    delete payload.parentId;

    return {
      id: this.id,
      payload
    }
  }

  public changeCommand(command: ModifyBlockGenericType<T>["command"]): ModifyBlockToken<T> {
    this.setCommand(command);
    return new ModifyBlockToken<T>(this.getData());
  }
  
}