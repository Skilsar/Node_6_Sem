const fs = require('fs');
const url = require('url');
const http = require('http');

const {
    Sequelize
} = require('sequelize');

const conn = new Sequelize('lr_14', 'user', 'qwer1234', {
    dialect: 'mssql'
});

const {
    Faculty,
    Pulpit,
    Teacher,
    Subject,
    Auditorium_type,
    Auditorium
} = require('./Tables').ORM(conn);

const method = require('./DBMethod')

conn.authenticate().then(() => {
    console.log('Connection success');

}).catch((err) => {
    console.log('Connection error: ', err);
});

let Get_handler = (req, res, path) => {
    switch (path.split('/')[1]) {
        case '':
            fs.readFile("index.html", (err, data) => {
                if (err) {
                    res.writeHead(400, {});
                    res.end("File read error");
                    return;
                }
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.end(data);
            });
            break;
        case 'api':
            switch (path.split('/')[2]) {
                case 'faculties':
                    let faculty_name = decodeURI(path.split('/')[3]);
                    if (path.split('/')[3]) {
                        switch (path.split('/')[4]) {
                            case 'pulpits':
                                method.getPulByFac(Faculty, Pulpit, faculty_name).then(result => {
                                    res.writeHead(200, {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    });
                                    res.end(JSON.stringify(result));
                                });
                                break;
                            case 'teachers':
                                method.getTeachByFac(Faculty, Pulpit, Teacher, faculty_name).then(result => {
                                    res.writeHead(200, {
                                        'Content-Type': 'application/json; charset=utf-8'
                                    });
                                    res.end(JSON.stringify(result));
                                });
                                break;
                            default:
                                res.statusCode = 418;
                                res.end(JSON.stringify('I do not know this metod'));
                        }
                    } else {
                        method.gets(Faculty).then(result => {
                            res.writeHead(200, {
                                'Content-Type': 'application/json; charset=utf-8'
                            });
                            res.end(JSON.stringify(result));
                        });
                    }
                    break;
                case 'pulpits':
                    method.gets(Pulpit).then(result => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        res.end(JSON.stringify(result));
                    });
                    break;
                case 'teachers':
                    method.gets(Teacher).then(result => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        res.end(JSON.stringify(result));
                    });
                    break;
                case 'subjects':
                    method.gets(Subject).then(result => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        res.end(JSON.stringify(result));
                    });
                    break;
                case 'auditoriumstypes':
                    method.gets(Auditorium_type).then(result => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        res.end(JSON.stringify(result));
                    });
                    break;
                case 'auditoriums':
                    method.gets(Auditorium).then(result => {
                        res.writeHead(200, {
                            'Content-Type': 'application/json; charset=utf-8'
                        });
                        res.end(JSON.stringify(result));
                    });
                    break;
                case 'auditoriumsgt60':
                    method.getAuditoriumsgt60(Auditorium).then((result) => {
                        res.end(JSON.stringify(result));
                    });
                    break;
                default:
                    res.statusCode = 418;
                    res.end(JSON.stringify('Get-api-hello, but there is no such table on this server'));
            }
            break;
        default:
            res.statusCode = 418;
            res.end(JSON.stringify({
                error: String("I’m a teapot,I do not know this metod")
            }));
    }
}

let http_handler = (req, res) => {
    const path = url.parse(req.url).pathname;
    switch (req.method) {
        case 'GET':
            Get_handler(req, res, path);
            break;
        case 'POST':
            Post_handler(req, res, path);
            break;
        case 'PUT':
            Put_handler(req, res, path);
            break;
        case 'DELETE':
            Delete_handler(req, res, path);
            break;
        default:
            res.statusCode = 405;
            res.end(JSON.stringify({
                error: String(`Incorrected method: ${req.method}`)
            }));
            break;
    }
}

let server = http.createServer();
server.listen(3000, (v) => {
        console.log('Server running at http://localhost:3000/')
    })
    .on('error', (err) => {
        console.log(`Server running with error: ${err.code}, ${err.message}`);
    })
    .on('request', http_handler);