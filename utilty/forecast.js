const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=8c4f84695b0b5bfbd281cf3e28cfaf68&query=' + latitude + ',' + longitude + '&units=f'
    
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined, 'It is currently ' +body.current.temperature+' degree out.But it feels like '+body.current.feelslike+' degrees out.')
        }
    })
}

module.exports=forecast