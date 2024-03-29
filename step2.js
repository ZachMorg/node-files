const fs = require('fs');
const process = require('process');
const axios = require('axios');


const cat = function(path){
    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.log('ERROR:', err);
            process.kill(1);
        }
        console.log('DATA...', data);
    })
}



const webCat = async function(url){
    try{
        let res = await axios.get(url);
        console.log(res.data);
    }
    catch{
        console.log('ERROR:', err);
        process.kill(1);
    }
}


let path = process.argv[2];

if(path.slice(0, 4) === 'http'){
    webCat(path);
}
else{
    cat(path);
}