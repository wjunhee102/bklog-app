import { ContainerBlockData, ContainerBlockDataProps, ImageBlockData, ImageBlockDataProps, TextBlockData, TextBlockDataProps, TitleBlockData } from "../type";
import { BLOCK_CONTAINER } from "../type/types/container";
import { BLOCK_IMAGE } from "../type/types/image";
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT, BLOCK_TODO } from "../type/types/text";
import { BLOCK_TITLE } from "../type/types/title";
import { Token } from "./token";

function createTextBlockData({
  id, index, parentId, previousId, type, styleType, styles, contents
}: TextBlockDataProps): TextBlockData {
  return {
    id: id? id : Token.getUUID(),
    index: index? index : 0,
    parentId: parentId? parentId : null,
    previousId: previousId? previousId : null,
    type: type? type : "text",
    styleType: styleType? styleType : "bk-p",
    styles: styles? styles : type && type === "todo"? {
      selected: false
    } : null,
    contents: contents? contents : []
  }
}

function createTitleBlockData({
  contents
}: TitleBlockData): TitleBlockData {
  return {
    id: "title",
    index: 0,
    parentId: "title",
    previousId: null,
    type: "title",
    styleType: "bk-title",
    styles: {},
    contents: contents? contents : ""
  }
}

function createContainerBlockData({
  id, index, parentId, previousId, type, styleType, styles, contents
}: ContainerBlockDataProps): ContainerBlockData {
  return {
    id: id? id : Token.getUUID(),
    index: index? index : 0,
    parentId: parentId? parentId : null,
    previousId: previousId? previousId : null,
    type: type? type : "container",
    styleType: styleType? styleType : "bk-container",
    styles: styles? styles : null,
    contents: contents? contents : null
  }
}

function createImageBlockData({
  id, index, parentId, previousId, type, styleType, styles, contents
}: ImageBlockDataProps): ImageBlockData {
  return {
    id: id? id : Token.getUUID(),
    index: index? index : 0,
    parentId: parentId? parentId : null,
    previousId: previousId? previousId : null,
    type: type? type : "image",
    styleType: styleType? styleType : "bk-image",
    styles: styles? styles : {
      width: "150px"
    },
    contents: contents? contents : {
      url: ""
    }
  }
}

const createBlockDataTable = {
  [BLOCK_TEXT]      : createTextBlockData,
  [BLOCK_BULLETED]  : createTextBlockData,
  [BLOCK_NUMBERED]  : createTextBlockData,
  [BLOCK_TODO]      : createTextBlockData,
  [BLOCK_TITLE]     : createTitleBlockData,
  [BLOCK_CONTAINER] : createContainerBlockData,
  [BLOCK_IMAGE]     : createImageBlockData
}

export default {
  createBlockDataTable
}