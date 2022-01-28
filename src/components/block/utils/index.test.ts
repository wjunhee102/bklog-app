import { 
  charToUnicode,
  stringToUnicode16, 
  stringToUnicode10,
  unicode16ToChar,
  unicode10ToChar,
  unicodeHexTochar
} from ".";

test('char to unicode',  () => {
  expect(charToUnicode("1")).toEqual("31");
  expect(charToUnicode("1", 10)).toEqual("49");
}); 

test('string to unicode 16', () => {
  expect(stringToUnicode16("12").join("")).toEqual("3132");
});

test('string to unicode 10', () => {
  expect(stringToUnicode10("12").join("")).toEqual("4950");
});

test('unicode 16 to char', () => {
  expect(unicode16ToChar(31)).toEqual("1");
  expect(unicode16ToChar("31")).toEqual("1");
});

test('unicode 10 to char', () => {
  expect(unicode10ToChar(49)).toEqual("1");
  expect(unicode10ToChar("49")).toEqual("1");
});

test('unicode Hex to char', () => {
  expect(unicodeHexTochar("1f")).toEqual("1");
})