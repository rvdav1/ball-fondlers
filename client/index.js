var Player = function(id,name,x,y){
    var self = {
        id:id,
        name:name,
        x:x,
        y:y
    }

    self.updatePosition = function(x,y){
        self.x = x;
        self.y = y;
    }
    return self;
}

var player1,player2,player3,player4;

var socket = io();
var isGame = false;

function getName(){
    socket.emit('gName');
};

socket.on('joinData', function(data){
    document.getElementById("mainName").innerHTML = "From now on, your name shall be:";
    document.getElementById("playerName").innerHTML = data.name;
    document.getElementById("playerName").style.display = "inline";
    document.getElementById("mainButton").style.display = "none";
    document.getElementById("mainCanvas").style.display = "inline";
});

socket.on('startGame',function(data){
    isGame = true;
    player1 = Player(1,data.name1,data.x1,data.y1);
    player2 = Player(2,data.name2,data.x2,data.y2);
    player3 = Player(3,data.name3,data.x3,data.y3);
    player4 = Player(4,data.name4,data.x4,data.y4);
});
   
socket.on('newState',function(data){
    var ctx = document.getElementById("mainCanvas").getContext("2d");
    ctx.font = '20px Arial';
    
    for(var i = 0 ; i < data.length; i++)
        ctx.fillText(data[i].number,data[i].x,data[i].y);      
});

document.onkeydown = function(event){
    if (isGame){
        if(event.keyCode === 68)    //d
            socket.emit('keyPress',{inputId:'right',state:true});
        else if(event.keyCode === 83)   //s
            socket.emit('keyPress',{inputId:'down',state:true});
        else if(event.keyCode === 65) //a
            socket.emit('keyPress',{inputId:'left',state:true});
        else if(event.keyCode === 87) // w
            socket.emit('keyPress',{inputId:'up',state:true});
    }      
}
document.onkeyup = function(event){
    if (isGame){
        if(event.keyCode === 68)    //d
            socket.emit('keyPress',{inputId:'right',state:false});
        else if(event.keyCode === 83)   //s
            socket.emit('keyPress',{inputId:'down',state:false});
        else if(event.keyCode === 65) //a
            socket.emit('keyPress',{inputId:'left',state:false});
        else if(event.keyCode === 87) // w
            socket.emit('keyPress',{inputId:'up',state:false});
    }   
}