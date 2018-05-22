var Player = function(id,name,radius,x,y,sX,sY,eX,eY){
    var self = {
        id:id,
        name:name,
        radius:radius,
        x:x,
        y:y,
        textX:x-radius*2,
        testY:y-radius,
        sX:sX,
        sY:sY,
        eX:eX,
        eY:eY,
        points: 0
    }

    self.updatePosition = function(x,y, points){
        self.x = x;
        self.y = y;
        self.textX = x - radius * 2;
        self.testY = y - radius;
        self.points = points;
    }
    return self;
}

var Ball = function(id,x,y){
    var self = {
        id:id,
        radius:5,
        x:x,
        y:y
    }

    self.updatePosition = function(x,y){
        self.x = x;
        self.y = y;
    }
    return self;
}

var playerCount = 0;
var players = [];
var balls = [];

var socket = io();
var isGame = false;

var ctx;
var canvasWidth = 500;
var canvasHeight = 500;

var playerColors = ["red", "green", "blue", "orange"]

function getName(){
    socket.emit('gName');
};

socket.on('joinData', function(data){
    document.getElementById("mainName").innerHTML = "From now on, your name shall be:";

    document.getElementById("playerName").innerHTML = data.name;
    document.getElementById("playerName").style.display = "inline";

    document.getElementById("mainButton").style.display = "none";
    
    canvasWidth = data.width;
    canvasHeight = data.height;

    document.getElementById("mainCanvas").style.display = "inline";
    document.getElementById("mainCanvas").width = canvasWidth;
    document.getElementById("mainCanvas").height = canvasHeight;

    ctx = document.getElementById("mainCanvas").getContext("2d");
    ctx.font = '12px Arial';
});

function drawIt(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    let i;

    for (i = 0; i < players.length; i++){
        ctx.beginPath();
        ctx.arc(players[i].x, players[i].y, players[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = playerColors[i];
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fillText(players[i].name, players[i].textX, players[i].testY);
    }

    for (i = 0; i < balls.length; i++){
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#404040";
        ctx.stroke();
    }

    for (i = 0; i < players.length; i++){
        ctx.beginPath();
        ctx.moveTo(players[i].sX, players[i].sY);
        ctx.lineTo(players[i].eX, players[i].eY);
        ctx.lineWidth = 5;
        ctx.strokeStyle = playerColors[i];
        ctx.stroke();
    }
}

socket.on('startGame',function(data){
    playerCount = data.player;
    isGame = true;
    let i, textName;
    for (i = 0; i < playerCount; i++){
        players.push(Player(i, 
                            data.name[i], 
                            data.radius[i],
                            data.x[i], 
                            data.y[i],
                            data.g[i].sX,
                            data.g[i].sY,
                            data.g[i].eX,
                            data.g[i].eY));
        textName = "player" + (i + 1).toString();
        document.getElementById(textName).innerHTML = players[i].name + ": " + players[i].points;
        document.getElementById(textName).style.display = "inline";
    }

    for (i = 0; i < playerCount - 1; i++){
        balls.push(Ball(i,data.bX[i],data.bY[i]));
    }
});
   
socket.on('newState',function(data){
    let i, textName;
    for (i = 0; i < players.length; i++){
        players[i].updatePosition(data.x[i], data.y[i], data.p[i]);
        textName = "player" + (i + 1).toString();
        document.getElementById(textName).innerHTML = players[i].name + ": " + players[i].points;
    }

    for (i = 0; i < balls.length; i++){
        balls[i].updatePosition(data.bX[i], data.bY[i]);
    }
});

setInterval(function(){
    if (isGame){
        drawIt()
    }
}, 20);

document.onkeydown = function(event){
    if (isGame){
        if(event.keyCode === 68)    //d
            socket.emit('keyPress',{inputId:'right',state:true});
        else if(event.keyCode === 65) //a
            socket.emit('keyPress',{inputId:'left',state:true});
    }      
}
document.onkeyup = function(event){
    if (isGame){
        if(event.keyCode === 68)    //d
            socket.emit('keyPress',{inputId:'right',state:false});
        else if(event.keyCode === 65) //a
            socket.emit('keyPress',{inputId:'left',state:false});
    }   
}