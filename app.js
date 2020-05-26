import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import expressStatusMonitor from 'express-status-monitor';
import passportManager from './app/middleware/passport';
import path from 'path';
import router from './routes/v1';
import fs from "fs";
const jwt = require('jwt-simple');
//--- End of Include -----

//--- Declare Variable ---
let app = express();
//--- End of Declare Variable ---
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(expressStatusMonitor());
app.use(expressValidator());
app.use('/', express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}));

app.all('*', function (req, res, next) {
    let responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE",
        "AccessControlAllowCredentials": true
    };

    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

process.on('unhandledRejection', function (reason, p) {
    console.log(reason);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Urbanice Expressjs API !!!'));
// Use Api routes in the App
app.use('/',router);

app.use(passportManager.initialize());

const loginMiddleWare = (req, res, next) => {
    if (req.body.username === 'dev-test'
        && req.body.password === '12345') next();
    else res.status(401).send({'message': 'Wrong username and password'});
};
app.post("/v1/login", loginMiddleWare, (req, res) => {
    const SecretOrKey = fs.readFileSync('./storage/' + 'oauth-private.key', 'utf8');
    const payload = {
        sub: req.body.username,
        iat: new Date().getTime()
    };
    res.status(200).send({
        'access_token': jwt.encode(payload,SecretOrKey,'RS256')
    });
});

app.use((req, res, next) => {
    res.status(404);
    // respond with html page
    if (req.accepts('html')) {
        return res.send({ url: `route ${req.url} not found` });
    }
    // respond with json
    if (req.accepts('json')) {
        return res.send({
            errors: {
                status_code: 404,
                message: "Not found."
            }
        });
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

export default app;