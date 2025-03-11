export const up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").unique().notNullable();
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
