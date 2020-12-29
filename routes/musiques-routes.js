const express = require('express')

const router = express.Router();


router.get('/', (req, res, next) => {
    console.log("Liste des musiques")
    res.json({message: "Mes musiques"})
})




module.exports = router;