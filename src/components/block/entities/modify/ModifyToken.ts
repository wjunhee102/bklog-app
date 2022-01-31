import { ModifyCommand, ModifySet } from "./type";


export class ModifyingToken<T = any> {
 
  command: ModifyCommand;
  blockId: string;
  set: ModifySet;
  payload: T;
  
  constructor() {

  }

}