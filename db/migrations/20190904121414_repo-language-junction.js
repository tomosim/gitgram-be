exports.up = function(knex) {
  return knex.schema.createTable("repo-lang", junction => {
    junction.integer("repository_id").references("repositories.repository_id");
    junction.integer("language_id").references("languages.language_id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("repo-lang");
};
