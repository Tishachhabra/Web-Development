const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"        //Currency exchange Base URL API
const selects=document.querySelectorAll("select");
const btn=document.querySelector("button");
const res=document.querySelector("p");
for(let select of selects)                      //populating select options
{
    for(let currencyCode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.value=currencyCode;
        newOption.innerText=currencyCode;
        if(select.name==="from" && currencyCode==="INR")
            newOption.selected=true;
        if(select.name==="to" && currencyCode==="USD")
            newOption.selected=true;
        select.append(newOption);
    }
}

const updateFlag=(evnt)=>{                      
    const currencyCode=evnt.target.value;
    const country=countryList[currencyCode];
    const flag=evnt.target.parentNode.children[2];
    flag.src=`https://flagsapi.com/${country}/flat/64.png`;
}
const updateResult=async (event)=>{             
    event.preventDefault();                         //Preventing default refresh mechanism of a button on clicking
    const input=document.querySelector("input");
    const amt=input.value;
    const from=selects[0].value;
    const to=selects[1].value;
    const url=`${BASE_URL}/${from.toLowerCase()}.json`;     
    const response=await fetch(url);                        
    const result=await response.json();         
    const rate=result[from.toLowerCase()][to.toLowerCase()];        
    res.innerText=`${amt} ${from} = ${amt*rate} ${to}`;            
    showAnimation();
}

selects[0].addEventListener("change",updateFlag);
selects[1].addEventListener("change",updateFlag);
btn.addEventListener("click",updateResult);

const showAnimation=()=>{                               //Show fading Dollar Signs in result container
    const container = document.querySelector("p");
    const rect = container.getBoundingClientRect();
    const numSigns = 20;
    for (let i = 0; i < numSigns; i++) {
        const dollarSign = document.createElement('div');
        dollarSign.textContent = '$';
        dollarSign.className = 'dollar-sign';
        
        // Randomize position and delay
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const delay = Math.random() * 0.5;
        
        dollarSign.style.left = `${x}px`;
        dollarSign.style.top = `${y}px`;
        dollarSign.style.animationDelay = `${delay}s`;
        container.appendChild(dollarSign);
        
        // Remove the dollar sign after animation
        dollarSign.addEventListener('animationend', () => {
          dollarSign.remove();
        });
    }
}
