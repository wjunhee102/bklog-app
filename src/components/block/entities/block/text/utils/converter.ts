import {
  TextContentStyleType,
  TextContentType,
  BlockContentsText,
  OrderType,
  BOLD,
  ITALY,
  UNDERBAR,
  FONT_COLOR,
  BACKGROUND_COLOR,
  ANCHOR,
  FONT,
  TEXT_STYLE_TYPE
} from "../../type/types/text";

const BK_BOLD = "bk-bold" as const;
const BK_ITALIC = "bk-italic" as const;
const BK_UNDER = "bk-underbar" as const;
const BK_COLOR = "color" as const;
const BK_BACKGROUND_COLOR = "background-color" as const;

const FONT_WEIGHT = "font-weight";
const FONT_STYLE = "font-style";
const TEXT_DECORATION = "text-decoration";
const BOLDER_BOTTOM = "border-bottom";

export type ConvertType = typeof BK_BOLD
  | typeof BK_ITALIC
  | typeof BK_UNDER
  | typeof BK_COLOR
  | typeof BK_BACKGROUND_COLOR
  | typeof BOLDER_BOTTOM;

const convertTypeTable = {
  [BK_BOLD]: BOLD,
  [BK_ITALIC]: ITALY,
  [BK_UNDER]: UNDERBAR,
  [BK_COLOR]: FONT_COLOR,
  [BK_BACKGROUND_COLOR]: BACKGROUND_COLOR,
  [BOLDER_BOTTOM]: UNDERBAR
}

function convertType(prop: string | ConvertType): TEXT_STYLE_TYPE | null {
  return convertTypeTable.hasOwnProperty(prop)? 
    convertTypeTable[prop as ConvertType] 
    : null;
}

/**
 * 
 * @param prop 
 */
function convertProperty(prop: string):any {
  switch(prop) {
    case "700":
      return BOLD;
    case "italic":
      return ITALY;
    default:
      return prop;
  }
}

const specialCharactersTable = {
  "&quot;": `"`,
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
  "&iexcl;": "¡",
  "&cent;": "￠",
  "&pound;": "￡",
  "&curren;": "¤",
  "&yen;": "￥",
  "&brvbar;": "|",
  "&sect;": "§",
  "&uml;": "¨",
  "&copy;": "ⓒ",
  "&ordf;": "ª",
  "&laquo;": "≪",
  "&not;": "￢",
  "&shy;": "-",
  "&reg;": "?",
  "&macr;": "¯",
  "&deg;": "°",
  "&plusmn;": "±",
  "&sup1;": "¹",
  "&sup2;": "²",
  "&sup3;": "³",
  "&acute;": "´",
  "&micro;": "μ",
  "&para;": "¶",
  "&middot;": "·",
  "&cedil;": "¸",
  "&ordm;": "º",
  "&raquo;": "≫",
  "&frac14;": "¼",
  "&frac12;": "½",
  "&frac34;": "¾",
  "&iquest;": "¿",
  "&Agrave;": "A",
  "&Aacute;": "A",
  "&Acirc;": "A",
  "&Atilde;": "A",
  "&Auml;": "A",
  "&AElig;": "Æ",
  "&Ccedil;": "C",
  "&Egrave;": "E",
  "&Eacute;": "E",
  "&Ecirc;": "E",
  "&Euml;": "E",
  "&Igrave;": "I",
  "&Iacute;": "I",
  "&Icirc;": "I",
  "&Iuml;": "I",
  "&ETH;": "Ð",
  "&Ntilde;": "N",
  "&Ograve;": "O",
  "&Oacute;": "O",
  "&Ocirc;": "O",
  "&Otilde;": "O",
  "&Ouml;": "O",
  "&times;": "×",
  "&Oslash;": "Ø",
  "&Ugrave;": "U",
  "&Uacute;": "U",
  "&Ucirc;": "U",
  "&Uuml;": "U",
  "&Yacute;": "Y",
  "&THORN;": "Þ",
  "&szlig;": "ß",
  "&agrave;": "a",
  "&aacute;": "a",
  "&acirc;": "a",
  "&atilde;": "a",
  "&auml;": "a",
  "&aring;": "a",
  "&aelig;": "æ",
  "&ccedil;": "c",
  "&egrave;": "e",
  "&eacute;": "e",
  "&ecirc;": "e",
  "&euml;": "e",
  "&igrave;": "i",
  "&iacute;": "i",
  "&icirc;": "i",
  "&iuml;": "i",
  "&eth;": "ð",
  "&ntilde;": "n",
  "&ograve;": "o",
  "&oacute;": "o",
  "&ocirc;": "o",
  "&otilde;": "o",
  "&ouml;": "o",
  "&divide;": "÷",
  "&oslash;": "ø",
  "&ugrave;": "u",
  "&uacute;": "u",
  "&ucirc;": "u",
  "&uuml;": "u",
  "&yacute;": "y",
  "&thorn;": "þ",
  "&yuml;": "y"
} as const;

