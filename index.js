
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io")
app.use(cors());


const server = http.createServer(app);
const io = new Server(server)


io.on("connection", (socket) => {
    console.log("connected", socket.id)
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with ID:${socket.id} joined room ${data}`)
    })
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.to(data.room).emit("recieved_message",data)
    })
    socket.on("disconnect", () => {
        console.log("user disconnet from the server", socket.id)
    })
})

server.listen(8080, () => {
    console.log("server is runing on port 8080")
})