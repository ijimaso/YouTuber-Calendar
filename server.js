const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
    const { url } = request;
    console.log(url);
    const extension = url.split('.')[url.split('.').length - 1];
    const path = '.' + url;

    switch (extension) {
        case '/':
            fs.readFile('./public/index.html', (err, data) => {
                if (!err) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data, 'utf-8');
                } else {
                    console.log(err);
                }
            });
            break;

        case 'js':
            fs.readFile(path, (err, data) => {
                if (!err) {
                    response.writeHead(200, { 'Content-Type': 'text/javascript' });
                    response.end(data, 'utf-8');
                } else {
                    console.log(err);
                }
            });
            break;

        default:
            console.log('No File!!');
            break;
    }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Open http://localhost:${port}`);
});