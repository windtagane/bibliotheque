let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let livreSchema = new Schema({
    titre: String,
    date_parution: Date
});

const Livre = mongoose.model('Livre', livreSchema);

let dbUrl = 'mongodb://localhost:27017/bibliotheque';
const db = mongoose.connection;

const controller = {};

controller.list = (req, res) => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.on('error', console.error.bind(console, 'connection error:'));
<<<<<<< HEAD
    db.once('open', function() { 
    console.log("Controller LIST");

    Livre.find(function(err, livres) {   
        if (err) throw err;
        res.render("index", {
            livre: livres
          });
    });
=======
    db.once('open', function () {
        console.log("Controller LIST");

        Livre.find(function (err, livres) {
            if (err) throw err;
            res.render("index", {
                livre: livres
            });
        });
>>>>>>> c88ac408f2f37edfeccb2e2b76b52f5aac2a6e55
    });
}

controller.save = (req, res) => {
    //
    try {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {

            let livreAjout = new Livre({
                titre: req.body.titre,
                date_parution: req.body.date
            })
<<<<<<< HEAD
            if (livreAjout.lenght == 0) {

            }
=======

>>>>>>> c88ac408f2f37edfeccb2e2b76b52f5aac2a6e55
            livreAjout.save((err) => {
                if (err) throw err;
                console.log('Livre Ajouté');
            })

        });
    } catch (err) {
        if (err) {
            console.log(err)
        }
    }
    res.redirect('/');

    //

};



module.exports = controller;