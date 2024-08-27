import express from 'express'
import { upload } from '../middlewaress/fileUpload.middleware.js'
import {addTodos,editTodos,deleteTodos,completeTodos,getTodos} from '../controllers/todos.controller.js'

const todos = express.Router()

todos.post('/save-data',upload.single('image'),addTodos)
todos.put('/edit-data',upload.single('todoImage'),editTodos)
todos.delete('/delete-data',deleteTodos)
todos.patch('/complete-data',completeTodos)
todos.get('/get-data',getTodos)

export default todos