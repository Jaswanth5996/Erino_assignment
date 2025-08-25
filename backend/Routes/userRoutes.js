const express = require('express')
const {loginUser,registerUser, logoutUser,me} = require('../controllers/userController')
const protect = require('../userMiddleware')
const router = express.Router()

router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.get('/me',me)

module.exports = router