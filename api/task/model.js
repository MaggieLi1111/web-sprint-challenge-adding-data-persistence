// build your `Task` model here
const db = require("../../data/dbConfig")

async function getAll() {
    const tasks = await db("tasks as t")
    .leftjoin("projects as p", "t.project_id", "p.project_id")
    .select("t.*", "p.project_name", "p.project_description")

    const newTasks = [];
    for( let i = 0; i < tasks.length ; i++) {
        let newTask = {
            task_id: tasks[i].task_id,
            task_description:tasks[i].task_description,
            task_notes: tasks[i].task_notes,
            task_completed: tasks[i].task_completed === 0 ? false : true,
            project_name: tasks[i].project_name,
            project_description: tasks[i].project_description
        }
        newTasks.push(newTask)
    }
    return newTasks;
}

async function getById (id) {
    const task = await db("tasks").where("task_id", id).first()
    let completed = task.project_completed
    completed === 0 || !completed ? completed = false : completed = true
    return ({ ...task, task_completed: completed})
}
async function create(newTask) {
    const [task_id] = await db("tasks").insert(newTask)
    return getById(task_id)
}

module.exports = {
    getAll,
    getById,
    create
}