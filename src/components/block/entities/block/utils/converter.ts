export const test = 0;
// import { 
//   ContentType, 
//   TextContents, 
//   BlockData
// } from "../../../types";
// import { OrderType } from ".";

// const BOLD = "b" as const;
// const ITALY = "i" as const;
// const UNDERBAR = "_" as const;
// const FONT_COLOR = "fc" as const;
// const BACKGROUND_COLOR = "bc" as const;
// const ANCHOR = "a" as const;
// const FONT = "f" as const;

// const BK_BOLD = "bk-bold";
// const BK_ITALIC = "bk-italic";
// const BK_UNDER = "bk-underbar";
// const BK_COLOR = "color";
// const BK_BACKGROUND_COLOR = "background-color";

// const FONT_WEIGHT = "font-weight";
// const FONT_STYLE = "font-style";
// const TEXT_DECORATION = "text-decoration";
// const BOLDER_BOTTOM = "border-bottom";

// const convertTypeTable = {
//   [BK_BOLD]: BOLD,
//   [BK_ITALIC]: ITALY,
//   [BK_UNDER]: UNDERBAR,
//   [BK_COLOR]: FONT_COLOR,
//   [BK_BACKGROUND_COLOR]: BACKGROUND_COLOR,
//   [BOLDER_BOTTOM]: UNDERBAR
// }

// function convertType(prop: string): string | null {
//   return convertTypeTable.hasOwnProperty(prop)? 
//     convertTypeTable[prop] 
//     : null;
// }

// /**
//  * 
//  * @param prop 
//  */
// function convertProperty(prop: string):any {
//   switch(prop) {
//     case "700":
//       return BOLD;
//     case "italic":
//       return ITALY;
//     default:
//       return prop;
//   }
// }

// const specialCharactersTable = {
//   "&quot;": `"`,
//   "&amp;": "&",
//   "&lt;": "<",
//   "&gt;": ">",
//   "&nbsp;": " ",
//   "&iexcl;": "¡",
//   "&cent;": "￠",
//   "&pound;": "￡",
//   "&curren;": "¤",
//   "&yen;": "￥",
//   "&brvbar;": "|",
//   "&sect;": "§",
//   "&uml;": "¨",
//   "&copy;": "ⓒ",
//   "&ordf;": "ª",
//   "&laquo;": "≪",
//   "&not;": "￢",
//   "&shy;": "-",
//   "&reg;": "?",
//   "&macr;": "¯",
//   "&deg;": "°",
//   "&plusmn;": "±",
//   "&sup1;": "¹",
//   "&sup2;": "²",
//   "&sup3;": "³",
//   "&acute;": "´",
//   "&micro;": "μ",
//   "&para;": "¶",
//   "&middot;": "·",
//   "&cedil;": "¸",
//   "&ordm;": "º",
//   "&raquo;": "≫",
//   "&frac14;": "¼",
//   "&frac12;": "½",
//   "&frac34;": "¾",
//   "&iquest;": "¿",
//   "&Agrave;": "A",
//   "&Aacute;": "A",
//   "&Acirc;": "A",
//   "&Atilde;": "A",
//   "&Auml;": "A",
//   "&AElig;": "Æ",
//   "&Ccedil;": "C",
//   "&Egrave;": "E",
//   "&Eacute;": "E",
//   "&Ecirc;": "E",
//   "&Euml;": "E",
//   "&Igrave;": "I",
//   "&Iacute;": "I",
//   "&Icirc;": "I",
//   "&Iuml;": "I",
//   "&ETH;": "Ð",
//   "&Ntilde;": "N",
//   "&Ograve;": "O",
//   "&Oacute;": "O",
//   "&Ocirc;": "O",
//   "&Otilde;": "O",
//   "&Ouml;": "O",
//   "&times;": "×",
//   "&Oslash;": "Ø",
//   "&Ugrave;": "U",
//   "&Uacute;": "U",
//   "&Ucirc;": "U",
//   "&Uuml;": "U",
//   "&Yacute;": "Y",
//   "&THORN;": "Þ",
//   "&szlig;": "ß",
//   "&agrave;": "a",
//   "&aacute;": "a",
//   "&acirc;": "a",
//   "&atilde;": "a",
//   "&auml;": "a",
//   "&aring;": "a",
//   "&aelig;": "æ",
//   "&ccedil;": "c",
//   "&egrave;": "e",
//   "&eacute;": "e",
//   "&ecirc;": "e",
//   "&euml;": "e",
//   "&igrave;": "i",
//   "&iacute;": "i",
//   "&icirc;": "i",
//   "&iuml;": "i",
//   "&eth;": "ð",
//   "&ntilde;": "n",
//   "&ograve;": "o",
//   "&oacute;": "o",
//   "&ocirc;": "o",
//   "&otilde;": "o",
//   "&ouml;": "o",
//   "&divide;": "÷",
//   "&oslash;": "ø",
//   "&ugrave;": "u",
//   "&uacute;": "u",
//   "&ucirc;": "u",
//   "&uuml;": "u",
//   "&yacute;": "y",
//   "&thorn;": "þ",
//   "&yuml;": "y"
// }

