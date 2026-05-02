import { useEffect, useState } from "react";

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default function PostList() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    fetchPosts()
      .then((posts) => setState({ status: "success", posts }))
      .catch((err) => setState({ status: "error", message: err.message }));
  }, []);

  if (state.status === "loading") {
    return <p>Loading...</p>;
  }

  if (state.status === "error") {
    return <p>Error: {state.message}</p>;
  }

  if (state.posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <ul>
      {state.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
