import { BlockState, BlockStateProps } from ".";
import { ModifyPageDataToken } from "../../entities/modify/page/ ModifyPageDataToken";
import { BlockService } from "../../service/block/BlockService";
import { HistoryBlockService } from "../../service/modify/block/HistoryBlockService";
import { ModifyPageService } from "../../service/modify/page/ModifyPageService";
import { arrayPush, updateObject } from "../../utils";

function revertBlockState(
  state: BlockState, 
  front: boolean
): BlockState {
  if(!front && state.historyBack[0]) {
    const historyBack = state.historyBack.concat();
    const lastHistoryBack = historyBack.pop();

    if(!lastHistoryBack) return state;

    if(Object.keys(lastHistoryBack).length < 1) {
      return state;
    }

    const editingBlockId = lastHistoryBack.editingBlockId? lastHistoryBack.editingBlockId : null;
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = new BlockService(state.blockList).restoreBlockList(lastHistoryBack).getData();
  
    const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

    if(!historyBlockData) return state;

    const modifyPageTokenList = [];
    let pageTitle: string | null = null;
    let lastPageTitle = state.pageTitle;

    if(lastHistoryBack.pageTitle) {
      pageTitle = lastHistoryBack.pageTitle;
      modifyPageTokenList.push(new ModifyPageDataToken(ModifyPageService.setUpdateModifyData({ title: pageTitle })));
    }

    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId,
      blockList,
      pageTitle: pageTitle? pageTitle : lastPageTitle,
      historyBack,
      historyFront: arrayPush(state.historyFront, {
        editingBlockId: state.editingBlockId,
        pageTitle: pageTitle? lastPageTitle : undefined,
        ...historyBlockData
      }),
      modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
      modifyPageTokenList: [...state.modifyPageTokenList, ...modifyPageTokenList],
      isFetch: true
    });

  } else if(state.historyFront[0]) {
    const historyFront = state.historyFront.concat();
    const lastHistoryFront = historyFront.pop();
    
    if(!lastHistoryFront) return state;

    if(Object.keys(lastHistoryFront).length < 1) {
      return state;
    }

    const editingBlockId = lastHistoryFront.editingBlockId? lastHistoryFront.editingBlockId : null;
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = new BlockService(state.blockList).restoreBlockList(lastHistoryFront).getData();
  
    const historyBlockData = new HistoryBlockService(historyBlockTokenList).getData();

    if(!historyBlockData) return state;

    const modifyPageTokenList = [];
    let pageTitle: string | null = null;
    let lastPageTitle = state.pageTitle;

    if(lastHistoryFront.pageTitle) {
      pageTitle = lastHistoryFront.pageTitle;
      modifyPageTokenList.push(new ModifyPageDataToken(ModifyPageService.setUpdateModifyData({ title: pageTitle })));
    }

    return updateObject<BlockState, BlockStateProps>(state, {
      editingBlockId,
      blockList,
      pageTitle: pageTitle? pageTitle : lastPageTitle,
      historyFront,
      historyBack: arrayPush(state.historyFront, {
        editingBlockId: state.editingBlockId,
        pageTitle: pageTitle? lastPageTitle : undefined,
        ...historyBlockData
      }),
      modifyBlockTokenList: [...state.modifyBlockTokenList, ...modifyBlockTokenList],
      modifyPageTokenList: [...state.modifyPageTokenList, ...modifyPageTokenList],
      isFetch: true
    });

  } else {
    return state;
  }
}

const sideStoreUtils = {
  revertBlockState
}

export default sideStoreUtils;