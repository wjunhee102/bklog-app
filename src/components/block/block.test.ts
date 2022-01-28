import { resetToTargetPosition } from "./reducer/utils";
import { BlockData } from "./types";

const TEST_BLOCK_1: BlockData[] = [
  {
    position: "1",
    index: 1,
    parentId: "root",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "text",
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
    type: "text",
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
    type: "text",
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
    type: "text",
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
const TEST_BLOCK_2: BlockData[] = [
  {
    position: "1-1-1",
    index: 1,
    parentId: "root",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "text",
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
    type: "text",
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
    type: "text",
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
    type: "text",
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

// function testOrderingBlock() {

// }

// type TestResetToTargetPosition = [BlockData[], string, string[]];

// function testResetToTargetPosition(...testCases: TestResetToTargetPosition[]) {
//   console.group("%cTEST: resetToTargetPosition", "color: rgba(106, 227, 116, 1);");
//   for(let i = 0; i < testCases.length; i++) {
//     console.group(`TEST_${i + 1}`)
//     console.time('TIME');
//     const test = resetToTargetPosition(testCases[i][0], testCases[i][1]).map(block => block.position)
//     console.log("기대값: ", testCases[i][2]);
//     console.log("결과값: ", test);
    
//     const res = test.join("") === testCases[i][2].join("")? "success" : "fail";
//     if(res === "success") {
//       console.log(`%c${res}`, "color: rgba(106, 227, 116, 1);");
//     } else {
//       console.log(`%c${res}`, "color: red;");
//     }
//     console.timeEnd('TIME');
//     console.groupEnd();
//   }
//   console.groupEnd();
// }

// export default function blockTest() {
//   testResetToTargetPosition(
//     [TEST_CASE_1, "4-1", ["4-1", "4-1-1", "4-1-1", "4-1-1-1"]],
//     [TEST_CASE_2, "4-1", ["4-1", "4-1-1", "4-1-1", "4-1"]]
//   );
// }

test('resetToTargetPosition', () => {
  const test1 = resetToTargetPosition(TEST_BLOCK_1, "4-1").map(block => block.position).join("");
  const test2 = resetToTargetPosition(TEST_BLOCK_2, "4-1").map(block => block.position).join("");
  
  const TEST_CASE_1 = ["4-1", "4-1-1", "4-1-1", "4-1-1-1"].join("");
  const TEST_CASE_2 = ["4-1", "4-1-1", "4-1-1", "4-1"].join("");
  
  expect(test1).toEqual(TEST_CASE_1);
  expect(test2).toEqual(TEST_CASE_2);
})