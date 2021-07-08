const express = require("express");
const cors = require('cors');
const { addUser, getUser, deleteUser, getUsers } = require('./users')

// App setup
const PORT = 5000;
const app = express();

app.use(cors());


const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = require("socket.io")(server, { cors: true, });
const activeUsers = new Set();
const randomString = ['The sudden rainstorm washed crocodiles into the ocean.', `It would have been a better night if the guys next to us weren't in the splash zone.`, `As he entered the church he could hear the soft voice of someone whispering into a cell phone.`]

users = [];
questions = [];

io.on("connection", (socket) => {
    console.log("Made socket connection");


    // socket.on("chat-message", (data) => {
    //     socket.emit("chat-message", randomString[Math.floor(Math.random() * 3)]);
    // });

    socket.on('join-room', ({ name, roomId }) => {
        if (!users.includes(name)) users.push(name);
        socket.join(roomId)
        io.to(roomId).emit('notification', { questions: questions.filter(x => x.roomId == roomId) })
        console.log(roomId)
    })

    socket.on('send-question', ({ roomId, question }) => {
        questions.push({ roomId: roomId, question: question })
        console.log(questions)
        io.to(roomId).emit('notification', { questions: questions.filter(x => x.roomId == roomId) })
    })
});


