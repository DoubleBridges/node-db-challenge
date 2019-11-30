
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
      .createTable('context', tbl => {
        tbl.increments()        
        tbl.string('context_name', 255)
          .notNullable()
          .unique()
        tbl.string('context_description', 255)
        
      })
      .createTable('project_resource', tbl => {
        tbl.increments()
        tbl.string('note', 255)
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
      .createTable('task_context', tbl => {
        tbl.increments()
        tbl.integer('task_id')
          .unsigned()
          .notNullable()
          .references('task.id')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
        tbl.integer('context_id')
          .unsigned()
          .notNullable()
          .references('context.id')
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
      .dropTableIfExists('context')
      .dropTableIfExists('project_resource')
      .dropTableIfExists('task_context')
  )
};