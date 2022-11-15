const express = require("express");
//connection mongoose
const mongoose = require("mongoose");
const app = express();
const port = 3000;
//importation de module schemaUtilisateur
const modelUtilisateur = require("./models/schemaUtilisateur");
const nomUtilisateur = "admin";
const motPasse = "admin";
const nomDb = "Calibre";
const cluster = "Calibre";
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const configuerationConnexion = require("./config/config-connexion");

const {
    checkAuthenticated,
    checkNotAuthenticated,
} = require("./middlewares/auth");
const initialiserPassport = require("./passport-config");

/**
 * Connexion MongoDB à la base de données (CLOUD - MongoDB Atlas) nommée "calibre"
 */
// mongoose.connect(
// "mongodb+srv://${nomUtilisateur}:${motPasse}@${cluster}.unyolim.mongodb.net/${nomDb}?retryWrites=true&w=majority",
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	}
// );


/**
 * Connexion MongoDB à la base de données (LOCALE) nommée "calibre"
 */
mongoose.connect("mongodb://127.0.0.1:27017/" + nomDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//route permettant de servir les fichier statiques
app.use(express.static(__dirname + "/public/"));
// pour activer le module ejs

app.set("view engine", "ejs");

//ceci permet de savoir si la bd est bien connectee
const bd = mongoose.connection;
bd.on("error", console.error.bind(console, "Erreur de connection: "));
bd.once("open", function() {
    console.log("Connexion réussie à MongoDB");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
    session({
        name: "sessionUtilisateur",
        secret: "twt",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.get("/", (req, res) => {
    res.render("pages/index", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant

    });
});
/**
 * Route: génère la page de la recherche des recettes
 */
app.get("/recettes", (req, res) => {
    res.render("pages/recettes", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant

    });
});

/**
 * Route: génère la page de la recherche des nutriments
 */
app.get("/nutriments", (req, res) => {
    res.render("pages/nutriments", {
        utilisateurconnecte: configuerationConnexion.utilisateurCourant,
        utilisateurCourant: configuerationConnexion.utilisateurCourant

    });
});
app.post("/ajouter_calorie", checkAuthenticated, async(req, res) => {
    var calorie =
        parseInt(req.body.calorie) +
        configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee;

    configuerationConnexion.utilisateurCourant.calorie_quotidien_consommee = calorie;
    await modelUtilisateur.findOneAndUpdate({ email: configuerationConnexion.utilisateurCourant.email }, { calorie_quotidien_consommee: calorie });

    res.redirect("/profil");
});
// For website access
/**app.listen(port, () => {
	console.log(`Le serveur est sur localhost:${port}`);
});**/
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}

const utilisateurRoutes = require("./routes/utilisateur");

app.use(utilisateurRoutes);

module.exports = app;