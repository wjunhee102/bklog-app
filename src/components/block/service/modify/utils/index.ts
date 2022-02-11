import { UnionModifyDataToken } from "../../../entities/modify/type";

export function compareFunction(a: UnionModifyDataToken, b: UnionModifyDataToken) {
  return a.timestamp - b.timestamp;
}

export function compareFunctionReverce(a: UnionModifyDataToken, b: UnionModifyDataToken) {
  return b.timestamp - a.timestamp;
}

export function pushModifyDataToken<T extends UnionModifyDataToken>(
  preModifyDataTokenList: T[], 
  newModifyDataTokenList: T[]
): T[] {
  if(!newModifyDataTokenList[0]) return preModifyDataTokenList;

  const modifyDataTokenList = preModifyDataTokenList.concat();

  newModifyDataTokenList.sort(compareFunction);

  for(const newToken of newModifyDataTokenList) {
    const index: number = modifyDataTokenList.findIndex(token => token.id === newToken.id);

    if(index !== -1) {
      modifyDataTokenList[index].updatePayload(newToken.payload);
    } else {
      modifyDataTokenList.push(newToken);
    }
  }

  return modifyDataTokenList;
}