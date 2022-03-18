import { ordering, sort } from "./test";

interface RawBlockData {
  id: string;
  parentId: string | null;
  previousId: string | null;
}


export const test1: RawBlockData[] = [
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T2",
    parentId: null,
    previousId: null,
  },
  {
    id: "T3",
    parentId: null,
    previousId: null,
  },
  {
    id: "T4",
    parentId: null,
    previousId: null,
  },
  {
    id: "T5",
    parentId: null,
    previousId: null,
  },
  {
    id: "T6",
    parentId: null,
    previousId: null,
  }
];

export const test2: RawBlockData[] = [
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T2",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T3",
    parentId: "T2",
    previousId: null,
  },
  {
    id: "T4",
    parentId: "T3",
    previousId: null,
  },
  {
    id: "T5",
    parentId: "T4",
    previousId: null,
  },
  {
    id: "T6",
    parentId: "T5",
    previousId: null,
  }
];

export const test3: RawBlockData[] = [
  {
    id: "T2",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T6",
    parentId: "T5",
    previousId: null,
  },
  {
    id: "T3",
    parentId: "T2",
    previousId: null,
  },
  {
    id: "T4",
    parentId: "T3",
    previousId: null,
  },
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T5",
    parentId: "T4",
    previousId: null,
  }
];

export const test4: RawBlockData[] = [
  {
    id: "T2",
    parentId: null,
    previousId: "T1",
  },
  {
    id: "T6",
    parentId: null,
    previousId: "T5",
  },
  {
    id: "T3",
    parentId: "T2",
    previousId: null,
  },
  {
    id: "T4",
    parentId: "T3",
    previousId: null,
  },
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T5",
    parentId: "T4",
    previousId: null,
  }
];

export const test5: RawBlockData[] = [
  {
    id: "T2",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T6",
    parentId: null,
    previousId: "T5",
  },
  {
    id: "T3",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T4",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T5",
    parentId: null,
    previousId: "T1",
  }
];

export const test6: RawBlockData[] = [
  {
    id: "T2",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T3",
    parentId: "T2",
    previousId: null,
  },
  {
    id: "T6",
    parentId: null,
    previousId: "T1",
  },
  {
    id: "T4",
    parentId: "T2",
    previousId: null,
  },
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T5",
    parentId: "T1",
    previousId: null,
  }
];

export const test7: RawBlockData[] = [
  {
    id: "T2",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T3",
    parentId: "T2",
    previousId: null,
  },
  {
    id: "T6",
    parentId: "T1",
    previousId: "T4",
  },
  {
    id: "T4",
    parentId: "T1",
    previousId: null,
  },
  {
    id: "T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "T5",
    parentId: "T4",
    previousId: null,
  }
];

export const test8: RawBlockData[] = [
  {
    id: "4T1",
    parentId: null,
    previousId: null,
  },
  {
    id: "4T1-1-1",
    parentId: "4T1-1",
    previousId: null,
  },
  {
    id: "4T2",
    parentId: null,
    previousId: "4T1",
  },
  {
    id: "4T3",
    parentId: null,
    previousId: "4T2"
  },
  {
    id: "4T1-1",
    parentId: "4T1",
    previousId: null,
  }
];

const sortedTest1 = sort(test1);
const sortedTest2 = sort(test2);
const sortedTest3 = sort(test3);
const sortedTest4 = sort(test4);
const sortedTest5 = sort(test5);
const sortedTest6 = sort(test6);
const sortedTest7 = sort(test7);
const sortedTest8 = sort(test8);

const orderingTest1 = ordering(sortedTest1);
const orderingTest2 = ordering(sortedTest2);
const orderingTest3 = ordering(sortedTest3);
const orderingTest4 = ordering(sortedTest4);
const orderingTest5 = ordering(sortedTest5);
const orderingTest6 = ordering(sortedTest6);
const orderingTest7 = ordering(sortedTest7);

const TEST_CASE = "T1T2T3T4T5T6";
const getId = (block:RawBlockData) => block.id;
test("sort", () => {

  expect(sortedTest1.map(getId).join("")).toEqual(TEST_CASE);
  expect(sortedTest2.map(getId).join("")).toEqual(TEST_CASE);
  expect(sortedTest3.map(getId).join("")).toEqual(TEST_CASE);
  expect(sortedTest4.map(getId).join("")).toEqual(TEST_CASE);
  expect(sortedTest5.map(getId).join("")).toEqual(TEST_CASE);
  expect(sortedTest6.map(getId).join("")).toEqual(TEST_CASE);
});

test("ordering", () => {
  expect(orderingTest1.blockList.map(getId).join("")).toEqual(TEST_CASE);
  expect(orderingTest2.blockList.map(getId).join("")).toEqual(TEST_CASE);
  expect(orderingTest3.blockList.map(getId).join("")).toEqual(TEST_CASE);
  expect(orderingTest4.blockList.map(getId).join("")).toEqual(TEST_CASE);
  expect(orderingTest5.blockList.map(getId).join("")).toEqual(TEST_CASE);
  expect(orderingTest6.blockList.map(getId).join("")).toEqual(TEST_CASE);
  expect(orderingTest7.blockList.map(getId).join("")).toEqual(TEST_CASE);
});