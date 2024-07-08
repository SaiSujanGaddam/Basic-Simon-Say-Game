// Read notes before you write this
let gameSeq=[]; // This array stores the games Sequence and stores here level wise(Initially Level-0)
let userSeq=[]; // This array stores the user Sequence and stores here as the user enters

let started = false; // This means game is'nt started yet
let level=0;
let HScore=0;
let btns=["yellow","red","purple","green"]; // Available buttons

document.addEventListener("keypress",function(event){ // now if we press any keyboard key(Not special key's like BackSpace,ctrl,...) this will be triggered
    if(started==false){
        started=true;

        levelUp();
    }
});

function gameflash(btn){
    btn.classList.add("flash"); // In style.css if class="flash then bg-color becomes white"
    setTimeout(function(){
        btn.classList.remove("flash");// Then it removes the white color backing to original color by removing class-"flash"
    },150)

}
function userflash(btn){
    btn.classList.add("userflash"); // In style.css if class="flash then bg-color becomes white"
    setTimeout(function(){
        btn.classList.remove("userflash");// Then it removes the white color backing to original color by removing class-"flash"
    },150)

}
let h2=document.querySelector("h2");
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

   // There are 2 times when btn flashes i.e, when game wants to show color and when user tries to flash it(Entering color)
   // So first game chooses random btn(color) and then passes it to the function which does the action required
   let randIdx=Math.floor(Math.random()*4); // We Select a random index in (0-3) in btns array
   let randColor=btns[randIdx];
   let randBtn=document.querySelector(`.${randColor}`); // the button which corresponds to the random color
   gameSeq.push(randColor);
   gameflash(randBtn); 
}

    function checkAns(idx){
        if(gameSeq[idx]==userSeq[idx]){
            if(idx==(gameSeq.length-1)){
                setTimeout(levelUp,500);
            }
        }else{
            h2.innerHTML=`Game Over! Your Score is <b>${level}</b> <br>Press any key on "KEY-BOARD"to Restart`;
            let body=document.querySelector("body");
            body.style.backgroundColor="red";
            setTimeout(function(){
                body.style.backgroundColor="white";
            },200)
            reset();
        }

    }
    // Now next user should enter his color
    function userPress(){
        let btn=this;
        userflash(btn);
        let userColor=btn.getAttribute("id");
        userSeq.push(userColor);
        checkAns(userSeq.length-1);
    }

    let allBtns=document.querySelectorAll(".btn");

    for(btn of allBtns){
        btn.addEventListener("click",userPress);
    }
    function   reset(){
        started=false;
        gameSeq=[];
        userSeq=[];
        level=0;
    }