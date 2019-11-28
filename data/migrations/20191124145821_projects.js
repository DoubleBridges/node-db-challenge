
exports.up = function(knex) {
  return (
    knex.schema
      .createTable('project', tbl => {
        tbl.increments()
        tbl.string('project_name', 255)
          .notNullable()
          .unique()
        tbl.string('project_description', 255)
        tbl.boolean('project_completed', false )
      })
      .createTable('resource', tbl => {
        tbl.increments()        
        tbl.string('resource_name', 255)
          .notNullable()
          .unique()
        tbl.string('resource_description', 255)
      })
      .createTable('task', tbl => {
        tbl.increments()
        tbl.string('task_description', 255)
        tbl.string('task_notes')
        tbl.boolean('task_completed', false)
        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project.id')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
      })
      .createTable('project_resource', tbl => {
        tbl.increments()
        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('project.id')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
        tbl.integer('resource_id')
         .unsigned()
         .notNullable()
         .references('resource.id')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')
      })
  )
};

exports.down = function(knex) {
  return (
    knex.schema
      .dropTableIfExists('project')
      .dropTableIfExists('resource')
      .dropTableIfExists('task')
  )
};
