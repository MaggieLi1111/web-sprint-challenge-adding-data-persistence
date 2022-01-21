// build your `Project` model here
const db =require("../../data/dbConfig.js")

async function getAll() {
    const projects = await db("resources")
    const newProjects = []
    projects.forEach(project => {
        project.project_completed === 0 ? newProjects.push({...project, project_completed:false}) : newProjects.push({...project, project_completed:true})
    })
    return newProjects
}

async function getById(id) {
    const project = await db("projects").where("project_id", id).first()
    let completed = project.project_completed
    completed === 0 || !completed ? completed = false : completed = true
    return ({ ...project, project_completed:completed})    
}

async function create(newProject) {
    const [project_id] = await db("projects").insert(newProject)
    return getById(project_id)
}

module.exports = {
    getAll,
    getById, 
    create
}