document.addEventListener('DOMContentLoaded', async function() {
    const postContainer = document.getElementById('all-posts');

    const ENVIRONMENT = 'prod'; // Change to 'prod' for production

    const baseUrl = ENVIRONMENT === 'local' ? 'http://localhost:8080' : 'https://hazel-otterfield.uc.r.appspot.com';


    const blogPosts = [
        {
            title: "My First Blog Post",
            date: "December 14, 2023",
            content: "This is the content of my first blog post. I'm learning to create a blog using JavaScript!"
        }
        // Add more blog posts here
    ];

    // Function to fetch poetry posts from your Node.js server
    async function fetchPoetryPosts() {
        try {
            const response = await fetch(`${baseUrl}/poems`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Could not fetch poems:", error);
            return [];
        }
    }

    // Fetch poetry posts
    const poetryPosts = await fetchPoetryPosts();

    // Convert poetry posts format if necessary
    const formattedPoetryPosts = poetryPosts.map(row => {
        // Assuming row[0] is title, row[1] is date, and row[2] is poem content
        return {
            title: row[2] || "Untitled",
            date: row[3] || "No Date",
            content: row[4] || "Content not available"
        };
    });
    

    // Function to format the date for sorting
    function formatDateForSort(dateStr) {
        return new Date(dateStr).getTime();
    }

     // Combine and sort the posts
     const combinedPosts = blogPosts.concat(formattedPoetryPosts.map(post => ({...post, isPoetry: true})))
     .sort((a, b) => formatDateForSort(a.date) - formatDateForSort(b.date));

    // Function to display posts
    function displayPost(post) {
        const contentHtml = post.isPoetry ? post.content.replace(/\n/g, '<br>') : post.content; // Adjust for poem line breaks
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
