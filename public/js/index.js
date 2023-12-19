let form = document.getElementById("form1")
let inp = document.querySelector("[type='text']")
let welcomemesg = document.querySelector(".welcomemesg")
let country = document.querySelector(".country")
let latitude = document.querySelector(".latitude")
let longitude = document.querySelector(".longitude")
let forecast = document.querySelector(".forecast")
let erorr = document.querySelector(".erorr")
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    weatherfunction()
    welcomemesg.style.display = "none"
})
let weatherfunction = async ()=>{
    try{
        const adress = inp.value
        const res = await fetch("http://localhost:3000/weather?adress=" + adress)
        const data = await res.json()
        // console.log(data)
        if(data.erorr){
            country.innerText = ""
            forecast.innerText = ""
            latitude.innerText = ""
            longitude.innerText = ""
            erorr.innerText = "ERORR : " + data.erorr.toUpperCase()
        }else{
            erorr.innerText = ""
            country.innerText = "Country Is "+  data.location
            forecast.innerText = "forecast Is "+ data.forecast
            latitude.innerText = "latitude Is "+ data.latitude
            longitude.innerText = "longitude Is "+data.longtitude
        }
    }
    catch(e){
        console.log(e)
    }
}