type SpecialCharactersType = typeof specialCharactersTable;

/**
 * html 특수문자 컨버팅 함수
 * @param text 
 * @param i 
 */
function specialCharacters(
  text: string, 
  i: number
  ): { word: string, count: number } {

  let word: string = text[i];
  let convertedWord: string;
  let count = i + 1;
  let length = text.length;

  while(text[count] !== " " && text[count] !== "&" && count < length) {
    word += text[count];
    if(text[count] === ";") break;
    count++;
  }

  if(specialCharactersTable.hasOwnProperty(word)) {
    convertedWord = specialCharactersTable[word as keyof SpecialCharactersType];
  } else {
    convertedWord = word;
  }

  if(text[count] === ";") {
    if(specialCharactersTable.hasOwnProperty(word)) {
      convertedWord = specialCharactersTable[word as keyof SpecialCharactersType];
    } else {
      convertedWord = word;
    }
  } else {
    convertedWord = text[i];
    count = i;
  }

  return {
    word: convertedWord,
    count
  };
}

function parseHtmlContents(text:string): BlockContentsText {

  const newContents: BlockContentsText = [];
  const textLength: number = text.length;

  let saveToggle:boolean = true;

  let content: any = [];

  let propertyToggle:boolean = false;
  let linkToggle:boolean = false;

  let propertys: any[] = [];
  let property: string | null = null;
  let type: string[] = [];

  for(let i = 0; i < textLength; i++) {

    if(!propertyToggle && !linkToggle) {

      switch(text[i]) {
        case "<": 
  
          if(i && text[i+1] === "/" && (text[i+6] === ">" || text[i+2] === "a")) {
            if(content[0]) {
              newContents.push(content);
              content = [];
            }
            if(text[i+6] === ">") {
              i += 6;
            } else {
              i += 3;
            }
          
            saveToggle = true;

          } else {

            saveToggle = false;
  
            if(content[0] !== undefined) {
              newContents.push(content);
              content = [];
            } 

            if(text[i+1] === "s") {
              i += 4;
            } else if(text[i+1] === ANCHOR) {
              i += 1;
            }
         
          }
  
          break;
        case ">":
          saveToggle = true;

          break;
  
        case "s":
  
          if(!saveToggle) {
           if(text[i+1] === "t" && text[i+5] === "=") {
             i += 6;
             propertyToggle = true;
           }
          } else {
            content[0]? content[0] += text[i] : content[0] = text[i];
          }

          break;
  
        case "c":
          if(!saveToggle) {
            if(text[i+1] === "l" && text[i+5] === "=") {
              i += 6;
              propertyToggle = true;
            }
          } else {
            content[0]? content[0] += text[i] : content[0] = text[i];
          }

          break;
        
        case "h":
          if(!saveToggle) {
            if(text[i+1] === "r" && text[i+3] === "f") {
              i += 5;
              linkToggle = true;
            }
    
          } else {
            content[0]? content[0] += text[i] : content[0] = text[i];
          }

          break;
        
        case "&":
          const { word, count } = specialCharacters(text, i);
          i = count;
          content[0]? content[0] += word : content[0] = word;
  
          break;
        
        // chrome 번역기 동작시 font 태그가 삽입될때 오작동 방지
        case FONT:
          if(!saveToggle) {
            if(text[i - 1] === "<") {
              while(text[i+1] !== ">") {
                i++
              }
            }
          } else {
            content[0]? content[0] += text[i] : content[0] = text[i];
          }

          break;
          
        default:
          if(saveToggle) {
            content[0]? content[0] += text[i] : content[0] = text[i];
          }
         
      }

    } else if (propertyToggle){

      switch(text[i]) {

        case ":":
          if(property) {
            const convertTypeProperty: string = property as string;
            const value = convertType(convertTypeProperty);
            if(value) type = [value];
            property = null;
          };
          break;

        case ";":

          if(type && property) {
            type.push(convertProperty(property));
            if(!type[0]) type.shift();
            if(type[0] === UNDERBAR) type.pop();
            propertys.push(type);
            type = [];
            property = null;
          }

          break;

        case " ":

          if(property && !type[0]) {
            const convertTypeProperty: string = property as string;
            const value = convertType(convertTypeProperty);
            if(value) {
              type = [value];
              propertys.push(type);
            } 
            type = []; 

            property = null;
          }

          break;

        case '"' || "'":
 
          if(property) {
            const convertTypeProperty: string = property as string;
            const value = convertType(convertTypeProperty);
            if(value) type = [value];
            if(type) {
              propertys.push(type); 
            }
          }

          if(!content[1]) {
            content = [content[0], ];
            content[1] = [...propertys];
          } else {
            content[1] = [...content[1], ...propertys];
          }
          propertys = [];
          propertyToggle = false;
          property = null;
          type = [];

          break;

        default: 
          property? property += text[i] : property = text[i];
      }

    } else if(linkToggle) {

      if(text[i] === "'" || text[i] === '"') {
        if(!content[1]) {
          content = [content[0],[[ANCHOR, property]]];
        } else {
          content[1].push([ANCHOR, property]);
        }
        
        property = null;
        linkToggle = false;

      } else {
        property? property += text[i] : property = text[i];
      }
    }
    
  }

  if(content[0]) {
    newContents.push(content);
  }

  return newContents;
}

