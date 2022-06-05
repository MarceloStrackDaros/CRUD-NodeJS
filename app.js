const express = require("express")
const db = require("./posts.json")
const crypto = require("crypto")
const bodyParser = require("body-parser")

const posts = db.posts
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/posts", (req, res) => {

  const { titulo, conteudo, autor, ano } = req.body

  if (!titulo || !conteudo || !autor || !ano) {
    return res.status(404).send("Nenhum post foi inserido ainda ou um dos quatro campos obrigatórios está faltando: título, conteudo, autor, ano")
  }

  const newPost = { id: crypto.randomUUID(), ...req.body}
  posts.push(newPost)
  res.send(newPost)
  return console.log(`Post ${titulo} salvo!`)
})

app.get("/posts", (req, res) => {
  res.send(posts)
  return console.log("Posts retornados!")
})

app.get("/posts/:id", (req, res) => {
  const id = req.params.id
  const index = posts.findIndex((p) => p.id === id)

  if (index === -1) {
    return res.status(404).send("Post não encontrado")
  }
  res.send(posts[index])
  return console.log("Post retornado!")
})

app.patch("/posts/:id", (req, res) => {
  const id = req.params.id
  const index = posts.findIndex((p) => p.id === id)

  if (!index) {
    return res.status(404).send("Post não encontrado!")
  }
  if (req.body.id) {
    return res.status(500).send("O campo id não pode ser alterado, retire-o e tente alterar o post novamente apenas com as informações que podem ser editadas!")
  }

  posts[index] = {...posts[index], ...req.body}
  res.send(posts[index])
  return console.log("Post atualizado!")
})

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id
  const index = posts.findIndex((p) => p.id === id)

  if (index === -1) {
    return res.status(404).send("Post não encontrado!")
  }

  posts.splice(index, 1)
  res.send(posts[index])
  return console.log("Post deletado!")
})

app.listen(7000, () => {
  console.log("Servidor rodando na porta 7000")
})