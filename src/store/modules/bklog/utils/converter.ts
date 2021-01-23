import { ContentType, TextContents } from '../../../../types/bklog';

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
    default:
      return prop;
  }
}

function updateContents(text:string):TextContents[] {

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
            if(!content[0]) {
              // newContents.pop(); 이걸 왜 넣은거지??
            } else {
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
        
        // chrome 번역기 동작시 font 태그가 주입될때 오작동 방지
        case FONT:
          if(!saveToggle) {
            if(text[i - 1] === "<") {
              while(text[i+1] !== ">") {
                console.log(text[i])
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
            type.push(property);
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
  console.log(newContents);
  return newContents;
}

function equalsArray(aryA: any[], aryB: any[]): boolean {
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

function arrayFindIndex(array: any[], factor: any): number {
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
      if(count >= startPoint && count < endPoint) {
        if(arrayFindIndex(insertText[1], style) === -1) { 
          if(insertText[0]) {
            newContents.push(insertText);
          }
          insertText = text[1]? ["", [...text[1], style]] : ["", [style]];

        } else if(!equalsArray(insertText[1], text[1]? text[1] : []) && i === 0) {

          newContents.push(insertText);

          if(!text[1] || arrayFindIndex(text[1], style) === -1) {
            insertText = text[1]?["", [...text[1], style]] : ["", [style]];
          } else {
            insertText = ["", [...text[1]]];
          }

        }
      } else {
        if(!equalsArray(insertText[1], text[1]? text[1] : [])) { 
          if(insertText[0]) {
            newContents.push(insertText);
          }
          insertText = text[1]?["", [...text[1]]] : ["", []];
        };
      }
      insertText[0] += text[0][i];
      count++;
    }
    
  })

  newContents.push(insertText);
  console.log("ddd", newContents.map(content => content[1][0]? content : [content[0]]));

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

      if(count >= startPoint && count < endPoint) {
        let stylePosition = arrayFindIndex(insertText[1], style);

        if(stylePosition > -1) {
          if(insertText[0]) {
            newContents.push(insertText);
          }
          const newStyle = [...insertText[1]];
          newStyle.splice(stylePosition, 1);
          insertText = ["", [...newStyle]];

        } else if(!equalsArray(insertText[1], text[1]? text[1] : [])) {
          stylePosition = arrayFindIndex(text[1]? text[1] : [], style);
          const newStyle = text[1]? [...text[1]] : [];
          if(stylePosition > -1) {
            newStyle.splice(stylePosition, 1);
          } 

          if(!equalsArray(insertText[1], newStyle)) {
            if(insertText[0]) {
              newContents.push(insertText);
            }
            insertText = ["", [...newStyle]];
          }

        }
      } else {
        if(!equalsArray(insertText[1], text[1]? text[1] : [])) { 
          if(insertText[0]) {
            newContents.push(insertText);
          }
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

const converter = {
  updateContents,
  addContentsStyle,
  deleteContentsStyle
}

export default converter;