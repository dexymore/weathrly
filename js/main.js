
import WEATHER_API_KEY from './test.js';


let myinput=document.querySelectorAll(".myinput")

let Gettcurrent=async function (region="cairo"){
let curr={
    humidity:"",
    dir:"",
   temps:"",
   windspeed:"",
   img:"",
locate:"",
textdisc:'',
}
//replace the ${process.env.} with your free api key
    let data=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4f66a8102f1c480eaef23857232507&q=${region}&days=7`)

    let info= await data.json()

console.log(info)
    curr.humidity=await info.current.humidity
curr.dir=await info.current.wind_dir
curr.temps=await info.current.temp_c
curr.windspeed= await info.current.wind_kph
curr.img=await info.current.condition.icon
curr.locate=await info.location.name
curr.textdisc=await info.current.condition.text

console.log(curr)
return curr;
}

///////////////////////////////////////////////////////////////////////////////////////
let getNEXT= async function(region="cairo",day=1)
{
    let next={
       temps:"",
       img:"",
    locate:"",
    textdisc:'',
    }
//replace the ${process.env.} with your free api key
    let data=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4f66a8102f1c480eaef23857232507&q=${region}&days=7`)

    let info= await data.json()
    console.log(info)
next.temps=await info.forecast.forecastday[day].day.avgtemp_c
next.img=await info.forecast.forecastday[day].day.condition.icon
next.textdisc=await info.forecast.forecastday[day].day.condition.text
next.locate=await info.location.name
console.log(next)
return next;

}


async function display(region="cairo"){

let cont=document.querySelector(".special")
    let box=""
    let reg=region;
let d1= 1
let d2= 2
  let firstday= await Gettcurrent(reg)
  let second=   await getNEXT(reg,d1)
  let third= await getNEXT(reg,d2)
  
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date();
  let num=d.getDay()
  
  console.log(num)
  let dayName1 = days[num];

  let dayName2 
  let dayName3 
  if(num=6)
  {
    dayName2= days[0]
    dayName3= days[1]
  }
  else if (num=5){
    dayName2= days[6]
    dayName3= days[0]
  }
  else{
   dayName2 =days[num+1]
   dayName3 =days[num+2]
  }
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
let alldate=`${day}/${month}/${year}`

box= ` <div class="col-md-4 padding-0">
<div class="d-flex bd-highlight  FirstCardHeaders">
    <div class="me-auto p-1 "><h5 class="gray">${dayName1}</h5></div>
    <div class="p-1"><h5 class="gray">${alldate}</h5></div>

  </div>

<div class="degreeINFO FirstCard">
<h3 class="gray ">${firstday.locate}</h3>
<div class="d-flex bd-highlight mb-1 ">
<div class="degree p-2 bd-highlight white currTEMP"><p class="">${firstday.temps} </p></div>
<div class="p-2 bd-highlight StatueIcon"><img src="https://${firstday.img}" alt=""></div>

</div>
<h3 class="blue">${firstday.textdisc}</h3>
<div class="d-flex bd-highlight mb-1 ">
<div class="p-2 bd-highlight"><h6 class="gray"><img src="pics/icon-umberella.png" alt=""> ${firstday.humidity}    </h6></div>
<div class="p-2 bd-highlight"><h6 class="gray"><img src="pics/icon-wind.png" alt=""> ${firstday.windspeed}km/h    </h6></div>
<div class="p-2 bd-highlight"><h6 class="gray"><img src="pics/icon-compass.png" alt=""> ${firstday.dir}</h6></div>
</div>
</div>
</div>



<div class="col-md-4 padding-0 text-center">
<div class="d-flex bd-highlight secondCardHeaders ">
    <div class="text-center w-100 p-1 bd-highlight"><h5 class="gray">${dayName2}</h5></div>
  

  </div>

<div class="d-flex flex-column padding-t justify-content-between secondCard">
<h3 class="gray">${second.locate}</h3>
<div class="d-flex bd-highlight  flex-column   justify-content-between text-center ">
<div class=" p-2  bd-highlight "><h4 class="white">${second.temps} c</h4></div>
<div class="p-2 bd-highlight "><img src="https://${second.img}" alt=""></div>

</div>
<h3 class="blue">${second.textdisc}</h3>
</div>
</div>





<div class="col-md-4 padding-0 text-center">
<div class="d-flex bd-highlight FirstCardHeaders ">
    <div class="text-center w-100 p-1 bd-highlight"><h5 class="gray">${dayName3}</h5></div>
  

  </div>

<div class="d-flex flex-column padding-t FirstCard justify-content-between">
<h3 class="gray">${third.locate}</h3>
<div class="d-flex bd-highlight  flex-column justify-content-between text-center ">
<div class=" p-2 bd-highlight white"><h4>${third.temps} c</h4></div>
<div class="p-2 bd-highlight "><img src="https://${third.img}" alt=""></div>

</div>
<h3 class="blue">${third.textdisc}</h3>
</div>
</div> 

`
cont.innerHTML=box;
console.log(firstday)
}

display();


let search= document.getElementById("search")


search.addEventListener('input',function(){
    display(search.value);

})