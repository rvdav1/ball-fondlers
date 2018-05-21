'use strict';

var Player = function(id,room,name,x,y){
    var self = {
        id:id,
        room:room,
        name:name,
        x:x,
        y:y,
        pressingRight:false,
        pressingLeft:false,
        pressingUp:false,
        pressingDown:false,
        maxSpd:10,
    }

    self.updatePosition = function(){
        if(self.pressingRight)
            self.x += self.maxSpd;
        if(self.pressingLeft)
            self.x -= self.maxSpd;
        if(self.pressingUp)
            self.y -= self.maxSpd;
        if(self.pressingDown)
            self.y += self.maxSpd;
    }
    return self;
}

module.exports = Player;