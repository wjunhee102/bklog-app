import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { ModifyPageDataToken } from "../../entities/modify/page/ ModifyPageDataToken";
import { ModifyData, UnionModifyGenericType } from "../../entities/modify/type";
import { ModifyBlockService } from "./block/ModifyBlockService";
import { ModifyPageService } from "./page/ModifyPageService";
import { ModifyBklogData } from "./type";

interface ModifyServiceProps {
  modifyBlockTokenList?: ModifyBlockToken[];
  modifyPageTokenList?: ModifyPageDataToken[];
}
export class ModifyService {
  private modifyBlockService: ModifyBlockService | null = null;
  private modifyPageService: ModifyPageService | null = null;
  
  static createModifyData<P extends UnionModifyGenericType>(
    id: string,
    type: string,
    command: P["command"],
    set: P["set"],
    payload: P["payload"]
  ): ModifyData<P> {
    return {
      id,
      type,
      command,
      set,
      payload
    }
  } 

  private init({
    modifyBlockTokenList,
    modifyPageTokenList
  }: ModifyServiceProps) {
    if(modifyBlockTokenList) {
      this.modifyBlockService = new ModifyBlockService(modifyBlockTokenList);
    }
    if(modifyPageTokenList) {
      this.modifyPageService = new ModifyPageService(modifyPageTokenList)
    }
  }

  constructor(props: ModifyServiceProps, merge: boolean = false) {
    this.init(props);
    if(merge) this.merge();
  }

  public merge(): ModifyService {
    if(this.modifyBlockService) this.modifyBlockService.merge();
    if(this.modifyPageService) this.modifyPageService.merge();

    return this;
  }

  public getData(): ModifyBklogData | null {
    const modifyBklogData: ModifyBklogData = {};

    if(this.modifyBlockService) {
      const modifyBlockData = this.modifyBlockService.getData();
      if(modifyBlockData) modifyBklogData.blockData = modifyBlockData;
    }

    if(this.modifyPageService) {
      const modifyPageInfo = this.modifyPageService.getData();
      if(modifyPageInfo) modifyBklogData.pageInfo = modifyPageInfo;
    }

    if(Object.keys(modifyBklogData).length < 1) return null;

    return modifyBklogData;
  }
  
}