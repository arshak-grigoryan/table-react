function getColumnsNames(data, unusedColumns = [], necessaryColumns = []) {
  // is pure function ?, i know my data structure !!
  const columnsSet = new Set();
  data
    .map((v) => Object.keys(v))
    .forEach((v) => v.forEach((v) => columnsSet.add(v)));
  unusedColumns.forEach((v) => columnsSet.delete(v));
  necessaryColumns.forEach((v) => columnsSet.add(v));
  return Promise.resolve(Array.from(columnsSet));
}

export default getColumnsNames;

// function mapper(array, processor, includeItems = [], excludeItems = []) {
//   const columnsSet = new Set();
//   array.map(processor).forEach((e) => {
//     if (includeItems.includes(e) && !excludeItems.includes(e)) {
//       columnsSet.add(e);
//     }
//   });
//   return Promise.resolve(Array.from(columnsSet));
// }

// mapper([1, 2, 3, 45], (item) => Math.pow(item, 2)).then(console.log);
