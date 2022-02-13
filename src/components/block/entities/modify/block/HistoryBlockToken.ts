import { UnionBlockGenericType } from "../../block/type";
import { ModifyDataToken } from "../ModifyDataToken";
import { HistoryBlockDataProps, HistoryBlockGenericType, ModifyData, RawHistoryBlockData, RawModifyBlockData, SET_BLOCK } from "../type";


export class HistoryBlockToken<T extends UnionBlockGenericType = UnionBlockGenericType> extends ModifyDataToken<HistoryBlockGenericType<T>> {
  
  constructor({ id, command, payload }: ModifyData<HistoryBlockGenericType<T>> | HistoryBlockDataProps<T>) {
    super({ id, set: SET_BLOCK, command, payload });
  }

  public getRawData(): RawHistoryBlockData<T> {
    return {
      id: this.id,
      payload: this.payload
    }
  }

  public changeCommand(command: HistoryBlockGenericType<T>['command']): HistoryBlockToken<T> {
    this.setCommand(command);
    return new HistoryBlockToken<T>(this.getData());
  }

}