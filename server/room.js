'use strict';

class Room{
    constructor(roomName, roomCapacity){
        this.roomName = roomName;
        this.roomCapacity = roomCapacity;
        this.playerList = [];
        for (let i = 0; i < this.roomCapacity; i++){
            this.playerList.push(-1);
        }
        this.isGame = false;
        this.isDelete = false;

        this.width = 500;
        this.height = 500;
    }

    numberPlayer(){
        let counter = 0;
        for (let i = 0; i < this.roomCapacity; i++){
            if (this.playerList[i] != -1){
                counter++;
            }
        }
        return counter;
    }

    isFull(){
        return this.roomCapacity === this.numberPlayer();
    }

    findPlayer(playerId){
        for (let i = 0; i < this.roomCapacity; i++){
            if (this.playerList[i] != -1){
                if (this.playerList[i].playerId === playerId){
                    return i;
                }
            }
        }
        return -1;
    }

    storePlayer(player){
        for (let i = 0; i < this.roomCapacity; i++){
            if (this.playerList[i] === -1){
                this.playerList[i] = player;
                return i;
            }
        }
        return -1;
    }

    storePlayerByIndex(playerIndex,player){
        this.playerList[playerIndex] = player;
    }

    removePlayer(playerIndex){
        this.playerList[playerIndex] = -1;
    }

    setupStart(){
        this.playerList[0].x = this.playerList[0].radius * 2;
        this.playerList[0].y = this.playerList[0].radius * 2;
        this.playerList[0].t = Math.PI;

        this.playerList[1].x = this.width - this.playerList[1].radius * 2;
        this.playerList[1].y = this.height - this.playerList[1].radius * 2;
        this.playerList[1].t = 0;

        if (this.roomCapacity > 2){
            this.playerList[2].x = this.playerList[2].radius * 2;
            this.playerList[2].y = this.height - this.playerList[2].radius * 2;
            this.playerList[2].t = Math.PI/2;      
        }
        if (this.roomCapacity > 3){
            this.playerList[3].x = this.width - this.playerList[3].radius * 2;
            this.playerList[3].y = this.playerList[3].radius * 2;
            this.playerList[3].t = Math.PI/2 * 3;        
        }
    }

    getNames(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].name)
        }
        return data;
    }

    getRadius(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].radius)
        }
        return data;
    }

    getXs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].x)
        }
        return data;
    }

    getYs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].y)
        }
        return data;
    }

    joinData(playerIndex){
        let data = {name: this.playerList[playerIndex].name,
                width: this.width,
                height: this.height};
        return data;
    }

    startData(){
        let data = {player: this.roomCapacity,
                name: this.getNames(),
                radius: this.getRadius(),
                x: this.getXs(),
                y: this.getYs()};
        return data;
    }

    gameData(){
        let data = {x: this.getXs(),
                    y: this.getYs()};
        return data;
    }

    gameInit(){
        for (let i = 0; i < this.roomCapacity; i++){
            if (this.playerList[i].x - this.playerList[i].radius <= 0){
                this.playerList[i].x += this.playerList[i].radius/2;
                this.playerList[i].t += Math.PI/2;
            } else if (this.playerList[i].x + this.playerList[i].radius >= this.width){
                this.playerList[i].x -= this.playerList[i].radius/2;
                this.playerList[i].t += Math.PI/2;
            }
            if (this.playerList[i].y - this.playerList[i].radius <= 0){
                this.playerList[i].y += this.playerList[i].radius/2;
                this.playerList[i].t += Math.PI/2;
            } else if (this.playerList[i].y + this.playerList[i].radius >= this.height){
                this.playerList[i].y -= this.playerList[i].radius/2;
                this.playerList[i].t += Math.PI/2;
            } 
            this.playerList[i].setMovement(this.width, this.height);
            this.playerList[i].updatePosition();
        }
    }
}

module.exports = Room;