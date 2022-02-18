
function equalsArray(aryA: any[], aryB: any[]): boolean {
  if(!aryA && !aryB) return true;
  if(!Array.isArray(aryA) || !Array.isArray(aryB) || aryA.length !== aryB.length ) return false;

  const targetBList = [];

  for(let i = 0; i < aryA.length; i++) {
    const targetA = JSON.stringify(aryA[i]);
    if(!i) {
      for(let ii = 0; ii < aryB.length; ii++) {

        const targetB = JSON.stringify(aryB[ii]);
        if(targetA === targetB) {
          
        } else {
          targetBList.push(targetB)
        }

      }
      if(targetBList.length === aryB.length) return false;
    } else {
      const targetBListLength = targetBList.length;

      for(let ii = 0; ii < targetBList.length; ii++) {
        if(targetBList[ii] === targetA) {
          targetBList.splice(ii, 1);
          break;
        } 
      }

      if(targetBListLength === targetBList.length) {
        return false;
      }
      
    }
  } 

  return targetBList.length? false : true;
}


// function arrayFindIndex(array: any[], factor: any[]): number {
//   for(let i = 0; i < array.length; i++) {
//     if(array[i][0] === factor[0]) {
//       return i;
//     }
//   }
//   return -1;
// }

function arrayFindIndex(ary: any[][], targetAry: any[]): number {
  
  const target = new Set(targetAry);
  const length = targetAry.length;

  for(let i = 0; i < ary.length; i++) {
    if( ary.length === length 
      && ary[i].filter(val => target.has(val)).length === length ) return i;
  }

  return -1;
}

function arrayPush<T = any>(
  currentAry: T[], 
  targetData: T, 
  limitCount: number = 6
  ): T[] {

  const newCurrentAry = [...currentAry, targetData];

  if(limitCount < newCurrentAry.length) {
    newCurrentAry.shift();
  }

  return newCurrentAry;
}

export default {
  equalsArray,
  arrayPush,
  arrayFindIndex
}