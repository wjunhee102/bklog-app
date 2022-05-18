function updateObject<T extends object>(oldObject: T, ...newValues: { [P in keyof T]?: T[P] }[]): T {
  return Object.assign({}, oldObject, ...newValues);
};

function modifyAnObject<T extends object>(object: T, propertys: { [P in keyof T]?: T[P] }): T {
  const newObject = updateObject(object);

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