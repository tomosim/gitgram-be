exports.formatRepositoryData = data => {
  if (data.length === 0) return [];
  const formattedData = data.map(datum => {
    const { name: title, languages, ...restOfKeys } = datum;
    return { title, ...restOfKeys };
  });
  return formattedData;
};
