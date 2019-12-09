import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    console.log(newObject)
    console.log(token)
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.post(baseUrl, newObject, config)
    return res.data
}

const update = async (newObject, id) => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return res.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    return res.data
}

export default { 
    getAll
    ,create
    ,update
    ,remove
    ,setToken
}