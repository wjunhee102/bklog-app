// type
export const BLOCK_TEXT     = "text" as const;
export const BLOCK_TODO     = "todo" as const;
export const BLOCK_NUMBERED = "numbered" as const;
export const BLOCK_BULLETED = "bulleted" as const;

// styles
export type TodoStylesType = {
  selected: boolean;
}

// contents
export type TextContentStyleType = ["b"] 
| ["i"] 
| ["_"] 
| ["a", string] 
| ["fc", string] 
| ["bc", string];

export type TextContentType = [string] | [string, TextContentStyleType[]];

// meta
export type NumberedBlockMeta = {
  order: number;
}

export type BlockTypeText     = typeof BLOCK_TEXT | typeof BLOCK_NUMBERED | typeof BLOCK_BULLETED | typeof BLOCK_TODO;
export type BlockStylesText   = TodoStylesType | null;
export type BlockContentsText = TextContentType[];
export type BlockMetaText     = null | NumberedBlockMeta;