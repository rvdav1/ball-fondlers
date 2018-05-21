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

        this.t = 0.01;
    }

    setMovement(width, height){
        if (this.t >= Math.PI*2){
            this.t = this.t % (Math.PI*2);
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

        let mag = 5;
        this.velX = (dx/dist) * mag;
        this.velY = (dy/dist) * mag;
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    updateTarget(){
        if(this.pressingRight)
            this.t += 0.1;
        if(this.pressingLeft)
            this.t -= 0.1;       
    }

    updatePosition(){
        this.x += this.velX;
        this.y += this.velY;
    }
}

module.exports = Player;