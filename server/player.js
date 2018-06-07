'use strict';

class Player{
    constructor(id, name){
        this.id = id;
        this.name = name;

        this.x = 0;
        this.y = 0;
        this.radius = 20;

        this.pressingRight = false;
        this.pressingLeft = false;

        this.targetPointX = 0;
        this.targetPointY = 0;

        this.velX = 0;
        this.velY = 0;

        this.t = 25;

        this.points = 0;

        this.areaSize = 500;

        this.gameId = -1;
        this.lastBounce = -1;
    }

    setMovement(){
        let dx = this.targetPointX - this.x;
        let dy = this.targetPointY - this.y;

        let dist = Math.sqrt(dx*dx+dy*dy);
        let rad = Math.atan2(dy,dx);

        let mag = 7;
        this.velX = (dx/dist) * mag;
        this.velY = (dy/dist) * mag;
    }

    setBounce(isX, side){
        let tempVelX = this.velX,
            tempVelY = this.velY,
            tempTargetX = this.x,
            tempTargetY = this.y,
            runner = true;

        if (isX){
            tempVelX = this.velX * -1;
        } else {
            tempVelY = this.velY * -1;
        }

        while (runner){
            if (tempTargetX <= this.areaSize/-2 && side != 10){
                this.targetPointX = this.areaSize/-2;
                this.targetPointY = ~~(tempTargetY);
                runner = false;
            } else if (tempTargetX >= this.areaSize/2 && side != 11){
                this.targetPointX = this.areaSize/2;
                this.targetPointY = ~~(tempTargetY);
                runner = false;
            }  else  if (tempTargetY <= this.areaSize/-2 && side != 12){
                this.targetPointY = this.areaSize/-2;
                this.targetPointX = ~~(tempTargetX);
                runner = false;
            } else if (tempTargetY >= this.areaSize/2 && side != 13){
                this.targetPointY = this.areaSize/2;
                this.targetPointX = ~~(tempTargetX);
                runner = false;
            }
            tempTargetX += tempVelX;
            tempTargetY += tempVelY;
        }
        this.fixTargets();
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setArea(areaSize){
        this.areaSize = areaSize;
    }

    updateTarget(){
        if(this.pressingLeft){
            if(this.targetPointX === this.areaSize/-2){
                if (this.targetPointY < this.areaSize/2){
                    this.targetPointY += this.t;
                } else {
                    this.targetPointX += this.t;
                    this.targetPointY = this.areaSize/2;
                }
            } else if (this.targetPointX < this.areaSize/2){
                if (this.targetPointY === this.areaSize/2){
                    this.targetPointX += this.t;
                } else {
                    this.targetPointX -= this.t;
                    this.targetPointY = this.areaSize/-2;
                }
            } else {
                if (this.targetPointY > this.areaSize/-2){
                    this.targetPointY -= this.t;
                } else {
                    this.targetPointX -= this.t;
                    this.targetPointY = this.areaSize/-2;
                }
            }
            this.lastBounce = -1;
        }
        if(this.pressingRight){
            if(this.targetPointX === this.areaSize/-2){
                if (this.targetPointY > this.areaSize/-2){
                    this.targetPointY -= this.t;
                } else {
                    this.targetPointX += this.t;
                    this.targetPointY = this.areaSize/-2;
                }
            } else if (this.targetPointX < this.areaSize/2){
                if (this.targetPointY === this.areaSize/2){
                    this.targetPointX -= this.t;
                } else {
                    this.targetPointX += this.t;
                    this.targetPointY = this.areaSize/-2;
                }
            } else {
                if (this.targetPointY < this.areaSize/2){
                    this.targetPointY += this.t;
                } else {
                    this.targetPointX -= this.t;
                    this.targetPointY = this.areaSize/2;
                }
            }
            this.lastBounce = -1;
        }
        this.fixTargets();           
    }

    fixTargets(){
        if (this.targetPointX > this.areaSize/2){
            this.targetPointX = this.areaSize/2;
        } else if (this.targetPointX < this.areaSize/-2){
            this.targetPointX = this.areaSize/2;
        }
        if (this.targetPointY > this.areaSize/2){
            this.targetPointY = this.areaSize/2;
        } else if (this.targetPointY < this.areaSize/-2){
            this.targetPointY = this.areaSize/2;
        } 
    }

    updatePosition(){
        this.x += this.velX;
        this.y += this.velY;
        if (this.x - this.radius < this.areaSize/-2){
            this.x = this.areaSize/-2 + this.radius;
        } else if (this.x + this.radius > this.areaSize/2){
            this.x = this.areaSize/2 - this.radius;
        }
        if (this.y - this.radius < this.areaSize/-2){
            this.y = this.areaSize/-2 + this.radius;
        } else if (this.y + this.radius > this.areaSize/2){
            this.y = this.areaSize/2 - this.radius;
        }
    }

    addPoint(){
        this.points += 1;
    }
}

module.exports = Player;