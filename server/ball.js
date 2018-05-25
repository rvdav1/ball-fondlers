'use strict';

class Ball{
    constructor(x, y, t){
        this.x = x;
        this.y = y;
        this.radius = 5;

        this.targetPointX = 0;
        this.targetPointY = 0;

        this.velX = 0;
        this.velY = 0;

        this.t = t;
    }

    setMovement(width, height){
        if (this.t >= Math.PI*2){
            this.t -= Math.PI*2;
        } else if (this.t <= Math.PI*-2){
            this.t += Math.PI*2;
        }
        let midX = ~~(width/2);
        let midY = ~~(height/2);

        let radius = width / Math.sqrt(2);

        this.targetPointX = radius * Math.cos(this.t) + midX;
        this.targetPointY = radius * Math.sin(this.t) + midY;

        let dx = this.targetPointX - this.x;
        let dy = this.targetPointY - this.y;

        let dist = Math.sqrt(dx*dx+dy*dy);
        let rad = Math.atan2(dy,dx);

        let angle = rad/Math.PI * 180;

        let mag = 10;
        this.velX = (dx/dist) * mag;
        this.velY = (dy/dist) * mag;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setT(t){
        this.t = t;
    }

    updatePosition(){
        this.x += this.velX;
        this.y += this.velY;
    }
}

module.exports = Ball;