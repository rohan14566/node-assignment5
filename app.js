const express=require("express");
const socket=require("socket.io")
const path=require("path")
const app=express()
app.use(express.static(path.join(__dirname,'./public')));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html');
})

const server=app.listen(3000,()=>{
    console.log("server is running")
})
const io=socket(server,{cors:{origin:"*"}});
let name;
io.on("connection",(socket)=>{
    console.log("user connected")
    socket.on("joining chat",(username)=>{
        name=username;
        io.emit("chat message",`----${name} has joined the chat----`);
    })
    socket.on("disconnect",()=>{
        console.log("user having left the conversation")
        io.emit("chat message",`---${name} has left the chat---`);
    })
    socket.on("chat message",(message)=>{
    socket.broadcast.emit("chat message",message)
    })
})