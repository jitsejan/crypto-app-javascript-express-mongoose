// Requirements
var express 	   = require('express');
var app 		   = express();
var mongoose 	   = require('mongoose');
// Make sure we can use HTML and JavaScript interchangeably
app.set('view engine', 'ejs');
// Database connection
mongoose.connect('mongodb://localhost/crypto-data'); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to Mongo database');
});
// Define the schema using Mongoose
var Schema = mongoose.Schema;
// The Mining schema should be the same as the data we put in Python
var miningSchema = new Schema({
    Date: Date,
    BTC: Number,
    DRK: Number,
    LTC: Number
});
// Create the model
var Mining = db.model('mining', miningSchema);
// The Wallet schema should be the same as the data we put in Python
var walletSchema = new Schema({
    Time: Date,
    BTC: Number,
    DOGE: Number,
    ETH: Number,
    LTC: Number,
    REP: Number
});
// Create the model
var Wallet = db.model('wallet', walletSchema);

// Create the route for the frontpage
app.get('/', function(req, res) {
	res.render('pages/index', { title: 'Home' });
});
// Create the route to the mining page
app.get('/mining', function(req, res) {
  Mining.find({}, null, {sort: {'Date':+1}}, function (err, minings){
    console.log(minings);
    res.render('pages/mining', { title:'Mining', minings: minings });
  })
});
// Create the route to the wallet page
app.get('/wallet', function(req, res) {
  Wallet.find({}, null, {sort: {'Time':+1}}, function (err, wallets){
    console.log(wallets);
    res.render('pages/wallet', { title:'Wallet', wallets: wallets });
  })
});
// Define the public directory (where the stylesheet lives)
// Normally this would be a subdirectory 'public/css/'
app.use(express.static(__dirname));
// Start the app on port 3000
app.listen(3000);
console.log('listening on port 3000');
