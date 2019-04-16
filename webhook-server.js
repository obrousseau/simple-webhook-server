var express = require('express');
var bodyParser  = require('body-parser');
var restClient = require('node-rest-client').Client;

var PORT = (process.env.PORT || 5000);
var SECURITY_TOKEN = 'OJdqYg87SOcax0baFpf5WInifeErRryPA9qLjiugadBgenwi3UDBj8od21UM5to';
var HTTP_AUTH_B64_TOKEN = 'dXNlcjEyMzpwYXNzNzg5'; // user123:pass789
var TRELLO_API_KEY = "161552c07fb3a105793022c82d833c5b"
var TRELLO_OAUTH_OLI_TOKEN = "a11db333a3c9766129ff289562ff30725ff07ef5da83abdf309681a5a3e61e7a"
var TRELLO_BOARD_ID = "5a06ed465a69fb980915f341"
var TRELLO_LIST_ID = "5c73eca72135995a3400f5bf"
var TARGET_FOR_TRELLO = "https://api.trello.com/1"
var TARGET_HOOK_SLACK = 'https://hooks.slack.com/services/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';
var te_img = 'https://s3.amazonaws.com/uploads.hipchat.com/6634/194641/uncYbgVEMQ1XNtk/TE-Eye-36x36.jpg';
var app = express();

var TRELLO_URL = TARGET_FOR_TRELLO + "cards?idList=" + TRELLO_BOARD_ID

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

function objToStr (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += '\"' + p + ': ' + obj[p] + '\"';
        }
    }
    return str;
}

function translateHookContent_toTrello(req) {
    var retVal = "Here's the request body: " + JSON.stringify(req.body);

    // JIRA

    // Helpscout

    // switch (req.body.eventType) {
    //     case "ALERT_NOTIFICATION_TRIGGER":
    //         retVal = "Alert notification [<" + req.body.alert.permalink + "|" + req.body.alert.alertId + ">]: " + req.body.alert.testName + " (" + req.body.alert.ruleName + ")\n";
    //         switch (req.body.alert.type) {
    //             case "BGP":
    //                 break;
    //             case "DNS+ Domain":
    //                 break;
    //             case "DNS+ Server":
    //                 break;
    //             default:
    //                 //this has agents
    //                 retVal += " " + req.body.alert.agents.length + " agents: ";
    //                 for (var i=0;i<req.body.alert.agents.length;i++) {
    //                     if (i>0) {
    //                         retVal += " | ";
    //                     }
    //                     retVal += "<" + req.body.alert.agents[i].permalink + "|" + req.body.alert.agents[i].agentName + "> ("
    //                     if (req.body.alert.agents[i].active == "1") {
    //                         retVal += "Active";
    //                     } else {
    //                         retVal += "Cleared";
    //                     }
    //                     retVal += "): " + req.body.alert.agents[i].metricsAtEnd;
    //                 }
    //         }
    //         break;
    //     case "ALERT_NOTIFICATION_CLEAR":
    //         retVal = "Alert cleared [<" + req.body.alert.permalink + "|" + req.body.alert.alertId + "|" + ">]: " + req.body.alert.testName + " (" + req.body.alert.ruleName + ")";
    //         break;
    //     case "AGENT_ALERT_NOTIFICATION_TRIGGER":
    //         retVal = "Agent notification [" + req.body.agentAlert.agentNotificationId + "]: " + req.body.agentAlert.agentName + " (" + req.body.agentAlert.ruleName + ") ";
    //         retVal += req.body.agentAlert.hostname  + " (" + req.body.agentAlert.metricsAtStart + "): "
    //         if (req.body.agentAlert.active == "1") {
    //             retVal += "Active";
    //         } else {
    //             retVal += "Cleared";
    //         }
    //         break;
    //     case "AGENT_ALERT_NOTIFICATION_CLEAR":
    //         retVal = "Agent notification cleared [" + req.body.agentAlert.agentNotificationId + "]: " + req.body.agentAlert.agentName + " (" + req.body.agentAlert.ruleName + ") ";
    //         retVal += req.body.agentAlert.hostname  + " (" + req.body.agentAlert.metricsAtEnd + "): "
    //         if (req.body.agentAlert.active == "1") {
    //             retVal += "Active";
    //         } else {
    //             retVal += "Cleared";
    //         }
    //         break;
    //     case "WEBHOOK_TEST":
    //         retVal = "Webhook test received. (" + req.body.eventId + ")";
    //         break;
    //     default:
    //         retVal = "Received unregistered event type " + req.body.eventType + " from ThousandEyes webhook.  Body data: \n" + JSON.stringify(req.body);
    // }
    return ({ username: "ThousandEyes Alerts", icon_url: te_img, text: retVal});
}

app.get('/', function(request, response) {
  response.send('This the ThousandEyes simple Webhook server sample.  Use POST methods instead of GET.')
  console.log('GET request received');
})

router.post('/test/:token', function(req, res) {
    if (req.params.token !== SECURITY_TOKEN) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }
    if (req.query.httpAuth && req.headers['authorization'] !== 'Basic ' + HTTP_AUTH_B64_TOKEN) {
        res.status(401).send({ error: 'Unauthorized for http basic' });
        return;
    }
    console.log('Received: ' + JSON.stringify(req.body));
//  Use the following lines to forward the request to slack, and return the response code from the slack api back to the sender.
//  Note: if you don't send a 200 response code back to the ThousandEyes webhook initiator, it'll keep retrying every 5 minutes for an hour.
    var restCall = new restClient();
    var hookBody = translateHookContent_toTrello(req);
    var args = {data: hookBody,headers:{"Content-Type": "application/json"}};
    restCall.post(TARGET_HOOK, args, function(data,response) {
        console.log('Sending to destination hook: ' + JSON.stringify(args));
        if (response.statusCode != 200) {
            console.log('Received response: ' + response.statusCode + ' (' + response.statusMessage + ') from destination server [' + TARGET_HOOK + ']');
            console.log('To test yourself, run this: \n curl -i -v \'' + TARGET_HOOK + '\' -H ' + objToStr(args.headers) + ' -d \'' + JSON.stringify(args.data) + '\'');
        }
        res.status(response.statusCode).send(response.statusMessage);
    });
//  Alternatively, send a response code directly to the webhook server without forwarding to slack
//    res.status(200).send(req.body);

});

app.use('/webhook-server', router);
app.listen(PORT);
console.log('Webhook Server started... port: ' + PORT);
