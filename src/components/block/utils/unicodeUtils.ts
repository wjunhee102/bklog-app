type Decimal = 10 | 16;

function charToUnicode(char: string, decimal: Decimal = 16): string {
  return char.charCodeAt(0).toString(decimal);
}

function stringToUnicode(decimal: Decimal = 16) {
  return (str: string): string[] => {
  
    const unicode = [];
  
    for (let i = 0, l = str.length; i < l; i++) {
      unicode.push(charToUnicode(str[i], decimal));
    };
    
    return unicode;
  }
} 

function unicodeToChar(decimal: Decimal = 16) {
  return (unicode: string | number): string => {
    let convertedUnicode: number;

    if(typeof unicode === "string") {
      convertedUnicode = parseInt(unicode, decimal);
    } else if(decimal === 16) {
      convertedUnicode = parseInt(`${unicode}`, 16);
    } else {
      convertedUnicode = unicode;
    }

    return String.fromCharCode(convertedUnicode);
  }
}

function unicodeHexTochar(unicode: string, decima: Decimal = 16) {
  return String.fromCharCode(parseInt(`${parseInt(unicode, 16)}`, 16));
} 

export default {
  charToUnicode: charToUnicode,
  stringToUnicode16: stringToUnicode(),
  stringToUnicode10: stringToUnicode(10),
  unicode16ToChar: unicodeToChar(),
  unicode10ToChar: unicodeToChar(10),
  unicodeHexTochar
}