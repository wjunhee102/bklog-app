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
export const BOLD = "b" as const;
export const ITALY = "i" as const;
export const UNDERBAR = "_" as const;
export const FONT_COLOR = "fc" as const;
export const BACKGROUND_COLOR = "bc" as const;
export const ANCHOR = "a" as const;
export const FONT = "f" as const;

export type TEXT_STYLE_TYPE = typeof BOLD
  | typeof ITALY
  | typeof UNDERBAR
  | typeof FONT_COLOR
  | typeof BACKGROUND_COLOR
  | typeof ANCHOR
  | typeof FONT;

export type TextContentStyleType = [typeof BOLD] 
| [typeof ITALY] 
| [typeof UNDERBAR] 
| [typeof ANCHOR, string] 
| [typeof FONT_COLOR, string] 
| [typeof BACKGROUND_COLOR, string];

export type TextContentType = [string] | [string, TextContentStyleType[]];

// meta
export type NumberedBlockMeta = {
  order: number;
}

export type BlockTypeText     = typeof BLOCK_TEXT | typeof BLOCK_NUMBERED | typeof BLOCK_BULLETED | typeof BLOCK_TODO;
export type BlockStylesText   = TodoStylesType | null;
export type BlockContentsText = TextContentType[];
export type BlockMetaText     = null | NumberedBlockMeta;

export type OrderType = 'add' | 'del' | 'color' | 'link';