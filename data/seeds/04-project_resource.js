exports.seed = function(knex) {
  return knex('project_resource').insert([
    {id: 1, project_id: 1, resource_id: 3, note: 'First Project_Resouce Note'},
    {id: 2, project_id: 2, resource_id: 2, note: 'Second Project_Resouce Note'},
    {id: 3, project_id: 3, resource_id: 1, note: 'Third Project_Resouce Note'}
  ])
};