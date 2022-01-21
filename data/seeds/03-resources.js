
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {resource_description: "1", resource_name: 'rowValue1'},
        {resource_description: "2", resource_name: 'rowValue2'},
        {resource_description: "3", resource_name: 'rowValue3'}
      ]);
    });
};
