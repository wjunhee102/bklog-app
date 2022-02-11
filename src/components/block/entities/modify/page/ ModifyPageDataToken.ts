import { ModifyDataToken } from "../ModifyDataToken";
import { ModifyData, COMMAND_UPDATE, ModifyPageDataProps, ModifyPageGenericType, SET_PAGE } from "../type";

export class ModifyPageDataToken extends ModifyDataToken<ModifyPageGenericType> {

  constructor({ id, payload }: ModifyData<ModifyPageGenericType> | ModifyPageDataProps) {
    super({ id, payload, set: SET_PAGE, command: COMMAND_UPDATE });
  }

}