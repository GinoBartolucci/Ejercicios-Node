const http = require('http');
const fs = require('fs');

http.createServer((req, res) =>
    {
        if(req.method === 'GET'){  
            console.log(req.url);    
            fs.promises.open('.'+req.url)
            .then(()=>{
                if(req.url =='/index.js'){
                    throw new Error('403');
                }
                return fs.promises.readFile('.'+req.url)
            }) 
            .then((content)=>{
                console.log('Todo joya');//lee el archivo y lo muestra
                res.writeHead(200, {'content-type': 'text/plain'});
                res.end(content);
                logResponse('200', req);
            })            
            .catch((err)=> {//error 404 403
                console.log(err.message);   
                logResponse(err.message, req);             
                if(err.message =='403'){                    
                    res.writeHead(403, {'content-type': 'text/plain'});
                    res.end( 'Error 403 Forbidden\n' +  req.url);                    
                }         
                else{
                    res.writeHead(404, {'content-type': 'text/plain'});                    
                    res.end( 'Error 404 not found\n' +  req.url);
                }                     
            })
        }        
    }).listen(3000);

    async function logResponse (status, req){
        try{
            if(!fs.existsSync('./LogReqRes.txt')){
                await fs.promises.writeFile('./LogReqRes.txt','Request: '+req.url+' - Response: '+status + ' - Hora: '+Date.now())
                console.log('Archivo creado y escrito')
            }
            else{
                await fs.promises.appendFile('./LogReqRes.txt','\nRequest: '+req.url+' - Response: '+status + ' - Hora: '+Date.now())
                console.log('Archivo escrito')
            }
        }catch(err){
            console.log(err)
        }
    }

    
    console.log('serving since ' + Date.now());