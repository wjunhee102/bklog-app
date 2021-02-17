import { 
  ContentType, 
  TextContents, 
  BlockData,
  TextProps
} from '../../../../types/bklog';
import { OrderType } from '.';

const BOLD = "b" as const;
const ITALY = "i" as const;
const UNDERBAR = "_" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;
const ANCHOR = "a" as const;
const FONT = "f" as const;

const BK_BOLB = "bk-bold";
const BK_ITALIC = "bk-italic";
const BK_UNDER = "bk-underbar";
const BK_COLOR = "color";
const BK_BACKGROUND_COLOR = "background-color";

const FONT_WEIGHT = "font-weight";
const FONT_STYLE = "font-style";
const TEXT_DECORATION = "text-decoration";
const BOLDER_BOTTOM = "border-bottom";

function convertType(prop: string):any {
  switch(prop) {
    case BK_BOLB:
      return BOLD;
    case BK_ITALIC:
      return ITALY;
    case BK_UNDER:
      return UNDERBAR;
    case BK_COLOR:
      return FONT_COLOR;
    case BK_BACKGROUND_COLOR:
      return BACKGROUND_COLOR;
    case BOLDER_BOTTOM:
      return UNDERBAR;
    default:
      return null;
  }
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

/**
 * html 특수문자 컨버팅 함수
 * @param text 
 * @param i 
 */
function specialCharacters(
  text: string, 
  i: number
  ): { word: string, count: number } {

  let word:string = text[i];
  let convertedWord: string;
  let count = i + 1;
  let length = text.length;

  while(text[count] !== " " && text[count] !== "&" && count < length) {
    word += text[count];
    if(text[count] === ";") break;
    count++;
  }

  if(text[count] === ";") {
    switch(word) {
      case "&quot;": 
        convertedWord = `"`;
        break;
      case "&amp;":
        convertedWord = "&";
        break;
      case "&lt;":
        convertedWord = "<";
        break;
      case "&gt;":
        convertedWord = ">";
        break;
      case "&nbsp;":
        convertedWord = " ";
        break;
      case "&iexcl;":
        convertedWord = "¡";
        break;
      case "&cent;":
        convertedWord = "￠";
        break;
      case "&pound;":
        convertedWord = "￡";
        break;
      case "&curren;":
        convertedWord = "¤";
        break;
      case "&yen;":
        convertedWord = "￥";
        break;
      case "&brvbar;":
        convertedWord = "|";
        break;
      case "&sect;":
        convertedWord = "§";
        break;
      case "&uml;":
        convertedWord = "¨";
        break;
      case "&copy;":
        convertedWord = "ⓒ";
        break;
      case "&ordf;":
        convertedWord = "ª";
        break;
      case "&laquo;":
        convertedWord = "≪";
        break;
      case "&not;":
        convertedWord = "￢";
        break;
      case "&shy;":
        convertedWord = "-";
        break;
      case "&reg;":
        convertedWord = "?";
        break;
      case "&macr;":
        convertedWord = word;
        break;
      case "&deg;":
        convertedWord = "°";
        break;
      case "&plusmn;":
        convertedWord = "±";
        break;
      case "&sup1;":
        convertedWord = "¹";
        break;
      case "&sup2;":
        convertedWord = "²";
        break;
      case "&sup3;":
        convertedWord = "³";
        break;
      case "&acute;":
        convertedWord = "´";
        break;
      case "&micro;":
        convertedWord = "μ";
        break;
      case "&para;":
        convertedWord = "¶";
        break;
      case "&middot;":
        convertedWord = "·";
        break;
      case "&cedil;":
        convertedWord = "¸";
        break;
      case "&ordm;":
        convertedWord = "º";
        break;
      case "&raquo;":
        convertedWord = "≫";
        break;
      case "&frac14;":
        convertedWord = "¼";
        break;
      case "&frac12;":
        convertedWord = "½";
        break;
      case "&frac34;":
        convertedWord = "¾";
        break;
      case "&iquest;":
        convertedWord = "¿";
        break;
      case "&Agrave;":
        convertedWord = "A";
        break;
      case "&Aacute;":
        convertedWord = "A";
        break;
      case "&Acirc;":
        convertedWord = "A";
        break;
      case "&Atilde;":
        convertedWord = "A";
        break;
      case "&Auml;":
        convertedWord = "A";
        break;
      case "&Aring;":
        convertedWord = "A";
        break;
      case "&AElig;":
        convertedWord = "Æ";
        break;
      case "&Ccedil;":
        convertedWord = "C";
        break;
      case "&Egrave;":
        convertedWord = "E";
        break;
      case "&Eacute;":
        convertedWord = "E";
        break;
      case "&Ecirc;":
        convertedWord = "E";
        break;
      case "&Euml;":
        convertedWord = "E";
        break;
      case "&Igrave;":
        convertedWord = "I";
        break;
      case "&Iacute;":
        convertedWord = "I";
        break;
      case "&Icirc;":
        convertedWord = "I";
        break;
      case "&Iuml;":
        convertedWord = "I";
        break;
      case "&ETH;":
        convertedWord = "Ð";
        break;
      case "&Ntilde;":
        convertedWord = "N";
        break;
      case "&Ograve;":
        convertedWord = "O";
        break;
      case "&Oacute;":
        convertedWord = "O";
        break;
      case "&Ocirc;":
        convertedWord = "O";
        break;
      case "&Otilde;":
        convertedWord = "O";
        break;
      case "&Ouml;":
        convertedWord = "O";
        break;
      case "&times;":
        convertedWord = "×";
        break;
      case "&Oslash;":
        convertedWord = "Ø";
        break;
      case "&Ugrave;":
        convertedWord = "U";
        break;
      case "&Uacute;":
        convertedWord = "U";
        break;
      case "&Ucirc;":
        convertedWord = "U";
        break;
      case "&Uuml;":
        convertedWord = "U";
        break;
      case "&Yacute;":
        convertedWord = "Y";
        break;
      case "&THORN;":
        convertedWord = "Þ";
        break;
      case "&szlig;":
        convertedWord = "ß";
        break;
      case "&agrave;":
        convertedWord = "a";
        break;
      case "&aacute;":
        convertedWord = "a";
        break;
      case "&acirc;":
        convertedWord = "a";
        break;
      case "&atilde;":
        convertedWord = "a";
        break;
      case "&auml;":
        convertedWord = "a";
        break;
      case "&aring;":
        convertedWord = "a";
        break;
      case "&aelig;":
        convertedWord = "æ";
        break;
      case "&ccedil;":
        convertedWord = "c";
        break;
      case "&egrave;":
        convertedWord = "e";
        break;
      case "&eacute;":
        convertedWord = "e";
        break;
      case "&ecirc;":
        convertedWord = "e";
        break;
      case "&euml;":
        convertedWord = "e";
        break;
      case "&igrave;":
        convertedWord = "i";
        break;
      case "&iacute;":
        convertedWord = "i";
        break;
      case "&icirc;":
        convertedWord = "i";
        break;
      case "&iuml;":
        convertedWord = "i";
        break;
      case "&eth;":
        convertedWord = "ð";
        break;
      case "&ntilde;":
        convertedWord = "n";
        break;
      case "&ograve;":
        convertedWord = "o";
        break;
      case "&oacute;":
        convertedWord = "o";
        break;
      case "&ocirc;":
        convertedWord = "o";
        break;
      case "&otilde;":
        convertedWord = "o";
        break;
      case "&ouml;":
        convertedWord = "o";
        break;
      case "&divide;":
        convertedWord = "÷";
        break;
      case "&oslash;":
        convertedWord = "ø";
        break;
      case "&ugrave;":
        convertedWord = "u";
        break;
      case "&uacute;":
        convertedWord = "u";
        break;
      case "&ucirc;":
        convertedWord = "u";
        break;
      case "&uuml;":
        convertedWord = "u";
        break;
      case "&yacute;":
        convertedWord = "y";
        break;
      case "&thorn;":
        convertedWord = "þ";
        break;
      case "&yuml;":
        convertedWord = "y";
        break;

      default: 
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

function parseHtmlContents(text:string):TextContents[] {

  const newContents: any[] = [];
  const textLength: number = text.length;

  console.log(text);

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
        
        // chrome 번역기 동작시 font 태그가 주입될때 오작동 방지
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
            type = [convertType(property)]
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
            type = [convertType(property)];
            propertys.push(type);
            type = []; 

            property = null;
          }

          break;

        case '"' || "'":
 
          if(property) {
            type = [convertType(property)];
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

export function arrayFindIndex(array: any[], factor: any): number {
  const JSONFactor = JSON.stringify(factor[0]);

  for(let i = 0; i < array.length; i++) {
    const JSONArray = JSON.stringify(array[i][0]);
    if(JSONArray === JSONFactor) {
      return i;
    }
  }
  return -1;
}


function addContentsStyle(
  preTexts: TextContents[], 
  startPoint: number, 
  endPoint: number, 
  style: ContentType
  ): TextContents[] {
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
  preTexts: TextContents[], 
  startPoint:number, 
  endPoint:number, 
  style: ContentType
  ): TextContents[] {
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
              if(insertText[0]) newContents.push(insertText);
              const newStyle = [...insertText[1]];

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
 * return BlockData<TextProps>
 * @param changedTextStyleBlock 
 * @param styleType 
 * @param startPoint 
 * @param endPoint 
 * @param order 
 */
function changeStyleTextContents(
  changedTextStyleBlock: BlockData<TextProps>, 
  styleType: ContentType,
  startPoint: number, 
  endPoint: number,
  order: OrderType
):BlockData<TextProps> {
  
  let changedTextContents: TextContents[];

  switch(order) {
    case "add":
      changedTextContents = addContentsStyle(
        changedTextStyleBlock.property.contents,
        startPoint,
        endPoint,
        styleType
      );
      break;

    case "del":
      changedTextContents = deleteContentsStyle(
        changedTextStyleBlock.property.contents,
        startPoint,
        endPoint,
        styleType
      );
      break;

    case "color":
      changedTextContents = addContentsStyle(
        deleteContentsStyle(
          changedTextStyleBlock.property.contents,
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
          changedTextStyleBlock.property.contents,
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
      changedTextContents = changedTextStyleBlock.property.contents;
  }

  return Object.assign({}, 
    changedTextStyleBlock, {
      property: Object.assign({}, 
        changedTextStyleBlock.property, {
          contents: changedTextContents
      })
    }
  );
}

const converter = {
  parseHtmlContents,
  addContentsStyle,
  deleteContentsStyle,
  changeStyleTextContents
}

export default converter;