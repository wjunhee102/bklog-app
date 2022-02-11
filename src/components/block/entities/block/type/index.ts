import { ContainerBlock } from "../container/ContainerBlock";
import { ImageBlock } from "../image/ImageBlock";
import { BaseTextBlock } from "../text/BaseTextBlock";
import { NumberedBlock } from "../text/NumberedBlock";
import { TextBlock } from "../text/TextBlock";
import { BlockContentsContainer, BlockMetaContainer, BlockStylesContainer, BlockTypeContainer } from "./types/container";
import { BlockContentsImage, BlockStylesImage, BlockTypeImage } from "./types/image";
import { BlockContentsText, BlockMetaText, BlockStylesText, BlockTypeText } from "./types/text";
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

export type UnionBlockGenericType = TextGenericType 
  | TitleGenericType 
  | ContainerGenericType 
  | ImageGenericType;

export interface RawBlockData<T extends UnionBlockGenericType> {
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

// blockData
export type BlockData<T extends UnionBlockGenericType> = RawBlockData<T> & FrameBlockData;

// blockDataProps
export type RawBlockDataProps<T extends UnionBlockGenericType> = {
  [Property in keyof RawBlockData<T>]?: RawBlockData<T>[Property];
}

export type FrameBlockDataProps = {
  [Property in keyof FrameBlockData]?: FrameBlockData[Property];  
}

export type BlockDataInitProps<T extends UnionBlockGenericType> = RawBlockData<T> & FrameBlockDataProps; 
export type BlockDataProps<T extends UnionBlockGenericType>     = RawBlockDataProps<T> & FrameBlockDataProps;

// title
export type TitleRawBlockData   = RawBlockData<TitleGenericType>;
export type TitleBlockData      = BlockData<TitleGenericType>;
export type TitleBlockDataProps = BlockDataProps<TitleGenericType>;

// text
export type TextRawBlockData   = RawBlockData<TextGenericType>;
export type TextBlockData      = BlockData<TextGenericType>;
export type TextBlockDataProps = BlockDataProps<TextGenericType>;

// container
export type ContainerRawBlockData   = RawBlockData<ContainerGenericType>;
export type ContainerBlockData      = BlockData<ContainerGenericType>;
export type ContainerBlockDataProps = BlockDataProps<ContainerGenericType>;

// image 
export type ImageRawBlockData   = RawBlockData<ImageGenericType>;
export type ImageBlockData      = BlockData<ImageGenericType>;
export type ImageBlockDataProps = BlockDataProps<ImageGenericType>;

// Union
export type UnionRawBlockData = TitleRawBlockData
  | TextRawBlockData
  | ContainerRawBlockData
  | ImageRawBlockData;

export type UnionBlockData = TitleBlockData 
  | TextBlockData 
  | ContainerBlockData
  | ImageBlockData;

export type UnionBlockDataProps = TitleBlockDataProps
  | TextBlockDataProps
  | ContainerBlockDataProps
  | ImageBlockDataProps;

export type UnionMeta = null | BlockMetaText | BlockMetaContainer;

// Blocks;
export type UnionBlock = BaseTextBlock<BlockMetaText> | TextBlock | NumberedBlock | ImageBlock | ContainerBlock<BlockMetaContainer>;

export type UnionInstanceBlock = typeof BaseTextBlock | typeof TextBlock | typeof NumberedBlock | typeof ImageBlock | typeof ContainerBlock;

// stageData
export interface StagedBlockData<T extends UnionBlockGenericType = UnionBlockGenericType> {
  index: FrameBlockData['index'];
  id: RawBlockData<T>['id'];
  styleType?: string;
  styles?: T['styles'];
  contents?: T['contents']; 
}