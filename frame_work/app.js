module.exports= function frameWork(request, response){
    let endpointList = {}
    let data 
    
    this.use = ()=>{
    }
    this.route = (endpoint, cb )=>{
        endpointList[endpoint] = endpoint
        cb(request, response)
    }
    this.data = ()=>{
        console.log(data)
    }
}