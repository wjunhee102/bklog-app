import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { PageInfoProps, RawModifyData } from "../../../entities/modify/type";
import { ModifyBlockService } from "../block/ModifyBlockService";
import { ModifyPageService } from "../page/ModifyPageService";

export type ModifyDataTokenServices = ModifyPageService | ModifyBlockService;

export interface ModifyBlockData {
  create?: Array<RawModifyData>;
  update?: Array<RawModifyData>;
  delete?: Array<string>;
}

export interface ModifyBlockDataGeneticType {
  token: ModifyBlockToken;
  data: ModifyBlockData;
}

export interface HistoryBlockData {
  create?: Array<RawModifyData>;
  update?: Array<RawModifyData>;
  delete?: Array<string>;
}

export interface HistoryBlockDataGeneticType {
  token: HistoryBlockToken;
  data: HistoryBlockData;
}

export type UnionModifBlockDataGenericType = ModifyBlockDataGeneticType | HistoryBlockDataGeneticType;

export type UnionModifyBlockData = ModifyBlockData | HistoryBlockData;

export type UnionModifyData = UnionModifyBlockData | PageInfoProps;

export interface ModifyBklogData {
  pageInfo?: PageInfoProps;
  blockData?: ModifyBlockData;
}