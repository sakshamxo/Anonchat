// const { name } = require("ejs");

const io = require( "socket.io" )();
const socketapi = {
    io: io
};
var userid = [];
var username = []


io.on( "connection", function( socket ) {
    console.log( "A user connected" );
    io.emit('onlineuser',username)

    socket.on('typing',function(){
    socket.broadcast.emit('typing', {username:username[userid.indexOf(socket.id)]});
    })

    socket.on('disconnect',function(){
      let disconnected = userid.indexOf(socket.id)
      userid.splice(disconnected,1);
      username.splice(disconnected,1)
      io.emit('onlineuser',username)
    })
// console.log(user)

socket.on('name',function(data){
    userid.push(socket.id)
    username.push(data)
    io.emit('name',data)
    // console.log(data)
    io.emit('onlineuser',username)
   
})
    socket.on('msg',function(data){
       let naam = username[userid.indexOf(socket.id)]
       console.log(username[userid.indexOf(socket.id)])
        io.emit('msg',{owner:naam , msg:data})
       
    })

  
});


module.exports = socketapi;