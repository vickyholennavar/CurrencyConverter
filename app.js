const baseUrl="https://latest.currency-api.pages.dev/v1/currencies";
const dropDowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropDowns)
{
  for(currCode in countryList)
  {
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    if(select.name=="from" && currCode=="USD")
    {
        newOption.selected="selected";
    }
    else if(select.name=="to" && currCode=="INR")
    {
        newOption.selected="selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(eve)=>{
    updateFlag(eve.target);

  });
}

const updateFlag=(element)=>
{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click",async (eve)=>{
    eve.preventDefault();
    let amount=document.querySelector(".ammount input");
    let amtval=amount.value;
    if(amtval==="" || amtval <=0)
    {
        alert("Enter amount can not be null,zero and negative value");
    }
    //console.log(fromCurr.value.toLowerCase());
    //console.log(toCurr.value);
const URL =await fetch(`${baseUrl}/${fromCurr.value.toLowerCase()}.json`);
let data =await URL.json();
let finalAmount=amtval*data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
msg.innerText=`${amtval} ${fromCurr.value} =${finalAmount} ${toCurr.value}`;
    //console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
});