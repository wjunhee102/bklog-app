import { BLOCK_BULLETED, BLOCK_IMAGE, BLOCK_NUMBERED, BLOCK_TEXT, BLOCK_TITLE } from "../../types";
import BulletedBlock from "./elements/bulleted/BulletedBlock";
import ImageBlock from "./elements/image/ImageBlock";
import NumberedBlock from "./elements/numbered";
import TextBlock from "./elements/text";
import TitleBlock from "./elements/title";

export default {
  [BLOCK_TEXT]     : TextBlock,
  [BLOCK_NUMBERED] : NumberedBlock,
  [BLOCK_BULLETED] : BulletedBlock,
  [BLOCK_TITLE]    : TitleBlock,
  [BLOCK_IMAGE]    : ImageBlock
}