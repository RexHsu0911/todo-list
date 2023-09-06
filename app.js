const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')

const db = require('./models')
const Todo = db.Todo

app.engine('.hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views', './views')
// 由於 Express.js 如果要獲取傳送過來的表單資料需要另外設定，使用 express.urlencoded 從請求網址中獲取表單資料
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

// 顯示 todo 清單頁	
app.get('/todos', (req, res) => {
  return Todo.findAll({
    attributes: ['id', 'name'],
    raw: true
  })
    .then((todos) => res.render('todos', { todos }))
    .catch((err) => res.status(422).json(err))
})

// 新增 todo 頁
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 新增 todo
app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name })
            .then(() => res.redirect('/todos'))
            .catch((err) => console.log(err))
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