// /**
//  * html 특수문자 컨버팅 함수
//  * @param text 
//  * @param i 
//  */
// function specialCharacters(
//   text: string, 
//   i: number
//   ): { word: string, count: number } {

//   let word:string = text[i];
//   let convertedWord: string;
//   let count = i + 1;
//   let length = text.length;

//   while(text[count] !== " " && text[count] !== "&" && count < length) {
//     word += text[count];
//     if(text[count] === ";") break;
//     count++;
//   }

//   if(specialCharactersTable.hasOwnProperty(word)) {
//     convertedWord = specialCharactersTable[word];
//   } else {
//     convertedWord = word;
//   }

//   if(text[count] === ";") {
//     if(specialCharactersTable.hasOwnProperty(word)) {
//       convertedWord = specialCharactersTable[word];
//     } else {
//       convertedWord = word;
//     }
//   } else {
//     convertedWord = text[i];
//     count = i;
//   }

//   return {
//     word: convertedWord,
//     count
//   };
// }

// function parseHtmlContents(text:string): TextContents[] {

//   const newContents: TextContents[] = [];
//   const textLength: number = text.length;

//   let saveToggle:boolean = true;

//   let content: any = [];

//   let propertyToggle:boolean = false;
//   let linkToggle:boolean = false;

//   let propertys: any[] = [];
//   let property: string | null = null;
//   let type: string[] = [];

//   for(let i = 0; i < textLength; i++) {

//     if(!propertyToggle && !linkToggle) {

//       switch(text[i]) {
//         case "<": 
  
//           if(i && text[i+1] === "/" && (text[i+6] === ">" || text[i+2] === "a")) {
//             if(content[0]) {
//               newContents.push(content);
//               content = [];
//             }
//             if(text[i+6] === ">") {
//               i += 6;
//             } else {
//               i += 3;
//             }
          
//             saveToggle = true;

//           } else {

//             saveToggle = false;
  
//             if(content[0] !== undefined) {
//               newContents.push(content);
//               content = [];
//             } 

//             if(text[i+1] === "s") {
//               i += 4;
//             } else if(text[i+1] === ANCHOR) {
//               i += 1;
//             }
         
//           }
  
//           break;
//         case ">":
//           saveToggle = true;

//           break;
  
//         case "s":
  
//           if(!saveToggle) {
//            if(text[i+1] === "t" && text[i+5] === "=") {
//              i += 6;
//              propertyToggle = true;
//            }
//           } else {
//             content[0]? content[0] += text[i] : content[0] = text[i];
//           }

//           break;
  
//         case "c":
//           if(!saveToggle) {
//             if(text[i+1] === "l" && text[i+5] === "=") {
//               i += 6;
//               propertyToggle = true;
//             }
//           } else {
//             content[0]? content[0] += text[i] : content[0] = text[i];
//           }

//           break;
        
//         case "h":
//           if(!saveToggle) {
//             if(text[i+1] === "r" && text[i+3] === "f") {
//               i += 5;
//               linkToggle = true;
//             }
    
//           } else {
//             content[0]? content[0] += text[i] : content[0] = text[i];
//           }

//           break;
        
//         case "&":
//           const { word, count } = specialCharacters(text, i);
//           i = count;
//           content[0]? content[0] += word : content[0] = word;
  
//           break;
        
