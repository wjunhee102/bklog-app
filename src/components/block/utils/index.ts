import { TextContents, ContentType, RawBlockData } from '../types';
import { 
  equalsArray, 
} from '../reducer/utils/converter';
import { createBlockData, parseHtmlContents } from '../../preBlock/reducer/utils';
import textBlockUtils from './textBlockUtils';

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

export function contentsElement(rawContents: TextContents): string {
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

export function createContentsElement(accumulator: string, rawContents: TextContents): string {
  return accumulator + contentsElement(rawContents);
}

export function createContentsText(accumulator: string, rawContents: any, currentIndex: number): string {
  return currentIndex === 1? accumulator[0] + rawContents[0] : accumulator + rawContents[0];
}

export function createClipboardContentsText(contents: any[]): string {
  console.log(contents);
  const newTextList: string[] = contents.map((content) => {
    return content? content.reduce(createContentsText) : "";
  });

  return newTextList.reduce((a: string, b: string) => `${a}\n${b}`);
}

export function copyInClipboard(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999); // 모바일
  document.execCommand("copy");
  document.body.removeChild(textarea);
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

export function arrayFindIndex(array: any[], props: any[]): number {
  // JSON stringfy는 연산 속도가 느리니 수정 할 것.
  const JSONProps = JSON.stringify(props);

  for(let i = 0; i < array.length; i++) {
    const JSONArray = JSON.stringify(array[i]);
    if(JSONArray === JSONProps) {
      return i;
    }
  }
  return -1;
}

export function divideText(text: string): string | string[] {
  const reg = /[\n]|[<br>]|[<br/>]/;
  const res = text.split(reg);
  return res.length === 1? text : res;
}

export function createBlockList(contentsList: string[]) {
  let preBlockId: string | null = null;
  return contentsList.map((contents) => {
    const newBlock = createBlockData("text", "bk-p", preBlockId);

    preBlockId = newBlock.id;

    return Object.assign({}, newBlock, {
      property: Object.assign({}, newBlock.property, {
        contents: parseHtmlContents(contents)
      })
    });
  });
}

export function checkInstanceOfHTMLElement<T = HTMLElement>(element: T) {
  return element instanceof HTMLElement;
}

export interface KeyboardActionTable {
  [P: string]: (e: React.KeyboardEvent<any>) => void;
  defaultAction?: (e: React.KeyboardEvent<any>) => void;
  startAction?: (e: React.KeyboardEvent<any>) => boolean;
  finallyAction?: (e: React.KeyboardEvent<any>) => void;
}

export const keyboardActionHandler = textBlockUtils.keyboardActionHandler;
export const setCursorPoint        = textBlockUtils.setCursorPoint;