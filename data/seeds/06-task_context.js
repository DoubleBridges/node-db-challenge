
exports.seed = function(knex) {
  return knex('task_context').insert([
    {id: 1, task_id: 1, context_id: 3},
    {id: 2, task_id: 2, context_id: 2},
    {id: 3, task_id: 3, context_id: 1}
  ])
};
