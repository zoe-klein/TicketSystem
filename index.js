const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://classuser:qBXgK1Y5j5w1iWZK@zkmdb.cen8f8i.mongodb.net/?retryWrites=true&w=majority";

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
//var myForm = document.getElementById("myform");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

/* this will be the home page */
app.get('/', function(req, res){
    res.send("Welcome to the Help Desk!");
});

/* this will get ALL tickets in mongodb */
app.all('/rest/list/', function(req, res){
    const client = new MongoClient(uri);

    async function run() {
        try {
            const database = client.db("zkmdb");
            const tickets = database.collection("TicketSystem");

            //find all tickets in the database then convert to an array
            const ticket = await tickets.find({}).toArray();
            res.send(ticket);

        } finally {
            await client.close();
        }
    }//end run

    //run to find and report to the console
    run().catch(console.dir);
});

/* this will get by ID of the ticket in the mongodb */
app.get('/rest/ticket/:id', function(req, res){
    const client = new MongoClient(uri);

    async function run() {
        try {
            //which database and collection to use
            const database = client.db("zkmdb");
            const tickets = database.collection("TicketSystem");

            //search the collection for the correct ticketId
            const query = { ticketId: req.params.id};
            const ticket = await tickets.findOne(query);

            res.send("Found: " + JSON.stringify(ticket));

        } finally {
            //ensures that the client will close when you finish/error
            await client.close();
        }
    }//end run

    //run to find ticketId and report to the console
    run().catch(console.dir);
});

/* this will create a ticket ? */
// const form = 
app.get('/rest', function(req, res){
    //res.send("Endpoint to create a new ticket");
    res.sendFile(__dirname + '/form.html');
});

//const createTicket = 
app.post('/rest/ticket', function(req, res) {
    const client = new MongoClient(uri);

    async function run() {
        try {
            const database = client.db("zkmdb");
            const tickets = database.collection("TicketSystem");

            //reads the form into ticket and then sends that to database
            const ticket = await tickets.insertOne(req.body);
            res.send(ticket);
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

//const updateTicket = 
app.put('/rest/ticket', function(req, res) {
    const client = new MongoClient(uri);

    async function run() {
        try {
            //connect to database
            const database = client.db("zkmdb");
            const tickets = database.collection("TicketSystem");

            //find ticket ID
            const query = { ticketId: req.params.id};

            //update ticket
            const updateTicket = {$set: {
                "id": req.params.id,
                "created_at": req.params.created_at,
                "subject": req.params.subject,
                "description": req.params.description,
                "recipient": req.params.recipient,
                "submitter": req.params.submitter
            }}

            const result = await tickets.updateOneAndUpdate(query, updateTicket);

            res.send(result);
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.delete('/rest/ticket/delete/:id', function(req, res) {
    const client = new MongoClient(uri);

    async function run() {
        try {
            //connect to database
            const database = client.db("zkmdb");
            const tickets = database.collection("TicketSystem");

            //find ticket ID
            const query = { ticketId: req.params.id};
            const ticket = await tickets.find(query);

            //delete
            const deleteTicket = tickets.delete(ticket)
            res.delete(deleteTicket);

        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
});

app.listen(3000);