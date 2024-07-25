// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const conspiraciesRoutes = require('./server/routes/conspiracies');

var mongoose = require('mongoose');


async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://localhost:27017/conspiracy-ranker', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database!');
    } catch (err) {
        console.log('Connection failed: ' + err);
    }
}
connectToDatabase();


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(logger('dev'));

// Add support for CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});


app.use(express.static(path.join(__dirname, 'dist/final-project/browser')));


app.use('/', index);
app.use('/conspiracies', conspiraciesRoutes);




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/final-project/browser/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
    console.log('API running on localhost: ' + port)
});