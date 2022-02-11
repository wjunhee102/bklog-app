import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { ModifyPageDataToken } from "../../entities/modify/page/ ModifyPageDataToken";
import { ModifyData, SET_BLOCK, SET_PAGE, UnionModifyDataToken, UnionModifyGenericType } from "../../entities/modify/type";
import { ModifyBlockService } from "./block/ModifyBlockService";
import { ModifyPageService } from "./page/ModifyPageService";


export class ModifyService {
  
  static createModifyData<P extends UnionModifyGenericType>(
    id: string,
    command: P["command"],
    set: P["set"],
    payload: P["payload"]
  ): ModifyData<P> {
    return {
      id,
      command,
      set,
      payload
    }
  } 

  constructor(
    readonly modifyBlockService?: ModifyBlockService, 
    readonly modifyPageService?: ModifyPageService
  ) {}


  public push(...modifyData: ModifyBlockToken[]) {
  
  }

  public getData() {
    
  }

}