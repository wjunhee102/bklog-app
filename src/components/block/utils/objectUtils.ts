function updateObject<T = any, P = any>(oldObject: T, ...newValues: P[]): T {
  return Object.assign({}, oldObject, ...newValues);
};

function modifyAnObject<T extends Object = any, P extends Object = any>(object: T, propertys: P) {
  const newObject: T = updateObject<T>(object);

  for(const key in propertys) {
    if(newObject.hasOwnProperty(key)) {
      newObject[key as keyof typeof newObject] = propertys[key as keyof typeof propertys] as any;

      if(!newObject[key as keyof typeof newObject]) delete newObject[key as keyof typeof newObject];
    }
  }

  return newObject;
}

export default {
  updateObject,
  modifyAnObject
}