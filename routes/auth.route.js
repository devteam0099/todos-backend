import express from 'express'
import { upload } from '../middlewaress/fileUpload.middleware.js'
import { login,register } from '../controllers/auth.controller.js'
import authanticateUser from '../middlewaress/auth.middleware.js'

const auth = express.Router()

auth.post( '/register-user',upload.single('profilePicture'),register)
auth.post('/auth-user',authanticateUser,login)

export default auth
