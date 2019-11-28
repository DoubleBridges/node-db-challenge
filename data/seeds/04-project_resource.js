exports.seed = function(knex) {
  return knex('project_resource').insert([
    {id: 1, project_id: 1, resource_id: 3},
    {id: 2, project_id: 2, resource_id: 2},
    {id: 3, project_id: 3, resource_id: 1}
  ])
};