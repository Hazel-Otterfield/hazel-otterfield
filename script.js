document.addEventListener('DOMContentLoaded', function() {
    const postContainer = document.getElementById('blog-posts');

    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "December 14, 2023",
            content: "This is the content of my first blog post. I'm learning to create a blog using JavaScript!"
        },
        {
            title: "My Second Blog Post",
            date: "December 15, 2023",
            content: "This is my second post. Today I learned about arrays in JavaScript!"
        }
        // Add more blog posts here
    ];

    const poetryPosts = [
        {
            title: "My First Poem",
            date: "December 16, 2023",
            lines: [
                "The first line of my poem",
                "The second line, a continuation",
                "A final line to close"
            ]
        },
        // Add more poetry posts here
    ];

    // Function to format the date for sorting
    function formatDateForSort(dateStr) {
        return new Date(dateStr).getTime();
    }

     // Combine and sort the posts
     const combinedPosts = blogPosts.concat(poetryPosts.map(post => ({...post, isPoetry: true})))
     .sort((a, b) => formatDateForSort(a.date) - formatDateForSort(b.date));

    // Function to display posts
    function displayPost(post) {
        let contentHtml = post.isPoetry ? post.lines.join('<br>') : post.content;
        const postHtml = `
            <div class="${post.isPoetry ? 'poetry-post' : 'blog-post'}">
                <h2>${post.title}</h2>
                <p><em>Posted on: ${post.date}</em></p>
                <p>${contentHtml}</p>
            </div>
        `;
        postContainer.innerHTML += postHtml;
    }

    // Display each post
    combinedPosts.forEach(displayPost);
});
