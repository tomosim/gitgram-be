exports.formatRepositoryData = data => {
  if (data.length === 0) return [];
  const formattedData = data.map(datum => {
    const { name: title, languages, ...restOfKeys } = datum;
    return { title, ...restOfKeys };
  });
  return formattedData;
};

exports.createLookupTable = (rows, key, value) => {
  if (rows.length === 0) return {};
  const lookupTable = {};
  rows.forEach(row => {
    lookupTable[row[key]] = row[value];
  });
  return lookupTable;
};
