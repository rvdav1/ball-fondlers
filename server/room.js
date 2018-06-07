'use strict';

var ball = require('./ball');

class Room{
    constructor(roomName, roomCapacity, areaSize){
        this.roomName = roomName;
        this.roomCapacity = roomCapacity;

        this.areaSize = areaSize;

        this.playerList = [];
        this.ballList = [];
        this.ballPos = [{x: 0, y: 0}, 
                        {x: -10, y: 0},
                        {x: 10, y: 0}];
        this.goalList = [];
        for (let i = 0; i < this.roomCapacity; i++){
            this.playerList.push(-1);
        }

        this.winPoints = 3 * (this.roomCapacity - 1);
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
                if (this.playerList[i].id === playerId){
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
                this.playerList[i].setArea(this.areaSize);
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
        this.playerList[0].x = this.areaSize/-2 + this.playerList[0].radius * 2;
        this.playerList[0].y = this.areaSize/-2 + this.playerList[0].radius * 2;
        this.playerList[0].targetPointX = this.areaSize/2;
        this.playerList[0].targetPointY = this.areaSize/2;
        this.playerList[0].gameId = 0;
        this.goalList.push({sX: this.areaSize/-2, 
                            sY: -40, 
                            eX: this.areaSize/-2, 
                            eY: 40});

        this.playerList[1].x = this.areaSize/2 - this.playerList[1].radius * 2;
        this.playerList[1].y = this.areaSize/2 - this.playerList[1].radius * 2;
        this.playerList[1].targetPointX = this.areaSize/-2;
        this.playerList[1].targetPointY = this.areaSize/-2;
        this.playerList[1].gameId = 1;
        this.goalList.push({sX: this.areaSize/2, 
                            sY: -40, 
                            eX: this.areaSize/2, 
                            eY: 40});
        this.ballList.push(new ball(this.ballPos[0].x, this.ballPos[0].y, this.areaSize));

        if (this.roomCapacity > 2){
            this.playerList[2].x = this.areaSize/-2 + this.playerList[2].radius * 2;
            this.playerList[2].y = this.areaSize/2 - this.playerList[2].radius * 2;
            this.playerList[2].targetPointX = this.areaSize/2;
            this.playerList[2].targetPointY = this.areaSize/-2;
            this.playerList[2].gameId = 2;
            this.goalList.push({sX: -40, 
                                sY: this.areaSize/2, 
                                eX: 40, 
                                eY: this.areaSize/2});
            this.ballList.push(new ball(this.ballPos[1].x, this.ballPos[1].y, this.areaSize));      
        }
        if (this.roomCapacity > 3){
            this.playerList[3].x = this.areaSize/2 - this.playerList[3].radius * 2;
            this.playerList[3].y = this.areaSize/-2 + this.playerList[3].radius * 2;
            this.playerList[3].targetPointX = this.areaSize/-2;
            this.playerList[3].targetPointY = this.areaSize/2;
            this.playerList[3].gameId = 3;
            this.goalList.push({sX: -40, 
                                sY: this.areaSize/-2, 
                                eX: 40, 
                                eY: this.areaSize/-2});
            this.ballList.push(new ball(this.ballPos[2].x, this.ballPos[2].y, this.areaSize));       
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
            data.push(this.playerList[i].x + this.areaSize/2);
        }
        return data;
    }

    getYs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push(this.playerList[i].y + this.areaSize/2);
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
            data.push(this.ballList[i].x + this.areaSize/2);
        }
        return data;
    }

    getBallYs(){
        let data = [];
        for (let i = 0; i < this.roomCapacity - 1; i++){
            data.push(this.ballList[i].y + this.areaSize/2);
        }
        return data;
    }

    getGoalList(){
        let data = [];
        for (let i = 0; i < this.roomCapacity; i++){
            data.push({ sX: this.goalList[i].sX + this.areaSize/2,
                        sY: this.goalList[i].sY + this.areaSize/2,
                        eX: this.goalList[i].eX + this.areaSize/2,
                        eY: this.goalList[i].eY + this.areaSize/2});
        }
        return data;
    }

    joinData(playerIndex){
        let data = {name: this.playerList[playerIndex].name,
                width: this.areaSize,
                height: this.areaSize};
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
                g: this.getGoalList()};
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

    //I just found it on the net and its working!
    pDistance(x, y, x1, y1, x2, y2) {
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;
      
        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq != 0) //in case of 0 length line
            param = dot / len_sq;
      
        var xx, yy;
      
        if (param < 0) {
          xx = x1;
          yy = y1;
        } else if (param > 1) {
          xx = x2;
          yy = y2;
        } else {
          xx = x1 + param * C;
          yy = y1 + param * D;
        }
      
        var dx = x - xx;
        var dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isWin(){
        for (let i = 0; i < this.roomCapacity; i++){
            if (this.playerList[i].points >= this.winPoints){
                return i;
            }
        }
        return -1;
    }

    gameInit(){
        let i,j,inter,rad1,rad2;
        for (i = 0; i < this.roomCapacity; i++){
            if (this.playerList[i].x - this.playerList[i].radius <= this.areaSize/-2 && 
            this.playerList[i].lastBounce != 10){
                this.playerList[i].lastBounce = 10;
                this.playerList[i].setBounce(true,10);
                this.playerList[i].x += this.playerList[i].radius/2;
            } else if (this.playerList[i].x + this.playerList[i].radius >= this.areaSize/2 && 
            this.playerList[i].lastBounce != 11){
                this.playerList[i].lastBounce = 11;
                this.playerList[i].setBounce(true,11);        
                this.playerList[i].x -= this.playerList[i].radius/2;
            }
            if (this.playerList[i].y - this.playerList[i].radius <= this.areaSize/-2 && 
            this.playerList[i].lastBounce != 12){
                this.playerList[i].lastBounce = 12;
                this.playerList[i].setBounce(false,12);
                this.playerList[i].y += this.playerList[i].radius/2;
            } else if (this.playerList[i].y + this.playerList[i].radius >= this.areaSize/2 && 
            this.playerList[i].lastBounce != 13){
                this.playerList[i].lastBounce = 13;
                this.playerList[i].setBounce(false,13);
                this.playerList[i].y -= this.playerList[i].radius/2;
            }

            for (j = i+1; j < this.roomCapacity; j++){
                inter = (Math.pow(this.playerList[j].x - this.playerList[i].x, 2) + 
                        Math.pow(this.playerList[j].y - this.playerList[i].y, 2));
                rad1 = Math.pow(this.playerList[j].radius - this.playerList[i].radius, 2);
                rad2 = Math.pow(this.playerList[j].radius + this.playerList[i].radius, 2);
                if (rad1 <= inter && rad2 >= inter){
                    this.playerList[i].targetPointX *= -1;
                    this.playerList[i].targetPointY *= -1;
                    this.playerList[i].lastBounce = this.playerList[j].gameId;
                    this.playerList[j].targetPointX *= -1;
                    this.playerList[j].targetPointY *= -1;
                    this.playerList[j].lastBounce = this.playerList[i].gameId;
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
                    this.ballList[j].setTarget( this.playerList[i].targetPointX, 
                                                this.playerList[i].targetPointY,
                                                10);
                    this.ballList[j].lastBounce = this.playerList[i].gameId;
                }
                this.ballList[j].setMovement();
            }

            this.playerList[i].setMovement();
            this.playerList[i].updatePosition();
        }
        for (j = 0; j < this.roomCapacity - 1; j++){
            for (i = 0; i < this.roomCapacity; i++){
                inter = this.pDistance(this.ballList[j].x, 
                                        this.ballList[j].y, 
                                        this.goalList[i].sX,
                                        this.goalList[i].sY,
                                        this.goalList[i].eX,
                                        this.goalList[i].eY);
                if (inter <= this.ballList[j].radius){
                    this.playerList[i].addPoint();
                    this.ballList[j].setPosition(this.ballPos[j].x, this.ballPos[j].y);
                    this.ballList[j].setTarget(0,0,0);
                }
            }
            
            if (this.ballList[j].x - this.ballList[j].radius <= this.areaSize/-2 &&
            this.ballList[j].lastBounce != 10){
                this.ballList[j].setBounce(true,10);
                this.ballList[j].lastBounce = 10;
                this.ballList[j].x += this.ballList[j].radius;
            } else if (this.ballList[j].x + this.ballList[j].radius >= this.areaSize/2 &&
            this.ballList[j].lastBounce != 11){
                this.ballList[j].setBounce(true,11);
                this.ballList[j].lastBounce = 11;
                this.ballList[j].x -= this.ballList[j].radius;
            }
            if (this.ballList[j].y - this.ballList[j].radius <= this.areaSize/-2 &&
                this.ballList[j].lastBounce != 12){
                    this.ballList[j].setBounce(false,12);
                    this.ballList[j].lastBounce = 12;
                    this.ballList[j].y += this.ballList[j].radius;
            } else if (this.ballList[j].y + this.ballList[j].radius >= this.areaSize/2 &&
                this.ballList[j].lastBounce != 13){
                    this.ballList[j].setBounce(false,13);
                    this.ballList[j].lastBounce = 13;
                    this.ballList[j].y -= this.ballList[j].radius;
            }
            this.ballList[j].setMovement();
            this.ballList[j].updatePosition();
        }
    }
}

module.exports = Room;