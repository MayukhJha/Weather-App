const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="90258b7ee878f698884b402b73e9b424";

weatherform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityinput.value;

    if(city){
        try{
            const weatherdata=await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }  
    }
    else{
        displayerror("please enter a city")
    }
})

async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response=await fetch(apiurl);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json();
}

function displayweatherinfo(data){
    console.log(data);
    const {name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;

    card.textContent="";
    card.style.display="flex";

    const citydisplay=document.createElement("h1");
    const tempdisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const errordisplay=document.createElement("p");

    citydisplay.textContent=city;
    tempdisplay.textContent=`${(temp-273).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity : ${humidity}%`;
    descdisplay.textContent=`${description}`;

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
}

function displayerror(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}