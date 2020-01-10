const commentsRouter = require('express').Router()
const blogsRouter = require('./blogs')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.post('/:id/comments', async (req, res, next) => {
    const body = req.body
    console.log(body)
    try {
        const id = req.params.id
        const comment = new Comment({
            content: body.content,
            blog: id
        })
        const savedComment = await comment.save()

        const targetBlog = await Blog.findById(id)
        targetBlog.comments = targetBlog.comments.concat(savedComment._id)
        await targetBlog.save()
        res.status(201).json(savedComment.toJSON())
    } catch (exp) {
        next(exp)
    }
})

module.exports = commentsRouter