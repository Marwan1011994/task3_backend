const express = require("express")
const path = require("path")
const app = express()
const port = process.env.PORT || 3000

const viewsdirectory = path.join(__dirname,"../temp1/views")
app.set("views",viewsdirectory)

const publicDirectory = path.join(__dirname,"../public")

app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');


const hbs = require("hbs")
const partialsPath = path.join(__dirname,"../temp1/partials")
hbs.registerPartials(partialsPath)


app.get('/',(req,res)=>{
    res.render('index',{
        title : "Home",
        desc : "Welcome to our website. To know your country’s weather, longitude and latitude, please enter the name of your country"
    })
})

app.get('/findweather',(req,res)=>{
    res.render('findweather',{
        title : "findweather",
    })
})

////////////////////////////////////////////////////////

const forecast = require("./Data/forecast")
const geocode = require("./Data/geocode")

app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            erorr: "you must provide an adress"
        })
    }
    geocode(req.query.adress,(erorr,data)=>{
        if(erorr){
            return res.send({erorr})
        }
        forecast(data.latitude,data.longtitude,(erorr,forecastdata)=>{
            if(erorr){
                return res.send({erorr})
            }
            res.send({
                forecast : forecastdata,
                location: req.query.adress,
                latitude : data.latitude,
                longtitude: data.longtitude
            }) 
        })
    })
})



/////////////////////////////////////////////////////////
app.get("*",(req,res)=>{
    res.send("404 page Not Found")
})
////////////////////////////////////////////////////////////////////////////////////
app.listen(port,()=>{
    console.log(`exapmle app listening on port ${port}`)
})
