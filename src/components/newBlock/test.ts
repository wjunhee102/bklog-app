import { TextContents } from "../../types/bklog";
import { mergeTextContents, sliceTextContents } from "./reducer/utils";

const TEST_TEXT: TextContents[] = [
  ["01234"],
  ["5678", [["b"], ["i"]]],
  ["912", [["b"]]]
];

const TEST_TEXT2: TextContents[] = [
  ["01234", [["b"]]],
  ["5678", [["b"], ["i"]]],
  ["912"]
];

const TEST_TEST1: TextContents[] = [
  ["3456"],
  ["78910", [["b"]]]
];

export default function testNewBlock() {
  console.log(sliceTextContents(TEST_TEXT.concat(), 6, 6));
  console.log(mergeTextContents(TEST_TEXT2, TEST_TEST1));
}