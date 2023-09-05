const express = require('express')
const app = express()
const port = 3000

const db = require('./models')
const Todo = db.Todo

app.get('/', (req, res) => {
  res.send('hello world')
})

// 顯示 todo 清單頁	
app.get('/todos', (req, res) => {
  return Todo.findAll()
            .then((todos) => res.send({ todos}))
            .catch((err) => res.status(422).json(err))
})

// 新增 todo 頁
app.get('/todos/new', (req, res) => {
  res.send('create todo')
})

// 新增 todo
app.post('/todos', (req, res) => {
  res.send('add todo')
})

// 顯示 todo 項目頁
app.get('/todos/:id', (req, res) => {
  res.send(`get todo:${req.params.id}`)
})

// 更新 todo 頁
app.get('/todos/:id', (req, res) => {
  res.send(`get todo edit: ${req.params.id}`)
})

// 更新 todo
app.put('/todos/:id', (req, res) => {
  res.send(`edit todo: ${req.params.id}`)
})

// 刪除 todo
app.delete('/todos:id', (req, res) => {
  res.send(`delete todo: ${req.params.id}`)
})

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`)
})