// build your `/api/tasks` router here

const router = require('express').Router()
const Tasks = require('./model')


router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getAll()
        res.status(200).json(tasks) 
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newTask = await Tasks.create(req.body)
        res.status(200).json(newTask)
    } catch (err) {
        next(err)
    }
})

module.exports = router;