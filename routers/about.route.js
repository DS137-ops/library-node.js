

const aboutcontroller = require("../controllers/about.controller");
const router = require("express").Router();
const GuardAuth = require('./guardAuth')

router.get('/', GuardAuth.isAuth, aboutcontroller.getaboutinfo);
module.exports = router;