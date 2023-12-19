const request = require("request")
const geocode = (adress,callback)=>{

    const mapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ adress +".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw";
    
    request({url: mapbox,json:true},(error,response)=>{
        if(error){
            callback("unable to connect geocode service",undefined)
        }else if(response.body.message){
            callback(response.body.message,undefined)
        }else if(response.body.features.length == 0){
            callback("unable to find location",undefined)
        }else{
            // callback(undefined,"longtitude " + response.body.features[0].center[0] + "  "+"latitude " + response.body.features[0].center[1])
                callback(undefined,{
                            longtitude : response.body.features[0].center[0],
                            latitude : response.body.features[0].center[1]
               })
        }
    })
}
module.exports = geocode