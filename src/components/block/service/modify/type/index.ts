import { BlockGenericTypes } from "../../../entities/block/type";
import { CreateRawModifyBlockData, DeleteRawModifyBlockData, PageInfoProps, UpdateRawModifyBlockData } from "../../../entities/modify/type";
import { ModifyBlockService } from "../block/ModifyBlockService";
import { ModifyPageService } from "../page/ModifyPageService";

export type ModifyDataTokenServices = ModifyPageService | ModifyBlockService;

export interface ModifyBlockData {
  create?: CreateRawModifyBlockData<BlockGenericTypes>[];
  update?: UpdateRawModifyBlockData<BlockGenericTypes>[];
  delete?: DeleteRawModifyBlockData[];
}

export interface ModifyBklogData {
  modifyPageData?: PageInfoProps;
  modifyBlockData?: ModifyBlockData;
}