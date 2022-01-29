import { Page } from '.';

function createPageInfo(
  id: string, 
  title: string = "", 
  disclosureScope: number = 5,
  parentId: string | null = null,
  emoji: string | null = null
): Page {
  return {
    id,
    title,
    disclosureScope,
    emoji,
    parentId
  }
}

export default {
  createPageInfo
}