'use strict';

var ball = require('./ball');

class Room{
    constructor(roomName, roomCapacity){
        this.roomName = roomName;
        this.roomCapacity = roomCapacity;

        this.width = 500;
        this.height = 500;

        this.playerList = [];
        this.ballList = [];
        this.ballPos = [{x: this.width/2, y: this.height/2}, 
                        {x: this.width/2 - 10, y: this.height/2},
                        {x: this.width/2 + 10, y: this.height/2}];
        this.goalList = [];
        for (let i = 0; i < this.roomCapacity; i++){
            this.playerList.push(-1);
        }
        this.isGame = false;
        this.isDelete = false;
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
        this.goalList.push({sX: 0, 
                            sY: this.height/2 - 40, 
                            eX: 0, 
                            eY: this.height/2 + 40});

        this.playerList[1].x = this.width - this.playerList[1].radius * 2;
        this.playerList[1].y = this.height - this.playerList[1].radius * 2;
        this.playerList[1].t = 0;
        this.goalList.push({sX: this.width, 
                            sY: this.height/2 - 40, 
                            eX: this.width, 
                            eY: this.height/2 + 40});
        this.ballList.push(new ball(this.ballPos[0].x, this.ballPos[0].y, Math.random() * Math.PI * 2));

        if (this.roomCapacity > 2){
            this.playerList[2].x = this.playerList[2].radius * 2;
            this.playerList[2].y = this.height - this.playerList[2].radius * 2;
            this.playerList[2].t = Math.PI/2;
            this.goalList.push({sX: this.width/2 - 40, 
                                sY: this.height, 
                                eX: this.width/2 + 40, 
                                eY: this.height});
            this.ballList.push(new ball(this.ballPos[1].x, this.ballPos[1].y, Math.random() * Math.PI * 2));      
        }
        if (this.roomCapacity > 3){
            this.playerList[3].x = this.width - this.playerList[3].radius * 2;
            this.playerList[3].y = this.playerList[3].radius * 2;
            this.playerList[3].t = Math.PI/2 * 3;
            this.goalList.push({sX: this.width/2 - 40, 
                                sY: 0, 
                                eX: this.width/2 + 40, 
                                eY: 0});
            this.ballList.push(new ball(this.ballPos[2].x, this.ballPos[2].y, Math.random() * Math.PI * 2));       
        }
    }

    getNames(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].name);
        }
        return data;
    }

    getRadius(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].radius);
        }
        return data;
    }

    getXs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].x);
        }
        return data;
    }

    getYs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].y);
        }
        return data;
    }

    getPoints(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].points);
        }
        return data;
    }

    getBallXs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity - 1; i++){
            data.push(this.ballList[i].x);
        }
        return data;
    }

    getBallYs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity - 1; i++){
            data.push(this.ballList[i].y);
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
                y: this.getYs(),
                bX: this.getBallXs(),
                bY: this.getBallYs(),
                g: this.goalList};
        return data;
    }

    gameData(){
        let data = {x: this.getXs(),
                    y: this.getYs(),
                    bX: this.getBallXs(),
                    bY: this.getBallYs(),
                    p: this.getPoints()};
        return data;
    }

    gameInit(){
        let i,j,inter,rad1,rad2;
        for (i = 0; i < this.roomCapacity; i++){
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

            for (j = i+1; j < this.roomCapacity; j++){
                inter = (Math.pow(this.playerList[j].x - this.playerList[i].x, 2) + 
                        Math.pow(this.playerList[j].y - this.playerList[i].y, 2));
                rad1 = Math.pow(this.playerList[j].radius - this.playerList[i].radius, 2);
                rad2 = Math.pow(this.playerList[j].radius + this.playerList[i].radius, 2);
                if (rad1 <= inter && rad2 >= inter){
                    this.playerList[i].t += Math.PI/2;
                    this.playerList[j].t += Math.PI/2;
                    if (this.playerList[i].x > this.playerList[j].x){
                        this.playerList[i].x += this.playerList[i].radius/2;
                        this.playerList[j].x -= this.playerList[j].radius/2;
                    } else {
                        this.playerList[j].x += this.playerList[j].radius/2;
                        this.playerList[i].x -= this.playerList[i].radius/2;
                    }
                    if (this.playerList[i].y > this.playerList[j].y){
                        this.playerList[i].y += this.playerList[i].radius/2;
                        this.playerList[j].y -= this.playerList[j].radius/2;
                    } else {
                        this.playerList[j].y += this.playerList[j].radius/2;
                        this.playerList[i].y -= this.playerList[i].radius/2;
                    }
                }
            }

            for (j = 0; j < this.roomCapacity - 1; j++){
                inter = (Math.pow(this.ballList[j].x - this.playerList[i].x, 2) + 
                        Math.pow(this.ballList[j].y - this.playerList[i].y, 2));
                rad1 = Math.pow(this.ballList[j].radius - this.playerList[i].radius, 2);
                rad2 = Math.pow(this.ballList[j].radius + this.playerList[i].radius, 2);
                if (rad1 <= inter && rad2 >= inter){
                    this.ballList[j].t = this.playerList[i].t;
                }
                this.ballList[j].setMovement(this.width, this.height);
                this.ballList[j].updatePosition();
            }

            this.playerList[i].setMovement(this.width, this.height);
            this.playerList[i].updatePosition();
        }

        for (j = 0; j < this.roomCapacity - 1; j++){
            for (i = 0; i < this.roomCapacity; i++){
                inter = (Math.abs((this.goalList[i].eX - this.goalList[i].sX) * this.ballList[j].x +
                        (this.goalList[i].sY - this.goalList[i].eY) * this.ballList[j].y +
                        (this.goalList[i].sX - this.goalList[i].eX) * this.goalList[i].sY +
                        (this.goalList[i].eY - this.goalList[i].sY) * this.goalList[i].sX) /
                        Math.sqrt(Math.pow(this.goalList[i].eX - this.goalList[i].sX, 2) +
                        Math.pow(this.goalList[i].sY - this.goalList[i].eY, 2)));
                if (inter <= this.ballList[j].radius){
                    this.playerList[i].addPoint();
                    this.ballList[j].setPosition(this.ballPos[j].x, this.ballPos[j].y);
                    this.ballList[j].setT(Math.random() * Math.PI * 2);
                }
            }
            
            if (this.ballList[j].x - this.ballList[j].radius <= 0){
                this.ballList[j].x += this.ballList[j].radius/2;
                this.ballList[j].t += Math.PI/2;
            } else if (this.ballList[j].x + this.ballList[j].radius >= this.width){
                this.ballList[j].x -= this.ballList[j].radius/2;
                this.ballList[j].t += Math.PI/2;
            }
            if (this.ballList[j].y - this.ballList[j].radius <= 0){
                this.ballList[j].y += this.ballList[j].radius/2;
                this.ballList[j].t += Math.PI/2;
            } else if (this.ballList[j].y + this.ballList[j].radius >= this.height){
                this.ballList[j].y -= this.ballList[j].radius/2;
                this.ballList[j].t += Math.PI/2;
            }
            this.ballList[j].setMovement(this.width, this.height);
            this.ballList[j].updatePosition();
        }
    }
}

module.exports = Room;