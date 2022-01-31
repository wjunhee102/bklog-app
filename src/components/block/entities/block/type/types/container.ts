// type
export const BLOCK_CONTAINER     = "container" as const;

// styles
export type ContainerStyles = any;

// contents
export type ContainerContents = any;

export type BlockTypeContainer     = typeof BLOCK_CONTAINER;
export type BlockStylesContainer   = ContainerStyles;
export type BlockContentsContainer = ContainerContents;