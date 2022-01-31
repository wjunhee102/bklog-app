import { BLOCK_NUMBERED, BLOCK_TEXT } from "../type/types/text";
import { NumberedBlock } from "./NumberedBlock";
import { TextBlock } from "./TextBlock";


export const TextBlockTable = {
  [BLOCK_TEXT]    : TextBlock,
  [BLOCK_NUMBERED]: NumberedBlock   
}
