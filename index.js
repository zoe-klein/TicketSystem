
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var tickets = [
        {
            "id": 1,
            "created_at": "2015-07-20T22:55:29Z",
            "subject": "MFP not working right",
            "description": "PC Load Letter? What does that even mean???",
            "status": "open",
            "recipient": "support_example@selu.edu",
            "submitter": "Michael_bolton@selu.edu"
        },
        {
            "id": 2,
            "created_at": "2015-07-20T22:55:29Z",
            "subject": "Printer stopped working",
            "description": "Asking to load tray?? with what?",
            "status": "open",
            "recipient": "support_example@selu.edu",
            "submitter": "Michael_bolton@selu.edu"
        }
    ]

/* this will be the home page */
app.get('/', function(req, res){
    res.send("Welcome to the Help Desk!");
});

/* this will get ALL tickets in memory */
app.all('/rest/list/', function(req, res){
    //res.send("Endpoint to get all tickets");
    res.json(tickets);
});

/* this will get by ID of the ticket in memory */
app.get('/rest/ticket/:id', function(req, res){
    const ticketId = parseInt(req.params.id);
    const ticket = tickets.find(_ticket => _ticket.id === ticketId);

    if (ticket) {
        res.json(ticket);
    } else {
        res.json({message: `ticket ${ticketId} doesn't exist`});
    }
});

/* this will create a ticket ? */
app.get('/rest', function(req, res){
    //res.send("Endpoint to create a new ticket");
    res.sendFile(__dirname + '/form.html');
});

app.post('/rest/ticket', function(req, res) {
    tickets.push(req.body);
    res.sendStatus(201);
});

app.listen(3000);