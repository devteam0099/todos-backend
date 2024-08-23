import express from 'express'
import { upload } from '../middlewaress/fileUpload.middleware.js'
import { login,register } from '../controllers/auth.controller.js'
import authanticateUser from '../middlewaress/auth.middleware.js'

const loginRoute = express.Router()
const registerRoute = express.Router()

loginRoute.post('/auth-user',authanticateUser,login)
registerRoute.post('/register-user',upload.single('profilePicture'),register)

export {loginRoute,registerRoute}