export function equalsArray(aryA: any[], aryB: any[]): boolean {
  if(!aryA && !aryB) return true;
  if(!Array.isArray(aryA) || !Array.isArray(aryB) || aryA.length !== aryB.length ) return false;

  const targetBList = [];

  for(let i = 0; i < aryA.length; i++) {
    const targetA = JSON.stringify(aryA[i]);
    if(!i) {
      for(let ii = 0; ii < aryB.length; ii++) {

        const targetB = JSON.stringify(aryB[ii]);
        if(targetA === targetB) {
          
        } else {
          targetBList.push(targetB)
        }

      }
      if(targetBList.length === aryB.length) return false;
    } else {
      const targetBListLength = targetBList.length;

      for(let ii = 0; ii < targetBList.length; ii++) {
        if(targetBList[ii] === targetA) {
          targetBList.splice(ii, 1);
          break;
        } 
      }

      if(targetBListLength === targetBList.length) {
        return false;
      }
      
    }
  } 

  return targetBList.length? false : true;
}

export function arrayFindIndex(array: any[], factor: any[]): number {
  for(let i = 0; i < array.length; i++) {
    if(array[i][0] === factor[0]) {
      return i;
    }
  }
  return -1;
}


function addContentsStyle(
  preTexts: BlockContentsText, 
  startPoint: number, 
  endPoint: number, 
  style: TextContentStyleType
  ): BlockContentsText {
  let count = 0;
  let insertText: any = ["",[]];
  let newContents = [];

  preTexts.forEach( (text: any) => {

    for(let i = 0; i < text[0].length; i++) {
      if(count === startPoint 
        || (count + 1) === endPoint
        || (count >= startPoint && count < endPoint && i === 0)
      ) {
        if(arrayFindIndex(insertText[1], style) === -1) {

          if(insertText[0]) newContents.push(insertText);

          if(text[1]) {
            if(arrayFindIndex(text[1], style) !== -1) {
              insertText = ["", [...text[1]]];
            } else {
              insertText = ["", [...text[1], style]];
            };
          } else {
            insertText = ["", [style]];
          };

        } else {
          
          if(text[1]) {
            if(arrayFindIndex(text[1], style) !== -1) {

              if(!equalsArray(insertText[1], text[1])) {
                newContents.push(insertText);
                insertText = ["", [...text[1]]];
              };

            } else {

              if(!equalsArray(insertText[1], [...text[1], style])) {
                newContents.push(insertText);
                insertText = ["", [...text[1], style]];
              };

            };
          } else {
            
            if(!equalsArray(insertText[1], [style])) {
              newContents.push(insertText);
              insertText = ["", [style]];
            };

          };
        };

      } else if(count === endPoint || i === 0){
        if(!equalsArray(insertText[1], text[1]? text[1] : [])) { 
          if(insertText[0]) {
            newContents.push(insertText);
          }
          insertText = text[1]?["", [...text[1]]] : ["", []];
        };
      };

      insertText[0] += text[0][i];
      count++;
    }
    
  })

  newContents.push(insertText);

  return newContents.map(content => content[1][0]? content : [content[0]]);
}

