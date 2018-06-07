'use strict';

class Ball{
    constructor(x, y, areaSize){
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.mag = 0;

        this.targetPointX = 0;
        this.targetPointY = 0;

        this.velX = 0;
        this.velY = 0;

        this.t = 0.05;

        this.areaSize = areaSize;

        this.lastBounce = -1;
    }

    setMovement(){
        let dx = this.targetPointX - this.x;
        let dy = this.targetPointY - this.y;

        let dist = Math.sqrt(dx*dx+dy*dy);
        let rad = Math.atan2(dy,dx);

        if (dist === 0){
            this.velX = 0;
            this.velY = 0;
            this.realVelX = 0;
            this.realVelY = 0;
        } else {
            this.velX = (dx/dist) * this.mag;
            this.velY = (dy/dist) * this.mag;
            this.realVelX = (dx/dist) * 7;
            this.realVelY = (dy/dist) * 7;
        }
    }

    setBounce(isX, side){
        let tempVelX = this.velX,
            tempVelY = this.velY,
            tempTargetX = this.x,
            tempTargetY = this.y,
            runner = true;

        if (isX){
            if (this.velX === 0){
                tempVelX = this.velX * -1;
            } else {
                tempVelX = this.realVelX * -1;
            }     
        } else {
            if(this.velY === 0){
                tempVelY = this.velY * -1;
            } else {
                tempVelY = this.realVelY * -1;
            }
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

    setArea(areaSize){
        this.areaSize = areaSize;
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

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setTarget(targetPointX, targetPointY, mag){
        this.targetPointX = targetPointX;
        this.targetPointY = targetPointY;
        this.mag = mag;
    }

    updatePosition(){
        this.x += this.velX;
        this.y += this.velY;
        if (this.mag > 0){
            this.mag -= this.t;
        }
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
}

module.exports = Ball;