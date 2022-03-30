const http = require('http');
const fs = require('fs');

http.createServer((req, res) =>
    {
        if(req.method === 'GET'){
            var respuesta;
            fs.promises.readdir('./')
            .then((archivos)=>{
                var found = archivos.find(a => ('/'+a) == req.url) //busca el archivo en el directorio
                console.log(found);
                console.log(req.url);                             
                if(found !== undefined){
                    if(found =='index.js'){
                        res.writeHead(404, {'content-type': 'text/plain'});
                        res.end( 'Error 403 Forbidden\n' +  req.url);
                    }
                    else{
                        fs.promises.access(found)
                        .then(()=>{//si tiene acceso al archivo 
                            fs.promises.readFile(found)
                            .then((content)=>{
                                console.log('Todo joya');//lee el archivo y lo muestra
                                res.writeHead(200, {'content-type': 'text/plain'});
                                res.end(content);;
                            })
                            .catch((err)=> console.log(err))                
                        })
                        .catch((err)=> {//si no tiene acceso al archivo
                            console.log(err); 
                            res.writeHead(404, {'content-type': 'text/plain'});
                            res.end( 'Error 403 Forbidden\n' +  req.url);
                        })
                    }
                    }
                else{
                    res.writeHead(404, {'content-type': 'text/plain'});
                    res.end( 'Error 404\n' +  req.url);
                }                
            }).catch((err)=>console.log(err))
        }        
    }).listen(3000);

    console.log('serving since ' + Date.now());.



    fs.promises.readdir('./')
            .then((archivos)=>{
                var found = archivos.find(a => ('/'+a) == req.url) //busca el archivo en el directorio
                console.log(found);
                console.log(req.url);                             
                if(found !== undefined){
                    if(found =='index.js'){
                        throw new Error('403');
                    }
                    else{
                        return fs.promises.access(found);
                    }
                }
                else{
                    throw new Error('404');
                }
            })