
exports.seed = function(knex) {
  return knex('project').insert([
    {id: 1, project_name: 'First Project', project_description: 'First Project Description', project_completed: false},
    {id: 2, project_name: 'Second Project', project_description: 'Second Project Description', project_completed: false},
    {id: 3, project_name: 'Third Project', project_description: 'Third Project Description', project_completed: false}
  ]);
};
