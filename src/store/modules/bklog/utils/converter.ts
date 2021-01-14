const BOLD = "b" as const;
const ITALY = "i" as const;
const UNDERBAR = "_" as const;
const FONT_COLOR = "fc" as const;
const BACKGROUND_COLOR = "bc" as const;
const ANCHOR = "a" as const;

const BK_BOLB = "bk-bold";
const BK_ITALIC = "bk-italic";
const BK_UNDER = "bk-underbar";
const BK_COLOR = "color";
const BK_BACKGROUND_COLOR = "background";

type ContentType = ["b"] | ["i"] | ["_"] | ["a", string] | ["fc", string] | ["bc", string];

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


export default function updateContents(text:string):any {

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

  return newContents;
}
