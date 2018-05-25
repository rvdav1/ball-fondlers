'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var logger = require('./server/log');
var names = require('./server/name');
var player = require('./server/player');
var room = require('./server/room');

const PLAYER_NUMBER = 2;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

var roomList = [];
var rc = 0;
var currentRoom = new room('room'+rc, PLAYER_NUMBER);

io.on('connection', function(socket){
    let clientRoom = -1;
    let clientIndex = -1;
    let shouldGet = true;
    logger.info('A user connected: ' + socket.request.socket.remoteAddress);

    socket.on('gName', function(){
        if (shouldGet){
            socket.join('room'+rc);
            clientRoom = 'room'+rc;
            clientIndex = currentRoom.storePlayer(new player(socket.id,names()));
            shouldGet = false;
            logger.info('A user asked for name ' +  
                        currentRoom.playerList[clientIndex].name + ' ' +
                        currentRoom.roomName);
            socket.emit('joinData', currentRoom.joinData(clientIndex));
            if (currentRoom.isFull()){
                logger.info('A room created: ' + currentRoom.roomName);
                currentRoom.setupStart();
                io.sockets.in(currentRoom.roomName).emit('startGame',currentRoom.startData());
                roomList.push(currentRoom);
                rc++;
                currentRoom = new room('room'+rc, PLAYER_NUMBER);
            }
        }
    });

    socket.on('keyPress', function(data){
        let listIndex = -1;
        for (let i = 0; i < roomList.length; i++){
            if (roomList[i].roomName === clientRoom){
                listIndex = i;
                break;
            }
        }
        if (listIndex != -1){
            if (data.inputId === 'right'){
                roomList[listIndex].playerList[clientIndex].pressingRight = data.state;
            } else if (data.inputId === 'left'){
                roomList[listIndex].playerList[clientIndex].pressingLeft = data.state;
            }
            roomList[listIndex].playerList[clientIndex].updateTarget();
        }
    });
 
    socket.on('disconnect', function(){
        if (currentRoom != -1){
            let playerIndex = currentRoom.findPlayer(socket.id);
            if (playerIndex != -1){
                logger.info('A user removed from queue ' + currentRoom.playerList[playerIndex].name);
                currentRoom.removePlayer(playerIndex);
            }
        }
        logger.info('A user disconnected');
    });
});

setInterval(function(){
    let i,winner;
    for (i = 0; i < roomList.length; i++){
        roomList[i].gameInit();
        winner = roomList[i].isWin();
        if (winner != -1){
            logger.info('A room destroyed: ' + roomList[i].roomName);
            io.sockets.in(roomList[i].roomName).emit('winner', {w: winner});
            roomList.splice(i, 1);
            i--;
        } else {
            io.sockets.in(roomList[i].roomName).emit('newState',roomList[i].gameData());
        }
    }
}, 1000/25);

http.listen(6066, function(){
    logger.info('listening on *:6066');
});