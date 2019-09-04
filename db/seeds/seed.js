const { userData, languageData, repositoryData } = require("../data");
const { formatRepositoryData } = require("../utils/utils");
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
    .then(mystery => {
      console.log(mystery);
    });
};

//HAVE: name, owner, description, languages
//WANT: title, owner, description
