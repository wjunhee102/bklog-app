import { Blocks } from "../../entities/block/type";

export class BlockService {
  blockList: Blocks[] = [];
  modifyTokenList: any[] = [];
  preBlockDataList: {
    create: [];
    update: [];
    delete: []; 
  }

  constructor(blockList: Blocks[]) {
    this.init(blockList);
  }

  private init(blockList: Blocks[]) {
    this.blockList.push(...blockList);
  }

  ordering() {

  }


}