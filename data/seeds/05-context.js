exports.seed = function(knex) {
  return knex('context').insert([
    {id: 1, context_name: 'First Context', context_description: 'First Context Description'},
    {id: 2, context_name: 'Second Context', context_description: 'Second Context Description'},
    {id: 3, context_name: 'Third Context', context_description: 'Third Context Description'}
  ])
};
