const mongoose = require('mongoose')

const HttpError = require('../models/http-error');

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
    } catch (err) {
      const error = new HttpError(
        'Erreur lors de la récupération de la liste',
        500
      );
      return next(error)
    }
    res.json({ musiques: musiques.map(m => m.toObject({getters: true})) });
  };

const getMusiqueById = async (req, res, next) => {
    const musiqueId = req.params.musiqueid;
  
    let musique
    try {
      musique = await Musique.findById(musiqueId);
    } catch (err) {
      const error = new HttpError(
        'Erreur lors de la récupération de la musique',
        500
      );
      return next(error)
    }
    if (!musique) {
      const error = new HttpError(
        'Aucune musique trouvée pour cet id.',
        404
      );
      return next(error);
    }
  
    res.json({ musique: musique.toObject({ getters: true }) });
  };

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
      const error = new HttpError(
        'L\'ajout de la Musique n\'a pas fonctionné. Veuillez réessayer.',
        500
      );
      return next(error);
    // console.log(erreur)
    }
    
  
    // status 201 est utilisé pour confirmé que tout s'est passé correctement lors d'un ajout de données
    //status 200 est utilisé pour confirmé que tout s'est passé correctement (sans ajout de data)
    res.status(201).json({musique: createdMusique});
  };

  const updateMusique = async (req, res, next) => {
    const { auteur, annee, titre, imageUrl } = req.body;
    const musiqueId = req.params.musiqueid;
    let musique;
    try {
      musique = await Musique.findById(musiqueId);
    } catch (err) {
      const error = new HttpError(
        'Aucune musique trouvée pour cet id.',
        500
      );
      return next(error);
    }
  
    musique.auteur = auteur;
    musique.annee = annee;
    musique.titre = titre;
    musique.imageUrl = imageUrl;
  
    try {
      await musique.save();
    } catch (err) {
      const error = new HttpError(
        'Erreur lors de la mise à jour de cette musique.',
        500
      );
      return next(error);
    }
  
    res.status(200).json({musique: musique.toObject({ getters: true })});
  };
  
  const deleteMusique = async (req, res, next) => {
    const musiqueId = req.params.musiqueid;
    //retourne une nouvelle array filtré
    // MUSIQUES = MUSIQUES.filter(m => m.id !== musiqueId);
    let musique;
    try {
      musique = await Musique.findById(musiqueId)
    } catch (err){
      const error = new HttpError(
        'Erreur lors de la suppression de cette musique',
        500
      );
      return next(error);
    }
    if (!musique){
      const error = new HttpError(
        'Aucune musique trouvée pour cet id',
        404
      );
      return next(error);
    }
    try{
      await musique.remove();
    } catch (err) {
      const error = new HttpError(
        'Erreur lors de la suppression de cette musique.',
        500
      );
      return next(error);
    }
    res.status(200).json({ message: "Musique supprimée!" });
  };
  
  

exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;
exports.updateMusique = updateMusique;
exports.deleteMusique = deleteMusique;