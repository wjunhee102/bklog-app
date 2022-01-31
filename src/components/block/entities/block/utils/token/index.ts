import { v4 as uuidv4 } from 'uuid';

export class Token {
  static getUUID(): string{
    const token: string[] = uuidv4().split('-');
    const uuid: string = token[2] + token[1] + token[0] + token[3] + token[4];
    return uuid;
  }
}