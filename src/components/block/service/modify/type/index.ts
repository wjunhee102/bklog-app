import { UnionBlockGenericType } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockGenericType, ModifyBlockGenericType, PageInfoProps, PartsModifyData, RawModifyData } from "../../../entities/modify/type";
import { ModifyBlockService } from "../block/ModifyBlockService";
import { ModifyPageService } from "../page/ModifyPageService";

export type ModifyDataTokenServices = ModifyPageService | ModifyBlockService;

export interface ModifyBlockData {
  create?: RawModifyData<ModifyBlockGenericType<UnionBlockGenericType>>[];
  update?: RawModifyData<ModifyBlockGenericType<UnionBlockGenericType>>[];
  delete?: PartsModifyData<ModifyBlockGenericType<UnionBlockGenericType>>[];
}

export interface ModifyBlockDataGenericType {
  token: ModifyBlockToken;
  data: ModifyBlockData;
}

export interface HistoryBlockData {
  create?: RawModifyData<HistoryBlockGenericType<UnionBlockGenericType>>[];
  update?: RawModifyData<HistoryBlockGenericType<UnionBlockGenericType>>[];
  delete?: PartsModifyData<ModifyBlockGenericType<UnionBlockGenericType>>[];
}

export interface HistoryBlockDataGenericType {
  token: HistoryBlockToken;
  data: HistoryBlockData;
}

export type UnionModifBlockDataGenericType = ModifyBlockDataGenericType | HistoryBlockDataGenericType;

export type UnionModifyBlockData = ModifyBlockData | HistoryBlockData;

export type UnionModifyData = UnionModifyBlockData | PageInfoProps;

export interface ModifyBklogData {
  pageInfo?: PageInfoProps;
  blockData?: ModifyBlockData;
}