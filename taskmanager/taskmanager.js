const cp = require('child_process')
let taskPool = {}

module.exports = {
/**
 * Creates a task.
 * @function
 * @param {string} id - The task id.
 * @param {object} module - The module to use for this task.
 * @param {function} cb - The callback function.
 */
    createTask: (id, module, task, cb) => {
        // create and start a task
        taskPool[id] = cp.fork(`${__dirname}/plugins/${module}.plugin.js`,[JSON.stringify(task)])
        taskPool[id].on('message', (task) => {
            cb(null, {task: task})
        })
    },

/**
 * Sends a command to a task.
 * @function
 * @param {string} id - The task id.
 * @param {object} message - The command payload.
 * @param {function} cb - The callback function
 */
    cmdTask: (id, message, cb) => {
        if (taskPool[id]) {
            try {
                taskPool[id].send(message)
                cb(null, {message: message})
            } catch (e) {
                cb({error: e})
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
            taskPool[id].kill()
            taskPool[id] = null
        } 
    },

}