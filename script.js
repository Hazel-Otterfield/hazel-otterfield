document.addEventListener('DOMContentLoaded', function() {
    const postContainer = document.getElementById('blog-post');

    const blogPost = {
        title: "My First Blog Post",
        date: "December 14, 2023",
        content: "This is the content of my first blog post. I'm learning to create a blog using JavaScript!"
    };

    const postHtml = `
        <h2>${blogPost.title}</h2>
        <p><em>Posted on: ${blogPost.date}</em></p>
        <p>${blogPost.content}</p>
    `;

    postContainer.innerHTML = postHtml;
});
