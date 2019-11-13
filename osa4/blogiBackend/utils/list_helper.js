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
        : blogs.length === 1 ?
            {
                title: blogs[0].title,
                author: blogs[0].author,
                likes: blogs[0].likes
            }
            : blogs.reduce((a, b) => a.likes > b.likes ? a : b)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}