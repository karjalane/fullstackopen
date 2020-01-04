import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const create = async (content) => {
    console.log(content)
    console.log(token)
    const config = {
        headers: { Authorization: token }
    }
    const obj = { ...content, likes: 0 }
    console.log(obj)
    const res = await axios.post(baseUrl, obj, config)
    return res.data
}

const update = async (content) => {
    const config = {
        headers: { Authorization: token }
    }
    const dest = `${ baseUrl }/${ content.id }`
    const res = await axios.put(dest, content, config)
    const ret = {
        ...res.data,
        user: {
            id: content.user.id,
            name: content.user.name,
            username: content.user.username
        }
    }
    return ret
}

const remove = async (content) => {
    const config = {
        headers: { Authorization: token }
    }
    const dest = `${ baseUrl }/${ content.id }`
    const res = await axios.delete(dest, config)
    return res.data
}

export default {
    getAll
    ,create
    ,update
    ,remove
    ,setToken
}