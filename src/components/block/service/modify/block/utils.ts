import { ModifyBlockDataToken } from "../../../entities/modify/block/ModifyBlockData";
import { COMMAND_CREATE, COMMAND_DELETE, COMMAND_UPDATE, ModifyDataTokens, SET_BLOCK } from "../../../entities/modify/type";
import { compareFunctionReverce } from "../utils";

function commandCreateHandler(modifyDataTokenList: ModifyBlockDataToken[], { command, payload }: ModifyBlockDataToken, index: number) {  
  if(command === COMMAND_DELETE) {
    modifyDataTokenList.splice(index, 1);
  } else {
    modifyDataTokenList[index].updatePayload(payload);
  }
}

function commandUpdateHandler(modifyDataTokenList: ModifyBlockDataToken[], { command , payload }: ModifyBlockDataToken, index: number) {
  if(command === COMMAND_DELETE) {
    modifyDataTokenList[index].changeCommand(command);
  } else {
    modifyDataTokenList[index].updatePayload(payload);
    if(command === COMMAND_CREATE) modifyDataTokenList[index].changeCommand(command);
  }
}

function commandDeleteHandler(modifyDataTokenList: ModifyBlockDataToken[], { command , payload }: ModifyBlockDataToken, index: number) {
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

export function pushModifyBlockDataToken(
  preModifyDataTokenList: ModifyBlockDataToken[], 
  newModifyDataTokenList: ModifyBlockDataToken[]
): ModifyBlockDataToken[] {
  
  if(!newModifyDataTokenList[0]) return preModifyDataTokenList;

  const modifyDataTokenList = preModifyDataTokenList.concat();

  newModifyDataTokenList.sort(compareFunctionReverce);

  while(newModifyDataTokenList[0]) {
    
    const newToken = newModifyDataTokenList.pop();

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