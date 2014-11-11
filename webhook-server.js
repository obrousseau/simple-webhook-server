var express = require('express');
var bodyParser  = require('body-parser');

var PORT = (process.env.PORT || 5000);
var SECURITY_TOKEN = 'OJdqYg87SOcax0baFpf5WInifeErRryPA9qLjiugadBgenwi3UDBj8od21UM5to';
var HTTP_AUTH_B64_TOKEN = 'dXNlcjEyMzpwYXNzNzg5'; // user123:pass789
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router(); 

app.get('/', function(request, response) {
  response.send('This the ThousandEyes simple Webhook server sample.  Use POST methods instead of GET.')
})

// Routes
router.post('/test/:token', function(req, res) {
    if (req.params.token !== SECURITY_TOKEN) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }
    // Headers are lower-cased... :\
    if (req.query.httpAuth && req.headers['authorization'] !== 'Basic ' + HTTP_AUTH_B64_TOKEN) {
        res.status(401).send({ error: 'Unauthorized for http basic' });
        return;
    }
    console.log('Received: ' + JSON.stringify(req.body));
    res.header('Content-Type', 'text/plain');
    res.send("Done!");
    //res.json({ message: 'SUCCESS!', request: req.body });
});

app.use('/webhook-server', router);
app.listen(PORT);
console.log('Webhook Server started... port: ' + PORT);