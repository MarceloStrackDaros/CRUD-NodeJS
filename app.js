const express = require("express")
const db = require("./posts.json")
const crypto = require("crypto")
const bodyParser = require("body-parser")

const posts = db.posts
const app = express()
app.use(bodyParser.json())

app.post("/posts", (req, res) => {
  const newPost = { id: crypto.randomUUID(), ...req.body}

  posts.push(newPost)
  res.send(newPost)
  console.log("Post salvo!")
})

app.get("/posts", (req, res) => {
  res.send(posts)
})

app.get("/posts/:id", (req, res) => {
  const id = req.params.id
  const index = posts.findIndex((p) => p.id === id)

  if (!index) {
    return res.status(404).send("Usuário não encontrado")
  }
})

app.put("/posts/:id", (req, res) => {
  const id = req.params.id
  const index = posts.findIndex((p) => p.id === id)

  if (!index) {
    return res.status(404).send("Post não encontrado!")
  }

  posts[index] = req.body
  res.send(posts[index])
})

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id
  const index = posts.findIndex((p) => p.id === id)

  if (!index) {
    return res.status(404).send("Post não encontrado!")
  }

  posts.splice(index, 1)
  return res.send(posts)
})

app.listen(7000, () => {
  console.log("Servidor rodando na porta 7000")
})