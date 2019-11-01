import axios from 'axios'
const baseURL = "/api/persons"

const requestData = (request) => {
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(baseURL)
    return requestData(request)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return requestData(request)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return requestData(request)
}

const deleteContact = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return requestData(request)
}

export default { getAll, create, update, deleteContact }