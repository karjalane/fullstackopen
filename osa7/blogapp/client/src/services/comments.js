import axios from 'axios'
const url = '/api/blogs'

const create = async (comment, id) => {
    const res = await axios.post(`${ url }/${ id }/comments`, { content: comment })
    return res.data
}

export default { create }