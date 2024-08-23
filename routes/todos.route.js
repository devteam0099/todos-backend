import express from 'express'
import { upload } from '../middlewaress/fileUpload.middleware.js'
import {addTodos,editTodos,deleteTodos,completeTodos,getTodos} from '../controllers/todos.controller.js'

const saveTodosRoute = express.Router()
const editTodosRoute = express.Router()
const deletetodosRoute = express.Router()
const completeTodosRoute = express.Router()
const getTodosRoute = express.Router()

saveTodosRoute.post('/save-data',upload.single('image'),addTodos)
editTodosRoute.put('/edit-data',upload.single('todoImage'),editTodos)
deletetodosRoute.delete('/delete-data',deleteTodos)
completeTodosRoute.patch('/complete-data',completeTodos)
getTodosRoute.get('/get-data',getTodos)

export {saveTodosRoute,editTodosRoute,completeTodosRoute,deletetodosRoute,getTodosRoute}