import { v4 as uuidv4 } from 'uuid';
import { Token } from '../utils/token';

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof Token.getUUID>

/**
 * text block types
 */
export type ContentType = ["b"] 
  | ["i"] 
  | ["_"] 
  | ["a", string] 
  | ["fc", string] 
  | ["bc", string];

export type TextContents = [string] | [string, ContentType[]];

/**
 * Block에서 외부로 보여지는 속성
 * type: string;
 * style?: {
 *  color?: string;
 *  backgroundColor: string;
 * }
 * contents: any;
 */


export interface RawBlockData<T = any, P = any> {
  position: string; // 1,  1-1,  1-2-1
  id: string;
  type: string;
  styleType: string;
  styles: T;
  contents: P;
}

export interface BlockData<T = any, P = any> extends RawBlockData<T, P> {
  index: number;
  parentId: string;
}

export interface RawBlockDataProps<T = any, P = any> {
  position?: string; // 1,  1-1,  1-2-1
  id?: string;
  type?: string;
  styleType?: string;
  styles?: T;
  contents?: P;
}

export interface BlockDataProps<T = any, P = any> extends RawBlockDataProps<T, P> {
  index?: number;
  parentId?: string;
}