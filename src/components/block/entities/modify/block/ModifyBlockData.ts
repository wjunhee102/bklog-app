import { BlockGenericTypes } from "../../block/type";
import { ModifyDataToken } from "../ModifyToken";
import { ModifyBlockDataProps, ModifyBlockGenericType, ModifyData, SET_BLOCK } from "../type";

export class ModifyBlockDataToken<T extends BlockGenericTypes = any> extends ModifyDataToken<ModifyBlockGenericType<T>> {

  constructor({ id, command, payload }: ModifyData<ModifyBlockGenericType<T>> | ModifyBlockDataProps<T>) {
    super({ id, set: SET_BLOCK, command, payload });
  }
  
}