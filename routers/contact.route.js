const contactcontroller = require("../controllers/contact.controller");
const router = require("express").Router();
const GuardAuth = require('./guardAuth')

router.get('/', GuardAuth.isAuth, contactcontroller.getcontactpage);
module.exports = router;