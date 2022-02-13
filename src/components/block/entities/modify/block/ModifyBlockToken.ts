import { UnionBlockGenericType } from "../../block/type";
import { ModifyDataToken } from "../ModifyDataToken";
import { ModifyBlockDataProps, ModifyBlockGenericType, ModifyData, RawModifyBlockData, SET_BLOCK } from "../type";

export class ModifyBlockToken<T extends UnionBlockGenericType = UnionBlockGenericType> extends ModifyDataToken<ModifyBlockGenericType<T>> {

  constructor({ id, command, payload }: ModifyData<ModifyBlockGenericType<T>> | ModifyBlockDataProps<T>) {
    super({ id, set: SET_BLOCK, command, payload });
  }

  public getRawData(): RawModifyBlockData {
    return {
      id: this.id,
      payload: Object.assign(this.payload, { index: undefined, parentId: undefined })
    }
  }

  public changeCommand(command: ModifyBlockGenericType<T>["command"]): ModifyBlockToken<T> {
    this.setCommand(command);
    return new ModifyBlockToken<T>(this.getData());
  }
  
}