function deleteContentsStyle(
  preTexts: BlockContentsText, 
  startPoint:number, 
  endPoint:number, 
  style: TextContentStyleType
  ): BlockContentsText {
  let count = 0;
  let insertText:any = ["",[]];
  let newContents = [];

  preTexts.forEach((text: any) => {
    for(let i = 0; i < text[0].length; i++) {

      if(count === startPoint 
        || (count + 1) === endPoint
        || (count > startPoint && count < endPoint && i === 0)
      ) {
        
        let stylePosition: number;

        if(text[1]) {
          if(equalsArray(insertText[1], text[1])) {
            stylePosition = arrayFindIndex(insertText[1], style);

            if(stylePosition !== -1) {
              newContents.push(insertText);
              const newStyle = [...insertText[1]];
              newStyle.splice(stylePosition, 1);
              insertText = ["", [...newStyle]];
            } 

          } else {
            const textStylePosition = arrayFindIndex(text[1], style);
            const newText = [...text[1]];
            stylePosition = arrayFindIndex(insertText[1], style);
            
            if(stylePosition !== -1) {
              if(insertText[0]) {
                newContents.push(insertText);
              } 
              // 확인 필요
              const newStyle = [...insertText[1]];

              console.log("new style", newStyle)

              if(textStylePosition !== -1) {
                newText.splice(textStylePosition, 1);
                insertText = ["", [...newText]];
              } else {
                insertText = ["", [...text[1]]];
              }

            } else {

              if(textStylePosition !== -1) {
                newText.splice(textStylePosition, 1);

                if(!equalsArray(insertText[1], newText)) {
                  if(insertText[0]) newContents.push(insertText);
                  insertText = ["", [...newText]];
                }

              } else {
                if(!equalsArray(insertText[1], text[1])) {
                  if(insertText[0]) newContents.push(insertText);
                  insertText = ["", [...text[1]]];
                }
              }
              
            }


          }
        } else if(insertText[1][0]){
          newContents.push(insertText);
          insertText = ["", []];
        }
      } else if(count === endPoint || i === 0) {
        if(!equalsArray(insertText[1], text[1]? text[1] : [])) { 
          if(insertText[0]) newContents.push(insertText);
          insertText = text[1]? ["", [...text[1]]] : ["", []]
        };
      }
      insertText[0] += text[0][i];
      
      count++;

    }
  });

  if(insertText[0]) {
    newContents.push(insertText);
  }

  return newContents.map(content => content[1][0]? content : [content[0]]);
}


/**
 * Text contents style 변환 함수
 * return BlockContentsText
 * @param changedTextStyleBlock 
 * @param styleType 
 * @param startPoint 
 * @param endPoint 
 * @param order 
 */
function changeStyleTextContents(
  preContents: BlockContentsText, 
  styleType: TextContentStyleType,
  startPoint: number, 
  endPoint: number,
  order: OrderType
): BlockContentsText {
  const contents = preContents.map(content => content.concat()) as BlockContentsText;
  
  let changedTextContents: BlockContentsText;

  switch(order) {
    case "add":
      changedTextContents = addContentsStyle(
        contents,
        startPoint,
        endPoint,
        styleType
      );
      break;

    case "del":
      changedTextContents = deleteContentsStyle(
        contents,
        startPoint,
        endPoint,
        styleType
      );
      break;

    case "color":
      changedTextContents = addContentsStyle(
        deleteContentsStyle(
          contents,
          startPoint,
          endPoint,
          styleType
        ),
        startPoint,
        endPoint,
        styleType
      );
      break;

    case "link":
      changedTextContents = addContentsStyle(
        deleteContentsStyle(
          contents,
          startPoint,
          endPoint,
          styleType
        ),
        startPoint,
        endPoint,
        styleType
      );
      break;

    default: 
      changedTextContents = contents;
  }

  return changedTextContents;
}

