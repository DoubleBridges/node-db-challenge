
exports.seed = function(knex) {
  return knex('resource').insert([
    {id: 1, resource_name: 'First Resource', resource_description: 'First Resource Description'},
    {id: 2, resource_name: 'Second Resource', resource_description: 'Second Resource Description'},
    {id: 3, resource_name: 'Third Resource', resource_description: 'Third Resource Description'}
  ])
};
