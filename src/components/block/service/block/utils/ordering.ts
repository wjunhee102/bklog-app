export const test = 0;
// export function sortBlock<T extends RawBlockData = any>(blockDataList: T[]): T[] {
//   return blockDataList.concat().sort((a, b) => {
//     if(a.position === b.position) {
//       return 0
//     }
//     const ary1 = a.position.split(/-/);
//     const ary2 = b.position.split(/-/);

//     let length = 0;
//     while(ary1[length] && ary2[length]) {
//       const aNum = Number(ary1[length]);
//       const bNum = Number(ary2[length]);

//       if(aNum > bNum) {
//         return 1;
//       } else if(aNum < bNum) {
//         return -1;
//       }

//       length++;
//     }

//     if(!ary1[length] && !ary2[length]) {
//       return 0;
//     } else {
//       return ary1[length]? 1 : -1;
//     }
//   });
// }

// export function orderingBlock(blockDataList: BlockData[] | RawBlockData[]): ResBlockUtils {
//   const preBlockDataList = copyToNewObjectArray(blockDataList);
//   const newBlockDataList: BlockData[] = [];
//   const tempData: TempDataType = { update: [] };
//   const modifyData: any[] = [];

//   let preBlockListlength = preBlockDataList.length - 1;

//   if(preBlockListlength === -1) {
//     return {
//       blockList: [],
//       modifyData,
//       tempData
//     }
//   }

//   const stackId: string[] = [];
//   let stackIdLength = 0;
//   let index = 1;
//   let currentPosition = [1];
//   let currentPositionLength = 0;

//   stackId.push(preBlockDataList[0].id);

//   newBlockDataList.push(Object.assign({}, preBlockDataList[0], {
//     index: 0,
//     parentId: "root",
//     position: "1"
//   }));

//   if(preBlockDataList[0].position !== "1") {

//     tempData.update?.push(createTempData(preBlockDataList[0].id, {
//       position: preBlockDataList[0].position
//     }));

//     modifyData.push(
//       setUpdateModifyDataOfBlock(preBlockDataList[0].id, {
//         position: "1"
//       })
//     );

//   }

//   preBlockDataList.shift();

//   while(preBlockListlength) {
//     let block = preBlockDataList.shift();
    
//     if(!block) {
//       console.log("not block", preBlockDataList, blockDataList);
//       return {
//         blockList: [],
//         modifyData,
//         tempData
//       };
//     }
    
//     let length = block.position.split(/-/).length - 1;

//     if(currentPositionLength === length) {
      
//       stackId[stackIdLength] = block.id;
//       currentPosition[currentPositionLength]++;

//     } else if(currentPositionLength < length){

//       stackId.push(block.id);
//       stackIdLength++;
//       currentPosition.push(1);
//       currentPositionLength++;

//     } else {

//       for(let i = 0; i <= currentPositionLength - length; i++) {
//         currentPosition.pop();
//         currentPositionLength--;
//         stackId.pop();
//         stackIdLength--;
//       } 

//       currentPosition[currentPositionLength]++;
//       stackId[stackIdLength] = block.id;
//     }

//     let position = currentPosition.join("-");

//     if(position !== block.position) {

//       tempData.update?.push(createTempData(block.id, {
//         position: block.position
//       }));

//       modifyData.push(setUpdateModifyDataOfBlock(block.id, {
//         position
//       }));
      
//     }
    
//     newBlockDataList.push(Object.assign({}, block, {
//       index,
//       parentId: !stackIdLength? "root" : stackId[stackIdLength - 1],
//       position
//     }));

//     preBlockListlength--;
//     index++;
//   }

//   return {
//     blockList: newBlockDataList,
//     tempData,
//     modifyData
//   };
// }
