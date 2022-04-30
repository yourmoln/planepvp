var move1=document.getElementById("move1");
var move2=document.getElementById("move2");
var room=document.getElementById("room");
var att1=document.getElementsByClassName("att1");
var att2=document.getElementsByClassName("att2");
var size=20;//子弹大小
var win=0;
var p2=1;//p2是否可被玩家操控
var d=0;
var a=0;
var w=0;
var s=0;
var d2=0;
var a2=0;
var w2=0;
var s2=0;
function xmove(dom,px){
    dom.style.left=dom.offsetLeft+px+"px";
}
function ymove(dom,px){
    dom.style.top=dom.offsetTop+px+"px";
}
document.onkeydown = function keyDown(e){
    if (e.keyCode == 68){//d
        d=1;
    }
    if (e.keyCode == 65){//a
        a=1;
    }
    if (e.keyCode == 87){//w
        w=1;
    }
    if (e.keyCode == 83){//s
        s=1;
    }
    if (e.keyCode == 39 && p2 == 1){//d2
        d2=1;
    }
    if (e.keyCode == 37 && p2 == 1){//a2
        a2=1;
    }
    if (e.keyCode == 38 && p2 == 1){//w2
        w2=1;
    }
    if (e.keyCode == 40 && p2 == 1){//s2
        s2=1;
    }
}
document.onkeyup = function keyup(e){
    if (e.keyCode == 68){//d
        d=0;
    }
    if (e.keyCode == 65){//a
        a=0;
    }
    if (e.keyCode == 87){//w
        w=0;
    }
    if (e.keyCode == 83){//s
        s=0;
    }
    if (e.keyCode == 39 && p2 == 1){//d2
        d2=0;
    }
    if (e.keyCode == 37 && p2 == 1){//a2
        a2=0;
    }
    if (e.keyCode == 38 && p2 == 1){//w2
        w2=0;
    }
    if (e.keyCode == 40 && p2 == 1){//s2
        s2=0;
    }
}
function startmove(){
    if (d == 1 && move1.offsetLeft < window.innerWidth/3){//d
        xmove(move1,2);
    }
    if (a == 1 && move1.offsetLeft > 0){//a
        xmove(move1,-2);
    }
    if (w == 1 && move1.offsetTop > 0){//w
        ymove(move1,-2);
    }
    if (s == 1 && move1.offsetTop < window.innerHeight){//s
        ymove(move1,2);
    }
    if (d2 == 1 && move2.offsetLeft < window.innerWidth){//d2
        xmove(move2,2);inne
    }
    if (a2 == 1 && move2.offsetLeft > 2*window.innerWidth/3){//a2
        xmove(move2,-2);
    }
    if (w2 == 1 && move2.offsetTop > 0){//w2
        ymove(move2,-2);
    }
    if (s2 == 1 && move2.offsetTop < window.innerHeight){//s2
        ymove(move2,2);
    }
}
function attack(dom,att){
    if(win==0){
        room.innerHTML=room.innerHTML+"<button class="+att+" style=top:"+dom.offsetTop+"px;left:"+dom.offsetLeft+"px;>.</button>";
    }
}
function attmove(){
    for (let i = 0; i <att2.length; i++){
        if(att2[i].offsetLeft < 0){
            att2[i].remove();
        }else{
            xmove(att2[i],-2);
            if(win==0 && att2[i].offsetLeft < move1.offsetLeft + size && att2[i].offsetTop < move1.offsetTop + size && att2[i].offsetLeft > move1.offsetLeft - size && att2[i].offsetTop > move1.offsetTop - size){
                move1.remove();
                win=2;
                alert("2p win!");
                d2=0;
                a2=0;
                w2=0;
                s2=0;
            }
        }
    }
    for (let i = 0; i <att1.length; i++){
        if(att1[i].offsetLeft > window.innerWidth){
            att1[i].remove();
        }else{
            xmove(att1[i],2);
            if(win==0 && att1[i].offsetLeft < move2.offsetLeft + size && att1[i].offsetTop < move2.offsetTop + size && att1[i].offsetLeft > move2.offsetLeft - size && att1[i].offsetTop > move2.offsetTop - size){
                move2.remove();
                win=1;
                alert("1p win!");
                d=0;
                a=0;
                w=0;
                s=0;
            }
        }
    }
}
function aimove(m){
    if (a == 1 && win==0 && move2.offsetLeft < window.innerWidth){//d
        xmove(move2,2);
    }
    if (d == 1 && win==0 && move2.offsetLeft > 2*window.innerWidth/3){//a
        xmove(move2,-2);
    }
    if (move2.offsetTop > move1.offsetTop && win == 0 && move2.offsetTop > 0){//w
        ymove(move2,-2);
    }
    if (move2.offsetTop < move1.offsetTop && win == 0 && move2.offsetTop < window.innerHeight){//s
        ymove(move2,2);
    }
}
var timeout = setInterval(function () {
       startmove();
       if(p2 == 0){
        aimove(Math.floor(Math.random()*2));
       }
},10);
var am = setInterval(function () {
    attmove();
},5);
var aj = setInterval(function () {
    attack(move1,"att1");
    attack(move2,"att2");
},500);
