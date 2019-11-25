
exports.seed = function(knex) {
  return knex('task').insert([
    {id: 1, task_description: 'First Task Description', task_notes: 'First Task Notes', task_completed: false, project_id: 3},
    {id: 2, task_description: 'Second Task Description', task_notes: 'Second Task Notes', task_completed: false, project_id: 2},
    {id: 3, task_description: 'Third Task Description', task_notes: 'Third Task Notes', task_completed: false, project_id: 1}
  ]);
};
