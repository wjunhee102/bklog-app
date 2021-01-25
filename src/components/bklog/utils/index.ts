import { TextContents, ContentType } from '../../../types/bklog';
import { 
  equalsArray, 
  arrayFindIndex 
} from '../../../store/modules/bklog/utils/converter';

const BOLD = "b" as const;
const ITALY = "i" as const;
const UNDERBAR = "_" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;
const ANCHOR = "a" as const;

const BK_BOLB = "bk-bold";
const BK_ITALIC = "bk-italic";
const BK_UNDER = "bk-underbar";

export const arrayUtils = {
  equalsArray,
  arrayFindIndex
};

export function contentsElement(rawContents: any) {
  let text;
  let className:string | null = null;
  let styles:string | null = null;
  let aTag;

  if(rawContents.length === 2) {
    rawContents[1].forEach((content:string[]) => {
      switch(content[0]) {

        case BOLD:
          styles = styles? styles + " font-weight: 600;" : "font-weight: 600;"
          break;

        case ITALY:
          styles = styles? styles + " font-style: italic;" : "font-style: italic;"
          break;

        case UNDERBAR:
          styles = styles? styles + " border-bottom: 0.05em solid;" : "border-bottom: 0.05em solid;"
          break;

        case FONT_COLOR:
          styles = styles? styles + ` color: ${content[1]};` : `color: ${content[1]};`;
          break;

        case BACKGROUND_COLOR:
          styles = styles? styles + ` background-color: ${content[1]};` : `background-color: ${content[1]};`;
          break;
          
        case ANCHOR:
          aTag = content[1];
      }
    })
    text = `<span${className? ' class="'+ className + '"' : ""}${styles? ' style="' + styles + '"' : ""}>${rawContents[0]}</span>`

    if(aTag) {
      let preText = text;
      text = `<a href="${aTag}">${preText}</a>`;
      console.log(text);
    }
  } else {
    text = rawContents[0];
  }

  return text;
}

export function createContentsElement(accumulator: string, rawContents: any, currentIndex: number):string {
  console.log(rawContents)
  return currentIndex === 1?  contentsElement(accumulator) + contentsElement(rawContents) : accumulator + contentsElement(rawContents);
}

export function findTextStyle(
  textContents: TextContents[], 
  position: number
  ): ContentType[] | null | undefined {

  let count: number = 0;
  let style: ContentType[] | null | undefined = null;

  for(let i = 0; i < textContents.length; i++) {
    count += textContents[i][0].length;
    console.log(count, position);
    if(count > position) {
      style = textContents[i].length === 2? textContents[i][1] : null;
      break;
    } 
  }

  return style;
}