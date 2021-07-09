import { TextContents } from "../../types/bklog";
import { sliceTextContents } from "./reducer/utils";

const TEST_TEXT: TextContents[] = [
  ["01234"],
  ["5678", [["b"], ["i"]]],
  ["912", [["b"]]]
];

export default function testNewBlock() {
  console.log(sliceTextContents(TEST_TEXT, 6, 6));
}