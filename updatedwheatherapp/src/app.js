const express=require('express');
const hbs=require('hbs');
const path=require('path');
const app=express();
const wheatherData=require('../util/wheatherData');

const port =process.env.PORT || 3000;

const publicstaticpath=path.join(__dirname,"../public");
const viewpath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials');

app.set('view engine','hbs')
app.set('views',viewpath);
hbs.registerPartials(partialpath);
app.use(express.static(publicstaticpath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'wheather app'
    })
})
app.get('/wheather',(req,res)=>{
   const address=req.query.address;
   if(!address)
   {
    return res.send({error:"you must enter address in search box"})
   }
   wheatherData(address,(error,{temperature,description,cityName}={}) => {
   // console.log(result);
   if(error)
   {
    return res.send({error})
   }
   //console.log(temperature,description,cityName);
   res.send({
    temperature,description,cityName
   })
   })
});
app.get('*',(req,res)=>{
    res.send("page not found ");
})

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
})