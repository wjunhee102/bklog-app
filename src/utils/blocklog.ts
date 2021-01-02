export interface Block {
  type: string;
  props: any[];
  contents: any[];
}

// 블럭 쌓기
export function stackingBlocks(blocks: Block[], newBlock: Block) {
  blocks.push(newBlock);
}