import { ImageBlock } from "../image/ImageBlock";
import { NumberedBlock } from "../text/NumberedBlock";
import { TextBlock } from "../text/TextBlock";
import { BlockContentsContainer, BlockStylesContainer, BlockTypeContainer, BLOCK_CONTAINER } from "./types/container";
import { BlockContentsImage, BlockStylesImage, BlockTypeImage, BLOCK_IMAGE } from "./types/image";
import { BlockContentsText, BlockStylesText, BlockTypeText, BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT } from "./types/text";
import { BlockContentsTitle, BlockStylesTitle, BlockTypeTitle } from "./types/title";

// type
export type BlockType = BlockTypeText | BlockTypeImage | BlockTypeContainer | BlockTypeTitle;

// styles
export type BlockStyles = BlockStylesText | BlockStylesTitle | BlockStylesContainer | BlockStylesImage;

// contents
export type BlockContents = BlockContentsText | BlockContentsTitle | BlockContentsContainer | BlockContentsImage;

/**/

// generic
export interface BlockGenericType<T extends BlockType, Y extends BlockStyles, P extends BlockContents> {
  type: T;
  styles: Y;
  contents: P;
}

export type TextGenericType      = BlockGenericType<BlockTypeText, BlockStylesText, BlockContentsText>;
export type TitleGenericType     = BlockGenericType<BlockTypeTitle, BlockStylesTitle, BlockContentsTitle>;
export type ContainerGenericType = BlockGenericType<BlockTypeContainer, BlockStylesContainer, BlockContentsContainer>;
export type ImageGenericType     = BlockGenericType<BlockTypeImage, BlockStylesImage, BlockContentsImage>;

export type BlockGenericTypes = TextGenericType 
  | TitleGenericType 
  | ContainerGenericType 
  | ImageGenericType;

export interface RawBlockData<T extends BlockGenericTypes> {
  position: string;
  id: string;
  type: T['type'];
  styleType: string;
  styles: T['styles'];
  contents: T['contents'];
}

export interface FrameBlockData {
  index: number;
  parentId: string;
}

// blockDataProps
export interface RawBlockDataProps<T extends BlockGenericTypes> {
  position?: string;
  id?: string;
  type?: T['type'];
  styleType?: string;
  styles?: T['styles'];
  contents?: T['contents'];
}

export interface FrameBlockDataProps {
  index?: number;
  parentId?: string;
}

export type BlockDataInitProps<T extends BlockGenericTypes> = RawBlockData<T> & FrameBlockDataProps; 
export type BlockDataProps<T extends BlockGenericTypes>     = RawBlockDataProps<T> & FrameBlockDataProps;

// title
export type TitleRawBlockData = RawBlockData<TitleGenericType>;
export type TitleBlockData    = FrameBlockData & TitleRawBlockData;
export type TitleBlockProps   = BlockDataProps<TitleGenericType>;

// text
export type TextRawBlockData = RawBlockData<TextGenericType>;
export type TextBlockData    = FrameBlockData & TextRawBlockData;
export type TextBlockProps   = BlockDataProps<TextGenericType>;

// container
export type ContainerRawBlockData = RawBlockData<ContainerGenericType>;
export type ContainerBlockData    = FrameBlockData & ContainerRawBlockData;
export type ContainerBlockProps   = BlockDataProps<ContainerGenericType>;

// image 
export type ImageRawBlockData = RawBlockData<ImageGenericType>;
export type ImageBlockData    = FrameBlockData & ImageRawBlockData;
export type ImageBlockProps   = BlockDataProps<ImageGenericType>;


// blockData
export type BlockData = TitleBlockData 
  | TextBlockData 
  | ContainerBlockData
  | ImageBlockData;

export type BlockProps = TitleBlockProps
  | TextBlockProps
  | ContainerBlockProps
  | ImageBlockProps;


// Blocks;
export type Blocks = TextBlock<any> | NumberedBlock | ImageBlock;