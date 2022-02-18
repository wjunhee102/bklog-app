import { BLOCK_IMAGE } from "../../entities/block/type/types/image";
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT } from "../../entities/block/type/types/text";
import { BLOCK_TITLE } from "../../entities/block/type/types/title";
import BulletedBlockComponent from "./elements/bulleted";
import ImageBlockComponent from "./elements/image";
import NumberedBlockComponent from "./elements/numbered";
import TextBlockComponent from "./elements/text";
import TitleBlockComponent from "./elements/title";

export default {
  [BLOCK_TEXT]     : TextBlockComponent,
  [BLOCK_NUMBERED] : NumberedBlockComponent,
  [BLOCK_BULLETED] : BulletedBlockComponent,
  [BLOCK_TITLE]    : TitleBlockComponent,
  [BLOCK_IMAGE]    : ImageBlockComponent
}