//         // chrome 번역기 동작시 font 태그가 삽입될때 오작동 방지
//         case FONT:
//           if(!saveToggle) {
//             if(text[i - 1] === "<") {
//               while(text[i+1] !== ">") {
//                 i++
//               }
//             }
//           } else {
//             content[0]? content[0] += text[i] : content[0] = text[i];
//           }

//           break;
          
//         default:
//           if(saveToggle) {
//             content[0]? content[0] += text[i] : content[0] = text[i];
//           }
         
//       }

//     } else if (propertyToggle){

//       switch(text[i]) {

//         case ":":
//           if(property) {
//             type = [convertType(property)]
//             property = null;
//           };
//           break;

//         case ";":

//           if(type && property) {
//             type.push(convertProperty(property));
//             if(!type[0]) type.shift();
//             if(type[0] === UNDERBAR) type.pop();
//             propertys.push(type);
//             type = [];
//             property = null;
//           }

//           break;

//         case " ":

//           if(property && !type[0]) {
//             type = [convertType(property)];
//             propertys.push(type);
//             type = []; 

//             property = null;
//           }

//           break;

//         case '"' || "'":
 
//           if(property) {
//             type = [convertType(property)];
//             if(type) {
//               propertys.push(type); 
//             }
//           }

//           if(!content[1]) {
//             content = [content[0], ];
//             content[1] = [...propertys];
//           } else {
//             content[1] = [...content[1], ...propertys];
//           }
//           propertys = [];
//           propertyToggle = false;
//           property = null;
//           type = [];

//           break;

//         default: 
//           property? property += text[i] : property = text[i];
//       }

//     } else if(linkToggle) {

//       if(text[i] === "'" || text[i] === '"') {
//         if(!content[1]) {
//           content = [content[0],[[ANCHOR, property]]];
//         } else {
//           content[1].push([ANCHOR, property]);
//         }
        
//         property = null;
//         linkToggle = false;

//       } else {
//         property? property += text[i] : property = text[i];
//       }
//     }
    
//   }

//   if(content[0]) {
//     newContents.push(content);
//   }

//   return newContents;
// }

// export function equalsArray(aryA: any[], aryB: any[]): boolean {
//   if(!aryA && !aryB) return true;
//   if(!Array.isArray(aryA) || !Array.isArray(aryB) || aryA.length !== aryB.length ) return false;

//   const targetBList = [];

//   for(let i = 0; i < aryA.length; i++) {
//     const targetA = JSON.stringify(aryA[i]);
//     if(!i) {
//       for(let ii = 0; ii < aryB.length; ii++) {

//         const targetB = JSON.stringify(aryB[ii]);
//         if(targetA === targetB) {
          
//         } else {
//           targetBList.push(targetB)
//         }

//       }
//       if(targetBList.length === aryB.length) return false;
//     } else {
//       const targetBListLength = targetBList.length;

//       for(let ii = 0; ii < targetBList.length; ii++) {
//         if(targetBList[ii] === targetA) {
//           targetBList.splice(ii, 1);
//           break;
//         } 
//       }

//       if(targetBListLength === targetBList.length) {
//         return false;
//       }
      
//     }
//   } 

//   return targetBList.length? false : true;
// }

// export function arrayFindIndex(array: any[], factor: any[]): number {
//   for(let i = 0; i < array.length; i++) {
//     if(array[i][0] === factor[0]) {
//       return i;
//     }
//   }
//   return -1;
// }


// function addContentsStyle(
//   preTexts: TextContents[], 
//   startPoint: number, 
//   endPoint: number, 
//   style: ContentType
//   ): TextContents[] {
//   let count = 0;
//   let insertText: any = ["",[]];
//   let newContents = [];

//   preTexts.forEach( (text: any) => {

//     for(let i = 0; i < text[0].length; i++) {
//       if(count === startPoint 
//         || (count + 1) === endPoint
//         || (count >= startPoint && count < endPoint && i === 0)
//       ) {
//         if(arrayFindIndex(insertText[1], style) === -1) {

//           if(insertText[0]) newContents.push(insertText);

//           if(text[1]) {
//             if(arrayFindIndex(text[1], style) !== -1) {
//               insertText = ["", [...text[1]]];
//             } else {
//               insertText = ["", [...text[1], style]];
//             };
//           } else {
//             insertText = ["", [style]];
//           };

//         } else {
          
//           if(text[1]) {
//             if(arrayFindIndex(text[1], style) !== -1) {

