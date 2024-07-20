let turnO=true;
let winner="";
let boxes=document.querySelectorAll(".box");
let win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let player=document.querySelector(".turn span");
player.innerText="1";

const checkwinner=()=>{
    for(let pattern of win)
    {
        if(boxes[pattern[0]].innerText!="" && boxes[pattern[0]].innerText!="" && boxes[pattern[0]].innerText!="")
        if(boxes[pattern[0]].innerText === boxes[pattern[1]].innerText && boxes[pattern[1]].innerText === boxes[pattern[2]].innerText)
        {
            boxes[pattern[0]].style.backgroundColor="yellow";
            boxes[pattern[1]].style.backgroundColor="yellow";
            boxes[pattern[2]].style.backgroundColor="yellow";
            if(turnO)
                winner="X";
            else
                winner="O";
            console.log("Winner is "+winner);
        }
    }
}
const checkfull=()=>{
    for(let box of boxes)
    {
        if(box.innerText==="")
            return;
    }
    alert("Grid is Full ! , Click 'Reset' to restart!")
}
const flip=(ev)=>{
    let box=ev.target;
    box.classList.add("flipped");
    setTimeout(() => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            player.innerText="2";
        } else {
            box.innerText = "X";
            turnO = true;
            player.innerText="1";
        }
        box.classList.remove("flipped");
        box.removeEventListener("click", flip);
        box.classList.add("disable");
        checkwinner();
        if(winner==="")
        checkfull();
    }, 320);
    
}
for(let box of boxes)
{
    box.addEventListener("click",flip);
}

let btn=document.querySelector(".reset");
btn.onclick=()=>{
    boxes.forEach((box)=>{
        box.innerText="";
        box.classList.remove("disable");
        box.addEventListener("click",flip);
        box.style.backgroundColor="white";
    });
    turnO=true;
    player.innerText="1";
}
