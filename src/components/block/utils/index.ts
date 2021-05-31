import { TextContents, ContentType } from '../types';
import { 
  equalsArray, 
} from '../reducer/utils/converter';

const BOLD = "b" as const;
const ITALY = "i" as const;
const UNDERBAR = "_" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;
const ANCHOR = "a" as const;
const FONT_WEIGHT_BOLD  = "font-weight: 700;" as const;
const FONT_STYLE_ITALIC = "font-style: italic;" as const;
const BORDER_BOTTOM     = "border-bottom: 0.05em solid;" as const;
const COLOR             = "color:" as const;
const BACKGROUND_C      = "background-color:" as const;

export const arrayUtils = { equalsArray };

export function contentsElement(rawContents: any) {
  let text: string;
  let className:string | null = null;
  let styles:string | null = null;
  let aTag: any;

  if(rawContents.length === 2) {
    rawContents[1].forEach((content:string[]) => {
      switch(content[0]) {

        case BOLD:
          styles = styles? styles + ` ${FONT_WEIGHT_BOLD}` : FONT_WEIGHT_BOLD;
          break;

        case ITALY:
          styles = styles? styles + ` ${FONT_STYLE_ITALIC}` : FONT_STYLE_ITALIC;
          break;

        case UNDERBAR:
          styles = styles? styles + ` ${BORDER_BOTTOM}` : BORDER_BOTTOM;
          break;

        case FONT_COLOR:
          styles = styles? styles + ` ${COLOR} ${content[1]};` : `${COLOR} ${content[1]};`;
          break;

        case BACKGROUND_COLOR:
          styles = styles? styles + ` ${BACKGROUND_C} ${content[1]};` : `${BACKGROUND_C} ${content[1]};`;
          break;
          
        case ANCHOR:
          aTag = content[1];
      }
    })
    text = `<span${className? ' class="'+ className + '"' : ""}${styles? ' style="' + styles + '"' : ""}>${rawContents[0]}</span>`

    if(aTag) {
      let preText = text;
      text = `<a href="${aTag}">${preText}</a>`;
    }
  } else {
    text = rawContents[0];
  }

  return text;
}

export function createContentsElement(accumulator: string, rawContents: any, currentIndex: number):string {
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

    if(count > position) {
      style = textContents[i].length === 2? textContents[i][1] : null;
      break;
    } 

  }

  return style;
}

export function arrayFindIndex(array: any[], props: any): number {
  const JSONProps = JSON.stringify(props);

  for(let i = 0; i < array.length; i++) {
    const JSONArray = JSON.stringify(array[i]);
    if(JSONArray === JSONProps) {
      return i;
    }
  }
  return -1;
}