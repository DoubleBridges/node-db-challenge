export const convertToBoolean = (obj, name) => {
  obj[`${name}_completed`] = !!obj[`${name}_completed`]
  return obj
}

export const getContext = (arr, db) => arr.map(async task => {
  const contexts = await db.select('c.id', 'c.context_name', 'c.context_description')
    .from('context as c')
    .join('task_context as tc', function () {
      this.on(task.id, '=', 'tc.task_id')
      .andOn('tc.context_id', '=', 'c.id')
    })
  convertToBoolean(task, 'task')
  return { ...task, contexts: contexts }
})