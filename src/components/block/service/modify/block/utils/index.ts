import { BlockData, BlockDataProps, RawBlockData, RawBlockDataProps, UnionBlockGenericType } from "../../../../entities/block/type";
import { ModifyBlockToken } from "../../../../entities/modify/block/ModifyBlockToken";
import { COMMAND_CREATE, COMMAND_DELETE, COMMAND_UPDATE, UnionModifyBlockToken } from "../../../../entities/modify/type";
import { ModifyBlockDataGenericType, UnionModifBlockDataGenericType } from "../../type";

function commandCreateHandler<T extends UnionModifyBlockToken = ModifyBlockToken>(modifyDataTokenList: T[], { command, payload }: T, index: number) {  
  if(command === COMMAND_DELETE) {
    modifyDataTokenList.splice(index, 1);
  } else {
    modifyDataTokenList[index].updatePayload(payload);
  }
}

function commandUpdateHandler<T extends UnionModifyBlockToken = ModifyBlockToken>(modifyDataTokenList: T[], { command , payload }: T, index: number) {
  if(command === COMMAND_DELETE) {
    modifyDataTokenList[index].changeCommand(command);
  } else {
    modifyDataTokenList[index].updatePayload(payload);
    if(command === COMMAND_CREATE) modifyDataTokenList[index].changeCommand(command);
  }
}

function commandDeleteHandler<T extends UnionModifyBlockToken = ModifyBlockToken>(modifyDataTokenList: T[], { command , payload }: T, index: number) {
  if(command !== COMMAND_DELETE) {
    modifyDataTokenList[index].updatePayload(payload);
    modifyDataTokenList[index].changeCommand(command);
  } 
}

const PushModifyHandlers = {
  [COMMAND_CREATE]: commandCreateHandler,
  [COMMAND_UPDATE]: commandUpdateHandler,
  [COMMAND_DELETE]: commandDeleteHandler
}

export function pushModifyBlockToken<T extends UnionModifyBlockToken = ModifyBlockToken>(
  preModifyDataTokenList: T[], 
  newModifyDataTokenList: T[],
  reverse: boolean = false
): T[] {
  if(!newModifyDataTokenList[0]) return preModifyDataTokenList;

  const modifyDataTokenList = preModifyDataTokenList.concat();
  const length = newModifyDataTokenList.length;

  if(reverse) newModifyDataTokenList.reverse();

  for(let i = 0; i < length; i++) {
    const newToken = newModifyDataTokenList[i];

    const index: number = modifyDataTokenList.findIndex(token => token.id === newToken.id);

    if(index !== -1) {
      const command = modifyDataTokenList[index].command;

      if(PushModifyHandlers.hasOwnProperty(command)) {
        PushModifyHandlers[command](modifyDataTokenList, newToken, index);
      }

    } else {
      modifyDataTokenList.push(newToken);
    }
  }

  return modifyDataTokenList;
}

export function convertRawBlockData<T extends UnionBlockGenericType>(blockDataProps: BlockData<T> | BlockDataProps<T>, id: boolean = false): RawBlockData<T> | RawBlockDataProps<T> {
  const rawData = Object.assign({}, blockDataProps, { index: undefined });

  delete rawData.index;

  if(id) {
    rawData.id = undefined;
    delete rawData.id;
  }

  return rawData;
}

function modifyDataReducer<T extends ModifyBlockDataGenericType = ModifyBlockDataGenericType>(length: number = 7) {
  return function (acc: T["data"], cur: T["token"]) {
    switch (cur.command) {
      case COMMAND_CREATE:

        const rawData = cur.getRawData();

        if(Object.keys(rawData.payload).length === length) acc.create?.push(rawData);

        break;
  
      case COMMAND_UPDATE:

        acc.update?.push(cur.getRawData());

        break;
  
      case COMMAND_DELETE:

        acc.delete?.push({
          id: cur.id,
          type: cur.type
        });
        
        break;
    }
  
    return acc;
  } 
}

export function convertModifyBlockData<T extends UnionModifBlockDataGenericType>(tokenList: T["token"][], length: number = 7): T["data"] | null {
  if(!tokenList[0]) return null;

  const modifyBlockData = tokenList.reduce(modifyDataReducer<T>(length), {
    create: [],
    update: [],
    delete: []
  } as T["data"]);

  if(!modifyBlockData.create || !modifyBlockData.create[0]) {
    modifyBlockData.create = undefined;
    delete modifyBlockData.create;
  }

  if(!modifyBlockData.update || !modifyBlockData.update[0]) {
    modifyBlockData.update = undefined;
    delete modifyBlockData.update;
  }

  if(!modifyBlockData.delete || !modifyBlockData.delete[0]) {
    modifyBlockData.delete = undefined;
    delete modifyBlockData.delete;
  }

  if(Object.keys(modifyBlockData).length < 1) {
    return null;
  }

  return modifyBlockData;
}