const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const body = require('express').urlencoded({ extended: true })
const GuardAuth = require('./guardAuth')

router.get('/', GuardAuth.isNotAuth, AuthController.getregisterpage)
router.post('/', body, AuthController.postregisterdata)
module.exports = router