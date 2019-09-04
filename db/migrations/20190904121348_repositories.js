exports.up = function(knex) {
  return knex.schema.createTable("repositories", repository => {
    repository.increments("repository_id");
    repository.string("title");
    repository.string("owner").references("users.username");
    repository.string("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("repositories");
};
