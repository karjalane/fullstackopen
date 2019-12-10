const blogs = [
    {
        user: {
            name: 'Mario',
            username: 'maario',
            _id: '55'
        },
        title: 'Testblog',
        author: 'Testi-Sami',
        likes: 99,
        url: 'testiblogi.com',
        id: '44'
    },
    {
        user: {
            name: 'Luigi',
            username: 'luiizi',
            _id: '56'
        },
        title: 'Testitestblog',
        author: 'Testi-Pirjo',
        likes: 12,
        url: 'tetetestiblogi.com',
        id: '46'
    },
    {
        user: {
            name: 'Bowser',
            username: 'argggh',
            _id: '57'
        },
        title: 'Testi2test4blog',
        author: 'Testi-Huumori',
        likes: 119,
        url: 'bowwowbloblogi.com',
        id: '48'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const user = {
    name: 'Luigi',
    username: 'luiizi',
    token: '6669998880'
}

let token
const setToken = () => {
    token = `bearer ${ user.token }`
}

export default { getAll, setToken }