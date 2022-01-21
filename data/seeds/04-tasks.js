
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {task_notes: "1", task_description: 'rowValue1', project_id:1},
        {task_notes: "2", task_description: 'rowValue2', project_id:2, task_completed:true},
        {task_notes: "3", task_description: 'rowValue3'}
      ]);
    });
};
