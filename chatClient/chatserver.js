let io = require('socket.io')(9992, {
    cors: { // damit der server zu jedem anderen server(?)/origin eine connection herstellen kann
        origin: "*"
    }
});

let clients = []; // array for all client sockets

function messageHandler(data){
    io.emit('message', data);
    console.log(data);
}

function joinHandler(username){
    // push adds to the end of the array -> the last one is the one that currently joined, they don't get notified
    /*for(let i = 0; i < clients.length-1; i++){
        clients[i].send(username + " joined!");
    }*/
    this.broadcast.emit('message', username + " joined!");
    console.log(username);
}

function leaveHandler(username){
    this.broadcast.emit('message', username + " left!");
}

io.on('connection', function (socket) {
    clients.push(socket);
    console.log('reached');
    socket.on('message', messageHandler);
    socket.on('join', joinHandler);
    socket.on('leave', leaveHandler);
    socket.on("disconnect", (reason) => {
        console.log(reason);
    });
});


console.log("server listening on port 9992");