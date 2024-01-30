const fs = require('fs');
const process = require('process');

const cat = function(path){
    fs.readFile(path, 'utf8', function(err,data){
        if(err){
            console.log('ERROR:', err);
            process.kill(1);
        }
        console.log('DATA...', data);
    })
}

cat(process.argv[2]);