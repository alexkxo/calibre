const mongoose = require("mongoose")

const schemaUtilisateur = mongoose.Schema({
    prenom: String,
    nom: String,
    age: Number,
    email: String,
    nom_utilisateur: String,
    mot_passe: String,
    unitePrefere:String,
    poids: Number,
    taille: [{
    }],
    genre: String,
    id_niveau_activite_physique: Number,
    imc: Number,
    calorie_quotidien_recommendee: Number,
    restrictions_alim: [{
        id: Number,
        nom: String,
        description: String
    }],
    ibm: Number,
    exigences_dietiques: [{
        id: Number,
        nom: String,
        description: String,
        contenues_a_eviter: [{
            id: Number,
            nom: String,
            description: String
        }],
    }]
});

const Utilisateur = mongoose.model("Utilisateur", schemaUtilisateur);
module.exports = Utilisateur;