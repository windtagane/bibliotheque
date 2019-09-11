let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dbUrl = 'mongodb://localhost:27017/bibliotheque';
mongoose.connect(dbUrl, {useNewUrlParser: true});
let db = mongoose.connection;


const controller = {};

controller.list = (res,req) => {

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("Connection Successful!");
    
    let livreSchema = new Schema({
        titre:  String,
        date_parution: Date
    });

    let Livre = mongoose.model('Livre', livreSchema);

    Livre.find({}, function(err, users) {
    
    });
    
    req.render('index');
    });
}


/* controller.save = (req, res) => {
    console.log('ayaya');
    const data = req.body;
    console.log(data);
}; */

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body.titre);
    console.log(req.body.date);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("Connection Successful!");
    

    let livreSchema = new Schema({
        titre:  String,
        date_parution: Date
    });
    
    let Livre = mongoose.model('Livre', livreSchema);
    
    
    
    let livreAjout = new Livre({
        titre: req.body.titre,
        date_parution: req.body.date
    })

    livreAjout.save((err) => {
        console.log('Livre Ajouté');
        if (err) throw err;
    })
    
    });
};

module.exports = controller;