function getColumnsNames(data, includeItems = [], excludeItems = []) {
  const columnsSet = new Set();
  data
    .map((item) => Object.keys(item))
    .forEach((val) => val.forEach((v) => columnsSet.add(v)));
  excludeItems.forEach((v) => columnsSet.delete(v));
  includeItems.forEach((v) => columnsSet.add(v));
  return Promise.resolve(Array.from(columnsSet));
}

export default getColumnsNames;

// generic version

// export const getColumns = function (data, processor, includeItems=[], excludeItems=[]) {
//   const columnsSet = new Set()
//   data.map(processor).forEach(v => {
//     console.log(v)
//     if (includeItems.includes(v) && !excludeItems.includes(v)) {
//       columnsSet.add(v)
//     }
//   })
//   return Promise.resolve(Array.from(columnsSet))
// }
