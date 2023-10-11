const fs = require('fs')

const getCanciones = () => JSON.parse(fs.readFileSync('./db/canciones.json','utf-8'))
const setCanciones = (canciones) => fs.writeFileSync('./db/canciones.json', JSON.stringify(canciones))

const createCancion= (cancion) => {
  const listaCanciones = getCanciones()
  listaCanciones.push(cancion)
  setCanciones(listaCanciones)
}

const updateCancion = (id, cancion) => {
  const listaCanciones = getCanciones()
  const index = listaCanciones.findIndex((c) => c.id === id)
  listaCanciones[index] = {id,...cancion}
  setCanciones(listaCanciones)
}

const deleteCancion = (id) => {
  const listaCanciones = getCanciones()
  const index = listaCanciones.findIndex((c) => c.id === id)
  listaCanciones.splice(index,1)
  setCanciones(listaCanciones)

}

module.exports = {
  createCancion,
  getCanciones,
  updateCancion,
  deleteCancion
}
