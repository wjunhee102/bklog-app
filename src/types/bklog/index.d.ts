import { v4 as uuidv4 } from 'uuid';

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof uuidv4>

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
export interface TextProps {
  type: string;
  styles: {
    color: string | null;
    backgroundColor: string | null;
  }
  contents: TextContents[];
}

export interface RawBlockData<Props = any> {
  id: UUID | string;
  type: string;
  parentBlockId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  // 수정할 것.
  property: Props;
  children: UUID[];
}

/**
 * Raw Block Data
 */
export interface BlockData<Props = any> {
  index: number;
  id: UUID | string;
  type: string;
  parentBlockId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  // 수정할 것.
  property: Props;
  children: UUID[];
}