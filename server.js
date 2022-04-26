const express = require('express')
const http = require('http')

const port = 3000
const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/styles/index.css', (req, res) => {
    res.sendFile(__dirname + '/styles/index.css')
})

io.on('connection', (socket) => {   
    console.log('a user has been connected')

    socket.on('disconnect', () => {
        console.log('a user has been disconnected')
    })
})

server.listen(port, () => console.log(`Server listening on http://localhost:${port}`))