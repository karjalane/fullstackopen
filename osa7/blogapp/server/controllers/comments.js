const commentsRouter = require('express').Router()
const blogsRouter = require('./blogs')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.post('/:id/comments', async (req, res, next) => {
    const body = req.body
    try {
        const id = req.params.id
        const targetBlog = await Blog.findById(id)

        const comment = new Comment({
            content: body.content,
            blog: targetBlog._id
        })
        const savedComment = await comment.save()

        targetBlog.comments = targetBlog.comments.concat(savedComment._id)
        await targetBlog.save()
        res.status(201).json(savedComment.toJSON())
    } catch (exp) {
        next(exp)
    }
})

module.exports = commentsRouter