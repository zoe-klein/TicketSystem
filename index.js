
var express = require('express');
var app = express();

const body_parser = require('body-parser');
app.use(body_parser.json());

var tickets = [
        {
            "id": 1,
            "created_at": "2015-07-20T22:55:29Z",
            "updated_at": "2016-05-05T10:38:52Z",
            "type": "incident",
            "subject": "MFP not working right",
            "description": "PC Load Letter? What does that even mean???",
            "priority": "med",
            "status": "open",
            "recipient": "support_example@selu.edu",
            "submitter": "Michael_bolton@selu.edu",
            "assignee_id": 235323,
            "follower_ids": [235323, 234],
            "tags": ["enterprise", "printers"],
        },
        {
            "id": 2,
            "created_at": "2015-07-20T22:55:29Z",
            "updated_at": "2016-05-05T10:38:52Z",
            "type": "incident",
            "subject": "Printer stopped working",
            "description": "Asking to load tray?? with what?",
            "priority": "med",
            "status": "open",
            "recipient": "support_example@selu.edu",
            "submitter": "Michael_bolton@selu.edu",
            "assignee_id": 235323,
            "follower_ids": [235323, 234],
            "tags": ["enterprise", "printers"],
            
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
app.post('/rest/ticket/', function(req, res){
    //res.send("Endpoint to create a new ticket");
    const item = req.body;
    console.log('Adding new items: ', item);

    data.push(item);
    res.json(tickets);
});

app.listen(3000);