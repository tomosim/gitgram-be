exports.up = function(knex) {
  return knex.schema.createTable("users", user => {
    user.string("username").primary();
    user.string("avatar_url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
