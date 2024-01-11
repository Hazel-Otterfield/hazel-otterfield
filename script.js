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
            content: row[4] || "Content not available",
            type: 'poetry'
        };
    });

    async function fetchBookReviews() {
        try {
            const response = await fetch(`${baseUrl}/bookReviews`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Could not fetch reviews:", error);
            return [];
        }
    }

    const reviewPosts = await fetchBookReviews();

    const formattedReviewPosts = reviewPosts.map(row => {
        return {
            title: row[2] || "Untitled",
            author: row[3] || "Unknown Author",
            date: row[1] || "No Date",
            content: row[7] || "Content not available",
            type: 'review'
        };
    });

    

    // Function to format the date for sorting
    function formatDateForSort(dateStr) {
        return new Date(dateStr).getTime();
    }

     // Combine and sort the posts
     const combinedPosts = [...formattedPoetryPosts, ...formattedReviewPosts].sort((a, b) => formatDateForSort(a.date) - formatDateForSort(b.date));

    // Function to display posts
    function displayPost(post) {
        let contentHtml, postHtml;
        
        if (post.type === 'poetry') {
            contentHtml = post.content.replace(/\n/g, '<br>'); // Format line breaks for poetry
            postHtml = `
                <div class="poetry-post">
                    <h2>${post.title}</h2>
                    <p><em>Posted on: ${post.date}</em></p>
                    <p>${contentHtml}</p>
                </div>
            `;
        } else if (post.type === 'review') {
            contentHtml = post.content.replace(/\n/g, '<br>'); // Replace newlines with <br> tags
            postHtml = `
                <div class="review-post">
                    <h2>${post.title}</h2>
                    <p><strong>Author:</strong> ${post.author}</p>
                    <p><em>Reviewed on: ${post.date}</em></p>
                    <p>${contentHtml}</p>
                </div>
            `;
        }
        
    
        postContainer.innerHTML += postHtml;
    }
    

    // Display each post
    combinedPosts.forEach(displayPost);
});
