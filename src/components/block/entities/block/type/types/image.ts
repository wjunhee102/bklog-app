// type
export const BLOCK_IMAGE = "image" as const;

// styles
export interface ImageStyles {
  width: string;
}

// contents
export interface ImageContents {
  url: string;
}

export type BlockTypeImage     = typeof BLOCK_IMAGE;
export type BlockStylesImage   = ImageStyles;
export type BlockContentsImage = ImageContents;