require('dotenv').config()
const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3000
const { createCancion, getCanciones, updateCancion, deleteCancion} = require('./crud')

app.use(express.json())

app.get('/', (_, res) => {
  const page = fs.readFileSync('./public/index.html', 'utf-8')
  res.status(200).send(page)
})

app.post('/canciones', (req, res) => {
  const { id, titulo, artista, tono } = req.body
  createCancion({ id, titulo, artista, tono })
  res.status(201).end()
})

app.get('/canciones', (_, res) => res.status(200).json(getCanciones()))

app.put('/canciones/:id', (req, res) => {
  const { id } = req.params
  const { titulo, artista, tono } = req.body
  updateCancion(parseInt(id), { titulo, artista, tono })
  res.status(200).end()
})

app.delete('/canciones/:id', (req, res) => {
  const { id } = req.params
  deleteCancion(parseInt(id))
  res.status(200).end()
})

app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'La ruta no existe uwu' }))

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
