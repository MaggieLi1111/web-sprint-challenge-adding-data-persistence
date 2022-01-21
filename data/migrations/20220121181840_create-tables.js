
exports.up = function(knex) {
  return knex.schema
  .createTable("projects", table => {
      table.increments("project_id")
      table.text("project_name", 128).notNullable()
      table.text("project_description", 256)
      table.boolean("project_completed").defaultTo(0)
  })
  .createTable("resources", table => {
      table.increments("resource_id")
      table.text("resource_name", 128).notNullable().unique()
      table.text("resource_description", 256)
  })
  .createTable("tasks", table => {
      table.increments("task_id")
      table.text("task_description", 256).notNullable()
      table.text("task_notes",600)
      table.boolean("task_completed").defaultTo(0)
      table.integer("project_id")
      .unsigned()
      .notNullable()
      .references("project_id")
      .inTable("projects")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT")
  })
  .createTable("project_resources", table => {
      table.increments("project_resources_id")
      table.integer("resource_id")
      .unsigned()
      .notNullable()
      .references("resource_id")
      .inTable("resources")
      .onDelete("RESTRICT")
      .onUpdate("RESTIRCT")
      table.integer("project_id")
      .unsigned()
      .notNullable()
      .references("project_id")
      .inTable("projects")
      .onDelete("RESTIRCT")
      .onUpdate("RESTIRCT")

  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("project_resources")
  .dropTableIfExists("tasks")
  .dropTableIfExists("resources")
  .dropTableIfExists("projects")
};
