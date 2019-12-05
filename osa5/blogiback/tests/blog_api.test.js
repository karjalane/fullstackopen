const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('There is at least one blog saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjs = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArr = blogObjs.map(blog => blog.save())
        await Promise.all(promiseArr)
    })

    test('Blog data is returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All blogs are available', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('Blogs id is named id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[1].id).toBeDefined()
        response.body.map(b => expect(b.id).toBeDefined())
        expect(response.body[1]._id).not.toBeDefined()
    })

    test('A specific blog can be found', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(t => t.title)
        expect(titles)
            .toContainEqual('React patterns')
    })

    describe('View a specific blog', () => {

        test('A specific blog can be fetched', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blogToFetch = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToFetch.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(resultBlog.body).toEqual(blogToFetch)
        })

        test('Fails 404 if id dont exist', async () => {
            const validNonExistingId = await helper.nonExistingId()

            await api
                .get(`/api/blogs/${validNonExistingId}`)
                .expect(404)
        })

        test('Fails 400 if invalid id', async () => {
            const invalidID = '5dcx97834bbb65bf5f1udbad'

            await api
                .get(`/api/blogs/${invalidID}`)
                .expect(400)
        })
    })

    describe('Add a new blog', () => {
        beforeEach(async () => {
            await User.deleteMany({})
            const user = new User({ username: 'root', password: 'sekrit' })
            await user.save()

            const newUser = {
                username: 'useri',
                name: 'User Usington',
                password: 'sala1'
            }

            await api
                .post('/api/users')
                .send(newUser)
        })

        test('Succes with valid data', async () => {

            const loggedIn = await api
                .post('/api/login')
                .send({ username: 'useri', password: 'sala1' })

            console.log(loggedIn.body)

            const users = await helper.usersInDb()

            console.log(users[1])

            const newBlog = {
                title: 'Another tech blog',
                author: 'Jylppy',
                url: 'https://wheredowegofromhere.com/',
                likes: 11,
                userId: users[1].id
            }

            console.log(newBlog)

            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer ' + loggedIn.body.token)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

            const titles = blogsAtEnd.map(b => b.title)
            expect(titles)
                .toContainEqual('Another tech blog')
        })

        test('Post with no set likes sets likes to 0', async () => {
            const loggedIn = await api
                .post('/api/login')
                .send({ username: 'useri', password: 'sala1' })

            const users = await helper.usersInDb()

            const newBlog = {
                title: 'Another tech blog',
                author: 'Jylppy',
                url: 'https://wheredowegofromhere.com/',
                userId: users[1].id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer ' + loggedIn.body.token)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd[blogsAtEnd.length-1].likes)
                .toBe(0)

            const titles = blogsAtEnd.map(b => b.title)
            expect(titles)
                .toContainEqual('Another tech blog')
        })

        test('Blog without title and url wont be added', async () => {
            const loggedIn = await api
                .post('/api/login')
                .send({ username: 'useri', password: 'sala1' })

            const users = await helper.usersInDb()

            const newBlog = {
                author: 'Kekkone',
                likes: 5,
                userId: users[1].id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', 'bearer ' + loggedIn.body.token)
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        })
    })

    describe('Delete a blog', () => {

        test('Success 204 if invalid id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length)
                .toBe(helper.initialBlogs.length - 1)

            const titles = blogsAtEnd.map(b => b.title)

            expect(titles).not.toContainEqual(blogToDelete.title)
        })
    })

    describe('Update a blog', () => {

        test('Update likes of a single blog', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdt = blogsAtStart[1]

            await api
                .put(`/api/blogs/${blogToUpdt.id}`)
                .send({
                    likes: 101
                })
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd[1].likes).toBe(101)
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        })
    })

    describe('One initial user in database', () => {
        beforeEach(async () => {
            await User.deleteMany({})
            const user = new User({ username: 'root', password: 'sekrit' })
            await user.save()
        })

        test('Successful user creation', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'user1',
                name: 'User Usington',
                password: 'sala1'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
        })

        test('Unavailable username invicts suitable statuscode and message', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salsasana'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('`username` to be unique')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
        })

        test('Short usernames fail with status code 400', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'u',
                name: 'User Usington',
                password: 'sala1'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('longer username')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
        })

        test('Short passwords fail with status code 400', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'user1',
                name: 'User Usington',
                password: '1'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('longer password')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length)
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})