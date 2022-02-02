import { BlockGenericTypes } from "../../block/type";
import { ModifyDataToken } from "../ModifyToken";
import { ModifyBlockDataProps, ModifyBlockGenericType, ModifyData, RawModifyBlockData, SET_BLOCK } from "../type";

export class ModifyBlockDataToken<T extends BlockGenericTypes = BlockGenericTypes> extends ModifyDataToken<ModifyBlockGenericType<T>> {

  constructor({ id, command, payload }: ModifyData<ModifyBlockGenericType<T>> | ModifyBlockDataProps<T>) {
    super({ id, set: SET_BLOCK, command, payload });
  }

  public getRawData(): RawModifyBlockData {
    return {
      id: this.id,
      set: this.set,
      payload: this.payload
    }
  }

  public changeCommand(command: ModifyBlockGenericType<T>["command"]): ModifyBlockDataToken<T> {
    this.setCommand(command);
    return new ModifyBlockDataToken<T>(this.getData);
  }
  
}