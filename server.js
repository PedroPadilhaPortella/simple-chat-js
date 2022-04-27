const express = require('express')
const http = require('http')

const port = 3000
const users = []
// const messages = []

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/styles/index.css', (req, res) => {
    res.sendFile(__dirname + '/public/styles/index.css')
})

io.on('connection', (socket) => {
    let name = ''

    socket.on('has connected', (username) => {
        name = username
        users.push(username)
        io.emit('has connected', {users, username: name})
        // io.emit('update messages', messages)
    })

    socket.on('disconnect', () => {
        users.splice(users.indexOf(name), 1)
        io.emit('has disconnected', {users, username: name})
    })

    socket.on('send message', (message) => {
        // messages.push({message, username: name})
        io.emit('update messages', {message, username: name})
    })
})

server.listen(port, () => console.log(`Server listening on http://localhost:${port}`))