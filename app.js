'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('./server/log');
var names = require('./server/name');
var player = require('./server/player');

const PLAYER_NUMBER = 4;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

var rc = 0;
var playerList = [{}];

io.on('connection', function(socket){
    logger.info('A user connected: ' + socket.request.socket.remoteAddress);

    socket.on('gName', function (){
        if( io.nsps['/'].adapter.rooms[rc] && 
            io.nsps['/'].adapter.rooms[rc].length > (PLAYER_NUMBER - 1)){
            rc++;
            playerList.push({});
        }
        socket.join(rc);
        if (io.nsps['/'].adapter.rooms[rc].length === PLAYER_NUMBER){
            playerList[rc].runGame = true;
            
            io.sockets.in(rc).emit('startGame');
        }
        
        let currentName = names();
        let currentPlayer = player(socket.id,rc,currentName,250,250);
        playerList[rc][socket.id] = currentPlayer;
        
        logger.info('A user asked for name and get ' + currentPlayer.name + ' in ' + currentPlayer.room);
        socket.emit('joinData', {
            name: currentPlayer.name,
            x: currentPlayer.x,
            y: currentPlayer.y
        });
    });
 
    socket.on('disconnect', function (){
        if (playerList[rc]){
            if (playerList[rc][socket.id]){
                delete playerList[rc][socket.id];
            }
        }
        logger.info('A user disconnected');
    });
 });

setInterval(function(){
    let i;
    for (i = 0; i < playerList.length; i++){
        if (playerList[i].runGame){
            io.sockets.in(rc).emit('newState');
        }
    }
    //socket.emit('news_by_server', 'Cow goes moo'); 
}, 1000/25);

http.listen(6066, function(){
    logger.info('listening on *:6066');
 });