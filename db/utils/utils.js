exports.formatRepositoryData = data => {
  const formattedData = data.map(datum => {
    const { name: title, languages, ...restOfKeys } = datum;
    return { title, ...restOfKeys };
  });
  return formattedData;
};

exports.createLookupTable = (rows, key, value) => {
  const lookupTable = {};
  rows.forEach(row => {
    lookupTable[row[key]] = row[value];
  });
  return lookupTable;
};

exports.createJunctionTable = (repositories, repoLookup, langLookup) => {
  const junctionTable = [];
  repositories.forEach(repository => {
    const repository_id = repoLookup[repository.name];
    repository.languages.forEach(language => {
      const language_id = langLookup[language];
      junctionTable.push({ repository_id, language_id });
    });
  });
  return junctionTable;
};
