import { v4 as uuidv4 } from 'uuid';

export const BOLD = "b" as const;
export const ITALY = "i" as const;
export const UNDERBAR = "_" as const;
export const FONT_COLOR = "fc" as const;
export const BACKGROUND_COLOR = "bc" as const;
export const ANCHOR = "a" as const;

export const BK_BOLB = "bk-bold" as const;
export const BK_ITALIC = "bk-italic" as const;
export const BK_UNDER = "bk-underbar" as const;
export const BK_COLOR = "color" as const;
export const BK_BACKGROUND_COLOR = "background" as const;

export type ContentType = ["b"] | ["i"] | ["_"] | ["a", string] | ["fc", string] | ["bc", string];

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof uuidv4>

/**
 * Block에서 외부로 보여지는 속성
 */
export interface BlockProp {
  type: string;
  styles?: {
    color?: string;
    backgroundColor?: string;
  }
  contents: any;
}

/**
 * 기본 데이터
 */
export interface BlockData {
  id: UUID | string;
  type: string;
  parentId: UUID | string | null;
  preBlockId: UUID | string | null;
  nextBlockId: UUID | string | null;
  property?: BlockProp | null;
  children?: any[];
}