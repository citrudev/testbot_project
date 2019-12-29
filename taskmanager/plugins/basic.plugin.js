const id = process.env.id
const Nightmare = require('nightmare')
let operations = {}


process.send({id: id, data: {
    CMD: 'task_status',
    status: 'Task has been created',
    action: 'Idle',
    payload: {error: null, data: null}
}})


process.on('message', (task) => {
  switch(task.CMD) {
      case 'start':
        process.send({id: id, data: {
            CMD: 'task_status',
            status: 'Task started',
            action: 'Started',
            payload: {error: null, data: null}
        }})
        operations.work(task.args)
        break
    case 'stop_task':
        process.send({id: id, data: {
            CMD: 'task_status',
            status: 'Task stopped',
            action: 'Stopped',
            payload: {error: null, data: null}
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