function sliceTextContents(
  preTexts: BlockContentsText, 
  startPoint:number, 
  endPoint:number, 
): BlockContentsText[] {

  let count = 0;
  let partTexts: TextContentType | null = null;
  let frontTexts: BlockContentsText = [];
  let backTexts: BlockContentsText = [];

  if(startPoint === 0 && endPoint === 0) {
    return [frontTexts, preTexts];
  }

  for(const texts of preTexts) {
    const textsLength = texts[0].length - 1;

    for(let i = 0; i <= textsLength; i++) {
      if(count < startPoint || count > endPoint) {

        if(!partTexts) {
          if(texts[1]) {
            partTexts = ["", texts[1]];
          } else {
            partTexts = [""];
          }
        } else if(i === 0) {
          if(partTexts[1] && texts[1] && !equalsArray(partTexts[1], texts[1])) {
            backTexts.push(partTexts);
            partTexts = ["", texts[1]];
          } 
        }

        partTexts[0] += texts[0][i];
        
        if(i === textsLength && partTexts) {
          if(count < startPoint) {
            frontTexts.push(partTexts);
          } else {
            backTexts.push(partTexts);
          }
          partTexts = null;
        }
      } else {
        
        if(count === startPoint && partTexts) {
          frontTexts.push(partTexts);
          partTexts = null;
        } 

        if(count === endPoint) {
          if(texts[1]) {
            partTexts = [texts[0][i], texts[1]];
          } else {
            partTexts = [texts[0][i]];
          }
        }
        
      }

      count++;
    }
  }

  if(partTexts) backTexts.push(partTexts);

  return [frontTexts, backTexts];
}

function sliceText(text: string, startPoint: number, endPoint: number): [string, string] {
  if(!text || text === "") return ["", ""];

  let front = text.slice(0, startPoint);
  let end = text.slice(endPoint, text.length);

  return [front, end];
}

function mergeTextContents(
  toBeMergedContents: BlockContentsText,
  targetContents: BlockContentsText
): BlockContentsText {
  const copyToBeMergedContents: BlockContentsText = toBeMergedContents.concat();
  const copyTargetContents: BlockContentsText     = targetContents.concat();
  const front = copyToBeMergedContents.pop();
  const back  = copyTargetContents.shift();

  if(!front || !back) return [];

  const frontContent: TextContentType = front;
  const backContent: TextContentType  = back;

  if(!frontContent) {
    return targetContents;
  }

  if(equalsArray(frontContent[1]? frontContent[1] : [], backContent[1]? backContent[1] : [])){
    frontContent[0] += backContent[0];
    copyToBeMergedContents.push(frontContent, ...copyTargetContents);
  } else {
    copyToBeMergedContents.push(frontContent, backContent, ...copyTargetContents);
    console.log("1", frontContent, backContent, copyTargetContents);
  }

  return copyToBeMergedContents;
}

const FONT_WEIGHT_BOLD  = "font-weight: 700;" as const;
const FONT_STYLE_ITALIC = "font-style: italic;" as const;
const BORDER_BOTTOM     = "border-bottom: 0.05em solid;" as const;
const COLOR             = "color:" as const;
const BACKGROUND_C      = "background-color:" as const;

function contentsElement(rawContents: TextContentType): string {
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

function createContentsElement(accumulator: string, rawContents: TextContentType): string {
  return accumulator + contentsElement(rawContents);
}

function createContentsText(accumulator: string, rawContents: TextContentType): string {
  return accumulator + rawContents[0];
}

const converter = {
  parseHtmlContents,
  addContentsStyle,
  deleteContentsStyle,
  changeStyleTextContents,
  sliceTextContents,
  sliceText,
  mergeTextContents,
  contentsElement,
  createContentsElement,
  createContentsText
}

export default converter;