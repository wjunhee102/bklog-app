import { Token } from '../utils/token';

/**
 * UUID v4
 */
export type UUID = ReturnType<typeof Token.getUUID>


/**
 * NumberedTextStyles block types
 */
export interface NumberedTextStyles {
  shape: string;
  index: number;
}


/**
 * image block types
 */
export interface ImageStyles {
  width: string;
}

export interface ImageContents {
  url: string;
}

