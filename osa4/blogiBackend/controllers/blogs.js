const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res, next) => {

    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            res.json(blog.toJSON())
        } else {
            res.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (req, res, next) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    })

    try {
        const savedBlog = await blog.save()
        res.json(savedBlog.toJSON())
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (req, res, next) => {

    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter