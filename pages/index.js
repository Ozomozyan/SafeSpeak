import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ problem: '', category: '' });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert('Your post was submitted anonymously!');
      setFormData({ problem: '', category: '' });
      const newPost = await res.json();
      setPosts([...posts, newPost]);
    }
  };

  return (
    <div>
      <h1>Speak about your problem anonymously</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your problem"
          value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category (e.g., mental health, academic)"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Recent Posts</h2>
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <p>{post.problem}</p>
              <small>Category: {post.category}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
