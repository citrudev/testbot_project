
const id = process.env.id
const Nightmare = require('nightmare')
let operations = {}

//This plugin is used for test purposes only

/*
This is the standard of sending back a message to the main process

process.send({id: id, data: {
    CMD: '', <---- The command
    status: '' <---- The current status of the task (Text describing the what is happening)
    action: '' <------ [Started, Stoped, Idle, Completed, Failed]
    payload: {} <------ data from plugin 
}})

*/

process.send({id: id, data: {
    CMD: 'task_status',
    status: 'Task has been created',
    action: 'Idle',
    payload: {error: null}
}})

process.on('message', (task) => {
 // This section is used to control the behavior of the task.
  switch(task.CMD) {
      case 'start':
        process.send({id: id, data: {
            CMD: 'task_status',
            status: 'Task started',
            action: 'Started',
            payload: {error: null}
        }})
        operations.work(task.args)
        break
    case 'stop_task':
        process.send({id: id, data: {
            CMD: 'task_status',
            status: 'Task stopped',
            action: 'Stopped',
            payload: {error: null}
        }})
        break
  }
})

operations.work = function (args) {
(async () => {
    let task  = args.task
    try {
        const nightmare = Nightmare({ show: true })
        



        //return the result of the automation action
        process.send({id: id, data: {
            CMD: 'task_status',
            status: 'Task completed',
            action: 'Completed',
            payload: {error: null, data: dimension}
        }})
        
        
    } catch (error) {
        console.log(error)
        process.send({id: id, data: {
            CMD: 'failed_task',
            status: 'Task Failed',
            action: 'Failed',
            payload: {error: error, data: task}
        }})
    }
   
})()
}



