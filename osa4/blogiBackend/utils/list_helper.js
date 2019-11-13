const _ = require('lodash')

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0
        : blogs.reduce(function (sum, item) {
            return sum + item.likes
        }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? {}
        : blogs.length === 1
            ? {
                title: blogs[0].title,
                author: blogs[0].author,
                likes: blogs[0].likes
            }
            : blogs.reduce((a, b) => a.likes > b.likes
                ? {
                    title: a.title,
                    author: a.author,
                    likes: a.likes
                }
                : {
                    title: b.title,
                    author: b.author,
                    likes: b.likes
                })
}

const mostBlogs = (blogs) => {
    const byAuthor =
        _.map(
            _.countBy(blogs, 'author'), (value, key) =>
                ({ 'author': key, 'blogs': value }))

    return blogs.length === 0 ? {}
        : blogs.length === 1
            ? byAuthor[0]
            : byAuthor.reduce((a, b) => a.blogs > b.blogs
                ? a
                : b
            )
}

const mostLikes = (blogs) => {
    const authorLikes = _(blogs)
        .groupBy('author')
        .map((obs, key) => {
            return {
                author: key,
                likes: _.sumBy(obs, 'likes')
            }
        })
        .value()

    console.log(authorLikes)

    return blogs.length === 0 ? {}
        : blogs.length === 1
            ? authorLikes[0]
            : authorLikes.reduce((a, b) => a.likes > b.likes
                ? a
                : b
            )
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}