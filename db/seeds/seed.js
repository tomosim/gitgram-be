const { userData, languageData, repositoryData } = require("../data");
const {
  formatRepositoryData,
  createLookupTable,
  createJunctionTable
} = require("../utils/utils");

exports.seed = function(connection) {
  return connection("users")
    .insert(userData)
    .returning("*")
    .then(userRows => {
      console.log(userRows);
      const langPromise = connection("languages")
        .insert(languageData)
        .returning("*");
      const repoPromise = connection("repositories")
        .insert(formatRepositoryData(repositoryData))
        .returning("*");
      return Promise.all([langPromise, repoPromise]);
    })
    .then(([langRows, repoRows]) => {
      console.log(repoRows);
      const langLookup = createLookupTable(langRows, "name", "language_id");
      const repoLookup = createLookupTable(repoRows, "title", "repository_id");
      const juncTable = createJunctionTable(
        repositoryData,
        repoLookup,
        langLookup
      );
      return connection("repo-lang")
        .insert(juncTable)
        .returning("*");
    })
    .then(console.log);
};

//HAVE: name, owner, description, languages
//WANT: title, owner, description
