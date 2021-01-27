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

function convertProperty(prop: string):any {
  switch(prop) {
    case "600":
      return BOLD;
    case "italic":
      return ITALY;
    default:
      return prop;
  }
}

function parseHtmlContents(text:string):TextContents[] {

  const newContents: any[] = [];
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
          if(text[i+1] === "n" && text[i+5] === ";") {
            i += 5;
            content[0]? content[0] += " " : content[0] = " ";
          } else {
            content[0]? content[0] += text[i] : content[0] = text[i];
          }
  
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