const route = require('express').Router()
const loginController = require('../controllers/login.controller')
const body = require('express').urlencoded({ extended: true })
const GuardAuth = require('./guardAuth')
route.get('/login', GuardAuth.isNotAuth, loginController.getloginpage)
route.post('/login', body, loginController.postlogindata)
module.exports = route