export default function removeDuplicatesBy(keyFn, array) {
  const mySet = new Set();
  return array.filter(el => {
    const key = keyFn(el);
    const isNew = !mySet.has(key);
    if (isNew) {
      mySet.add(key);
    }
    return isNew;
  });
}
