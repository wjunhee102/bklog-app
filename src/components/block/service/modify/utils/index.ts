import { ModifyDataTokens } from "../../../entities/modify/type";

export function compareFunction(a: ModifyDataTokens, b: ModifyDataTokens) {
  return a.timestamp - b.timestamp;
}

export function compareFunctionReverce(a: ModifyDataTokens, b: ModifyDataTokens) {
  return b.timestamp - a.timestamp;
}

export function pushModifyDataToken<T extends ModifyDataTokens>(
  preModifyDataTokenList: T[], 
  newModifyDataTokenList: T[]
): T[] {

  if(!newModifyDataTokenList[0]) return preModifyDataTokenList;

  const modifyDataTokenList = preModifyDataTokenList.concat();

  newModifyDataTokenList.sort(compareFunctionReverce);

  while(newModifyDataTokenList[0]) {
    const newToken = newModifyDataTokenList.pop();

    const index: number = modifyDataTokenList.findIndex(token => token.id === newToken.id);

    if(index !== -1) {
      modifyDataTokenList[index].updatePayload(newToken.payload);
    } else {
      modifyDataTokenList.push(newToken);
    }

  }

  return modifyDataTokenList;
}