import { resetToTargetPosition } from "./reducer/utils";
import { BlockData } from "./types";

const TEST_CASE_1: BlockData[] = [
  {
    position: "1",
    index: 1,
    parentId: "root",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 1입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-1",
    index: 2,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c163f96379e62",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 2입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-2",
    index: 3,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c16f496379e63",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 3입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-2-1",
    index: 4,
    parentId: "d5cc2725-97ec-494b-bc80-c16f496379e63",
    id: "d5cc2725-97ec-494b-bc80-c162f96379e64",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 4입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  }
];
const TEST_CASE_2: BlockData[] = [
  {
    position: "1-1-1",
    index: 1,
    parentId: "root",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 1입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-1-1-1",
    index: 2,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c163f96379e62",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 2입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-1-1-2",
    index: 3,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c16f496379e63",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 3입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "2-2",
    index: 4,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
    id: "d5cc2725-97ec-494b-bc80-c162f96379e64",
    type: "block",
    styleType: "bk-h1",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["블록 4입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  }
]

function testOrderingBlock() {

}

function testResetToTargetPosition() {
  const test1 = resetToTargetPosition(TEST_CASE_1, "4").map(block => block.position);
  const test1Result = ["4", "4-1", "4-1", "4-1-1"];
  const test2 = resetToTargetPosition(TEST_CASE_2, "4").map(block => block.position);
  const test2Result = ["4", "4-1", "4-1", "4"];
  console.log("TEST_1", test1, test1Result, test1.join("") === test1Result.join("")? "success" : "fail");
  console.log("TEST_2", test2, test2Result, test1.join("") === test1Result.join("")? "success" : "fail");
}



export default function blockTest() {
  testResetToTargetPosition();
}