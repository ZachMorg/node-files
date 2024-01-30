const fs = require('fs');
const process = require('process');
const axios = require('axios');


const handleOutput = function(text, out){
    if(out){
        fs.writeFile(out, text, 'utf8', function(err){
            if(err){
                console.log('ERROR:', err);
                process.kill(1);
            }
        });
        console.log(`Successfully created ${out}`)
    }
    else{
        console.log(text);
    }
}


const cat = function(path, out){
    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.log('ERROR:', err);
            process.kill(1);
        }
        handleOutput(data, out);
    })
}


const webCat = async function(url, out){
    try{
        let res = await axios.get(url);
        handleOutput(res.data, out);
    }
    catch{
        console.log('ERROR:', err);
        process.kill(1);
    }
}



let path;
let out;


if(process.argv[2].slice(0, 5) === '--out'){
    out = process.argv[3];
    path = process.argv[4];
}
else{
    path = process.argv[2];
}


if(path.slice(0, 4) === 'http'){
    webCat(path, out);
}
else{
    cat(path, out);
}