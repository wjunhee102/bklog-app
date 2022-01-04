import { Page } from '.';

function createPageInfo(
  id: string, 
  title: string = "", 
  disclosureScope: number = 5,
  emoji: string | null = null
): Page {
  return {
    id,
    title,
    disclosureScope,
    emoji
  }
}

export default {
  createPageInfo
}