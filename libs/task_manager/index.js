const cp = require('child_process')
let taskPool = {}

module.exports = {
/**
 * Creates a task 
 * @function
 * @param {string} id - The task id.
 * @param {string} task - The task object
 * @param {object} module - The module to use for this task.
 * @param {function} cb - The callback function.
 */
    createTask: (id, task, module, cb) => {
        // create a task 
        setTimeout(() => {
            taskPool[id] = cp.fork(`${__dirname}/plugins/${module}.plugin.js`, [], {env: {id: id}})
            taskPool[id].on('message', (task) => {
                cb(null, task)
            })    
        }, 3000)

    },

/**
 * Sends a command to a task.
 * @function
 * @param {string} id - The task id.
 * @param {object}  args- The object payload.
 * @param {function} cb - The callback function
 */
    cmdTask: (id, args, cb) => {

        if (taskPool[id]) {
            try {
                taskPool[id].send(args)
                cb(null)
            } catch (error) {
                console.log(error)
                cb(error)
            } 
        } else {
            cb({error:'task undefined'})
        }

    },
/**
 * Stops a task.
 * @function
 * @param {string} id - The task id.
 */
    stopTask: (id) => {
        if (taskPool[id]) {
            taskPool[id].send({CMD: 'stop_task'})
            setTimeout(() => {
                taskPool[id].kill()
                taskPool[id] = null
            }, 3000)
        } 
    },
/**
 * Returns all tasks.
 * @function
 */
    getAllTasks: () => {
        return taskPool
    }

}