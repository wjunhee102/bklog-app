import { TextContents, ContentType } from "../../../types/bklog";

const BOLD = "b" as const;
const ITALY = "i" as const;
const UNDERBAR = "_" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;
const ANCHOR = "a" as const;

const BK_BOLB = "bk-bold";
const BK_ITALIC = "bk-italic";
const BK_UNDER = "bk-underbar";

function contentsElement(rawContents: any) {
  let text;
  let className:string | null = null;
  let styles:string | null = null;
  let aTag;

  if(rawContents.length === 2) {
    rawContents[1].forEach((content:string[]) => {
      switch(content[0]) {

        case BOLD:
          className = className? className + ` ${BK_BOLB}` : BK_BOLB;
          break;

        case ITALY:
          className = className? className + ` ${BK_ITALIC}` : BK_ITALIC;
          break;

        case UNDERBAR:
          className = className? className + ` ${BK_UNDER}` : BK_UNDER;
          break;

        case FONT_COLOR:
          if(content[1][0] === "#") {
            styles = styles? styles + ` color: ${content[1]};` : `color: ${content[1]};`;
          } else {
            className = className? className + ` bk-fc-${content[1]}` : `bk-fc-${content[1]}`
          }
          break;

        case BACKGROUND_COLOR:
          if(content[1][0] === "#") {
            styles = styles? styles + ` background-color: ${content[1]};` : `background-color: ${content[1]};`;
          } else {
            className = className? className + ` bk-bc-${content[1]}` : `bk-bc-${content[1]}`
          }
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
    
    if(count >= position) {
      style = textContents[i].length === 2? textContents[i][1] : null;
      break;
    } 
  }

  return style;
}