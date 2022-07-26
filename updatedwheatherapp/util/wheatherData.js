const express = require('express');
const request=require('request');
const constants=require('../config');

const wheatherData=(address,callback)=>{
    const url=constants.openWheatherMap.BASE_URL+encodeURIComponent(address)+'&appid='+constants.openWheatherMap.SECRET_KEY;
   // console.log(url);
    request({url, json:true}, (error, {body})=> {
       // console.log(body);
        if(error) {
            callback("Can't fetch data from open weather map api ", undefined)
        } else if(!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to find required data, try another location", undefined);
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
            // callback(undefined,{
            //     abs: true
            // })
        }
    })    
}

module.exports=wheatherData;