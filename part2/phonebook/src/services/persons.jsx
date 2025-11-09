import axios from 'axios'
const baseUrl = 'http://localhost:3000/persons'

const getAll = () =>
  axios
    .get(baseUrl)
    .then(response => response.data)

const create = newPerosn =>
  axios
    .post(baseUrl, newPerosn)
    .then(response => response.data)

const update = (id, newPerson) =>
  axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then(response => response.data)

const remove = id =>
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)

export default {getAll, create, update, remove}