//               if(!equalsArray(insertText[1], text[1])) {
//                 newContents.push(insertText);
//                 insertText = ["", [...text[1]]];
//               };

//             } else {

//               if(!equalsArray(insertText[1], [...text[1], style])) {
//                 newContents.push(insertText);
//                 insertText = ["", [...text[1], style]];
//               };

//             };
//           } else {
            
//             if(!equalsArray(insertText[1], [style])) {
//               newContents.push(insertText);
//               insertText = ["", [style]];
//             };

//           };
//         };

//       } else if(count === endPoint || i === 0){
//         if(!equalsArray(insertText[1], text[1]? text[1] : [])) { 
//           if(insertText[0]) {
//             newContents.push(insertText);
//           }
//           insertText = text[1]?["", [...text[1]]] : ["", []];
//         };
//       };

//       insertText[0] += text[0][i];
//       count++;
//     }
    
//   })

//   newContents.push(insertText);

//   return newContents.map(content => content[1][0]? content : [content[0]]);
// }

// function deleteContentsStyle(
//   preTexts: TextContents[], 
//   startPoint:number, 
//   endPoint:number, 
//   style: ContentType
//   ): TextContents[] {
//   let count = 0;
//   let insertText:any = ["",[]];
//   let newContents = [];

//   preTexts.forEach((text: any) => {
//     for(let i = 0; i < text[0].length; i++) {

//       if(count === startPoint 
//         || (count + 1) === endPoint
//         || (count > startPoint && count < endPoint && i === 0)
//       ) {
        
//         let stylePosition: number;

//         if(text[1]) {
//           if(equalsArray(insertText[1], text[1])) {
//             stylePosition = arrayFindIndex(insertText[1], style);

//             if(stylePosition !== -1) {
//               newContents.push(insertText);
//               const newStyle = [...insertText[1]];
//               newStyle.splice(stylePosition, 1);
//               insertText = ["", [...newStyle]];
//             } 

//           } else {
//             const textStylePosition = arrayFindIndex(text[1], style);
//             const newText = [...text[1]];
//             stylePosition = arrayFindIndex(insertText[1], style);
            
//             if(stylePosition !== -1) {
//               if(insertText[0]) {
//                 newContents.push(insertText);
//               } 
//               // 확인 필요
//               const newStyle = [...insertText[1]];

//               console.log("new style", newStyle)

//               if(textStylePosition !== -1) {
//                 newText.splice(textStylePosition, 1);
//                 insertText = ["", [...newText]];
//               } else {
//                 insertText = ["", [...text[1]]];
//               }

//             } else {

//               if(textStylePosition !== -1) {
//                 newText.splice(textStylePosition, 1);

//                 if(!equalsArray(insertText[1], newText)) {
//                   if(insertText[0]) newContents.push(insertText);
//                   insertText = ["", [...newText]];
//                 }

//               } else {
//                 if(!equalsArray(insertText[1], text[1])) {
//                   if(insertText[0]) newContents.push(insertText);
//                   insertText = ["", [...text[1]]];
//                 }
//               }
              
//             }


//           }
//         } else if(insertText[1][0]){
//           newContents.push(insertText);
//           insertText = ["", []];
//         }
//       } else if(count === endPoint || i === 0) {
//         if(!equalsArray(insertText[1], text[1]? text[1] : [])) { 
//           if(insertText[0]) newContents.push(insertText);
//           insertText = text[1]? ["", [...text[1]]] : ["", []]
//         };
//       }
//       insertText[0] += text[0][i];
      
//       count++;

//     }
//   });

//   if(insertText[0]) {
//     newContents.push(insertText);
//   }

//   return newContents.map(content => content[1][0]? content : [content[0]]);
// }


// /**
//  * Text contents style 변환 함수
//  * return BlockData<TextProps>
//  * @param changedTextStyleBlock 
//  * @param styleType 
//  * @param startPoint 
//  * @param endPoint 
//  * @param order 
//  */
// function changeStyleTextContents(
//   changedTextStyleBlock: BlockData, 
//   styleType: ContentType,
//   startPoint: number, 
//   endPoint: number,
//   order: OrderType
// ):BlockData {
  
//   let changedTextContents: TextContents[];

