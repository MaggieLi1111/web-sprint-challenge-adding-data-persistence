// build your `Task` model here
const db = require("../../data/dbConfig")

const transform = (int) => {
    if (int === 0) {
        return false;
    } else {
        return true;
    }
}

async function getAll() {
    const tasks = await db("tasks as t")
        .leftjoin("projects as p", "t.project_id", "p.project_id")
        .select("t.*", "p.project_name", "p.project_description")

    const transformedTasks = tasks.forEach(task => {
        const newCompleted = transform(task.task_completed);
        task.task_completed = newCompleted;
    })

    return transformedTasks;
}

async function getById(id) {
    const task = await db("tasks").where("task_id", id).first()
    let completed = task.project_completed
    completed === 0 || !completed ? completed = false : completed = true
    return ({ ...task, task_completed: completed })
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