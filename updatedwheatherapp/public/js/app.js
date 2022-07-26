//const { response } = require("express");

var fetchwheather='/wheather';

const wheatherform=document.querySelector('form');
const search=document.querySelector('input');
const wheathericon=document.querySelector('.weatherIcon');
const wheathercondition=document.querySelector('.weatherCondition');
const temperature=document.querySelector('.temperature span');
const locationEle=document.querySelector('.place');
const dateElement=document.querySelector('.date');

const monthnames=["January","February","March","April","May","June","July","August","September","October","November","December"]
dateElement.textContent=new Date().getDate()+" , "+monthnames[new Date().getMonth()].substring(0.3);



wheatherform.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(search.value);
    locationEle.textContent="Loading...";
    temperature.textContent="";
    wheathercondition.textContent="";

    const locationapi=fetchwheather+"?address="+search.value;
    fetch(locationapi).then(response =>{
        response.json().then(data =>  {
                if(data.error)
                {
                    locationEle.textContent=data.error;
                    temperature.textContent="";
                    wheathercondition.textContent="";
                }
                else{
                    if(data.description=="rain" || data.description=="fog")
                    {
                        wheathericon.className="wi wi-day-"+data.description;
                    }
                    // else
                    // {
                    //     wheathericon.className="wi wi-day-cloudy";
                    // }
                    locationEle.textContent=data.cityName;
                    temperature.textContent=(data.temperature-273.15).toFixed()+String.fromCharCode(176);
                    wheathercondition.textContent=data.description.toUpperCase();
                }
            })
      //  console.log(response);
    });
})