import { v4 as uuidv4 } from 'uuid';
import { Token } from '../../utils/token';
import BlockTypes from '../../components/block/types';
/**
 * UUID v4
 */
export type UUID = BlockTypes.UUID;

/**
 * text block types
 */
export type ContentType = BlockTypes.ContentType;

export type TextContents = BlockTypes.TextContents

/**
 * Block에서 외부로 보여지는 속성
 * type: string;
 * style?: {
 *  color?: string;
 *  backgroundColor: string;
 * }
 * contents: any;
 */
export type TextProps = BlockTypes.TextProps;

export type RawBlockData<T = any> = BlockTypes.RawBlockData<T>;

export type BlockData<T = any> = BlockTypes.BlockData<T>;