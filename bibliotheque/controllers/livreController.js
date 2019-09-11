let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let dbUrl = 'mongodb://localhost:27017/bibliotheque';
const db = mongoose.connection;

const controller = {};

controller.list = (req,res) => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    console.log("Controller LIST");
    
    let livreSchema = new Schema({
        titre:  String,
        date_parution: Date
    });
 
    let Livre = mongoose.model('Livre', livreSchema);

    Livre.find(function(err, livres) {   
        if (err) throw err;
        res.render("index", {
            livre: livres
          });
    });
    });
}

controller.save = (req, res) => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
            
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
                if (err) throw err;
                console.log('Livre Ajouté');
            })
            
        });
        res.render('index');
    };



module.exports = controller;