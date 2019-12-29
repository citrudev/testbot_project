

module.exports = (app, io) => { 
//Section for basic routes
    app.get('/app', (req, res) => {res.sendFile(path.join(__basedir + '/dist/index.html'))})




//Section for socket-io routes (realtime communications)
    io.on('connection', (socket) => {


    })
}