//   switch(order) {
//     case "add":
//       changedTextContents = addContentsStyle(
//         changedTextStyleBlock.contents,
//         startPoint,
//         endPoint,
//         styleType
//       );
//       break;

//     case "del":
//       changedTextContents = deleteContentsStyle(
//         changedTextStyleBlock.contents,
//         startPoint,
//         endPoint,
//         styleType
//       );
//       break;

//     case "color":
//       changedTextContents = addContentsStyle(
//         deleteContentsStyle(
//           changedTextStyleBlock.contents,
//           startPoint,
//           endPoint,
//           styleType
//         ),
//         startPoint,
//         endPoint,
//         styleType
//       );
//       break;

//     case "link":
//       changedTextContents = addContentsStyle(
//         deleteContentsStyle(
//           changedTextStyleBlock.contents,
//           startPoint,
//           endPoint,
//           styleType
//         ),
//         startPoint,
//         endPoint,
//         styleType
//       );
//       break;

//     default: 
//       changedTextContents = changedTextStyleBlock.contents;
//   }

//   return Object.assign({}, 
//     changedTextStyleBlock, {
//       contents: changedTextContents
//     }
//   );
// }

// function sliceTextContents(
//   preTexts: TextContents[], 
//   startPoint:number, 
//   endPoint:number, 
// ): TextContents[][] {

//   let count = 0;
//   let partTexts: TextContents | null = null;
//   let frontTexts: TextContents[] = [];
//   let backTexts: TextContents[] = [];

//   if(startPoint === 0 && endPoint === 0) {
//     return [frontTexts, preTexts];
//   }

//   for(const texts of preTexts) {
//     const textsLength = texts[0].length - 1;

//     for(let i = 0; i <= textsLength; i++) {
//       if(count < startPoint || count > endPoint) {

//         if(!partTexts) {
//           if(texts[1]) {
//             partTexts = ["", texts[1]];
//           } else {
//             partTexts = [""];
//           }
//         } else if(i === 0) {
//           if(partTexts[1] && texts[1] && !equalsArray(partTexts[1], texts[1])) {
//             backTexts.push(partTexts);
//             partTexts = ["", texts[1]];
//           } 
//         }

//         partTexts[0] += texts[0][i];
        
//         if(i === textsLength && partTexts) {
//           if(count < startPoint) {
//             frontTexts.push(partTexts);
//           } else {
//             backTexts.push(partTexts);
//           }
//           partTexts = null;
//         }
//       } else {
        
//         if(count === startPoint && partTexts) {
//           frontTexts.push(partTexts);
//           partTexts = null;
//         } 

//         if(count === endPoint) {
//           if(texts[1]) {
//             partTexts = [texts[0][i], texts[1]];
//           } else {
//             partTexts = [texts[0][i]];
//           }
//         }
        
//       }

//       count++;
//     }
//   }

//   if(partTexts) backTexts.push(partTexts);

//   return [frontTexts, backTexts];
// }

// function sliceText(text: string, startPoint: number, endPoint: number): [string, string] {
//   if(!text || text === "") return ["", ""];

//   let front = text.slice(0, startPoint);
//   let end = text.slice(endPoint, text.length);

//   return [front, end];
// }

// function mergeTextContents(
//   toBeMergedContents: TextContents[],
//   targetContents: TextContents[]
// ): TextContents[] {
//   const copyToBeMergedContents: TextContents[] = toBeMergedContents.concat();
//   const copyTargetContents: TextContents[]     = targetContents.concat();
//   const frontContent: TextContents             = copyToBeMergedContents.pop();
//   const backContent: TextContents              = copyTargetContents.shift();

//   if(!frontContent) {
//     return targetContents;
//   }

//   if(equalsArray(frontContent[1]? frontContent[1] : [], backContent[1]? backContent[1] : [])){
//     frontContent[0] += backContent[0];
//     copyToBeMergedContents.push(frontContent, ...copyTargetContents);
//   } else {
//     copyToBeMergedContents.push(frontContent, backContent, ...copyTargetContents);
//     console.log("1", frontContent, backContent, copyTargetContents);
//   }

//   return copyToBeMergedContents;
// }

// const converter = {
//   parseHtmlContents,
//   addContentsStyle,
//   deleteContentsStyle,
//   changeStyleTextContents,
//   sliceTextContents,
//   sliceText,
//   mergeTextContents
// }

// export default converter;