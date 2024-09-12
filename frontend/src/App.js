import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/posts/')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', margin: '10px 0', padding: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <h3>User: {post.user}</h3> {/* Display user details */}
              <p><strong>Content:</strong> {post.content}</p>
              <p><strong>Likes:</strong> {post.likes ? post.likes.length : 0}</p> {/* Display number of likes */}
              <p><strong>Posted on:</strong> {new Date(post.timestamp).toLocaleString()}</p> {/* Display timestamp */}
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="Post visual"
                style={{ maxWidth: '200px', height: 'auto', flexShrink: 0 }} // Adjust maxWidth as needed
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;

