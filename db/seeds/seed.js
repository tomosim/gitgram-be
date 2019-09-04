const { userData, languageData, repositoryData } = require("../data");

exports.seed = function(connection) {
  return connection("users")
    .insert(userData)
    .returning("*")
    .then(userRows => {
      const langPromise = connection("languages")
        .insert(languageData)
        .returning("*");
      //   const repoPromise = connection("repositories")
      //     .insert(repositoryData)
      //     .returning("*");
    });
};
