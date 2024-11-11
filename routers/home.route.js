const homecontroller = require("../controllers/home.controller")
const GuardAuth = require('./guardAuth')

const router = require("express").Router();
// router.use('/details' , bookcontroller.detailsproduct);

router.get('/', GuardAuth.isAuth, homecontroller.homeThreeController);

module.exports = router;