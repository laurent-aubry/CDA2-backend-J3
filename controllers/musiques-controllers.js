const mongoose = require('mongoose')

const Musique = require('../models/musique')



// const MUSIQUES =[
//     {
//         id : '1',
//         auteur: "Daft Punk",
//         annee: 2013,
//         titre: "Get lucky",
//         imageUrl: "https://cdn-www.konbini.com/fr/images/files/2013/12/get-lucky-daft-punk.png"
//     },
//     {
//         id : '2',
//         auteur: "David Guetta ft Sia",
//         annee: 2011,
//         titre: "Titanium",
//         imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51cQ8TfyqJL._SX342_QL70_ML2_.jpg"
//     },
//     {
//         id : '3',
//         auteur: "Shaka Ponk",
//         annee: 2019,
//         titre: "Smells like teen spirits",
//         imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg"
//     },
//     {
//         id : '4',
//         auteur: "Imagine Dragon",
//         annee: 2018,
//         titre: "Natural",
//         imageUrl: "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg"
//     }
// ]


const getMusiques = async (req, res, next) => {
    let musiques
    try {
        musiques = await Musique.find();
    } catch (error) {
        console.log("erreur")
    }
    res.json({ toutesMesMusiques: musiques.map(m => m.toObject({getters: true}))});
}

const getMusiqueById = (req, res, next) => {
    // Récupération du paramètre musiqueId passé dans l'url
    const musiqueId = req.params.musiqueId;
    // Scan de la Base de donnée pour renvoyer l'objet Musique pour l'id concerné
    const musique = MUSIQUES.find(m => {
        return m.id === musiqueId;
    })
    if(!musique){
        return res.status(404).json({message : "Musique non trouvée pour cet identifiant"})
    } 
    // réponse au client intégrant les données de la musique concernée au format JSON
    res.json({musique})
}

const createMusique = async (req, res, next) => {
    const { auteur, annee, titre, imageUrl } = req.body;
    
    const createdMusique = new Musique ({
      // id: uuid(),
      auteur,
      annee,
      titre,
      imageUrl
    })
  
    // MUSIQUES.push(createdMusique);
    try {
      await createdMusique.save();
      } catch (err) {
    //   const error = new HttpError(
    //     'L\'ajout de la Musique n\'a pas fonctionné. Veuillez réessayer.',
    //     500
    //   );
    //   return next(error);
    console.log(erreur)
    }
    
  
    // status 201 est utilisé pour confirmé que tout s'est passé correctement lors d'un ajout de données
    //status 200 est utilisé pour confirmé que tout s'est passé correctement (sans ajout de data)
    res.status(201).json({musique: createdMusique});
  };

exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;