document.addEventListener('DOMContentLoaded', function() {
    const postContainer = document.getElementById('blog-posts');

    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "December 14, 2023",
            content: "This is the content of my first blog post. I'm learning to create a blog using JavaScript!"
        }
        // Add more blog posts here
    ];

    const poetryPosts = [
        {
            title: "Unblinking",
            date: "December 16, 2023",
            lines: [
                "His eyes draw me in,",
                "fringed with lashes as fine as spiders’ silk,",
                "plush as an otter’s coat.",
                "Comparisons of the colors to chocolate",
                "and depth to the fathoms below",
                "ring hollow and cliché.",
                "They sing with the same melody",
                "as the shadows in a redwood forest,",
                "sheltering pockets of mist",
                "and clutches of sweet sorrel.",
                "They harbor something ancient,",
                "yet something untouched by lifetimes lost."
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
