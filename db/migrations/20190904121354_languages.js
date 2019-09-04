exports.up = function(knex) {
  return knex.schema.createTable("languages", language => {
    language.increments("language_id");
    language.string("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("languages");
};
