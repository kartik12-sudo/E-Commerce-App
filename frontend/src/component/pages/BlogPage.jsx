import React, { useEffect, useState } from "react";
import "../../style/blog.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const sampleBlogs = [
      {
        id: 1,
        title: "Top 10 Gadgets You Need in 2025",
        date: "August 15, 2025",
        excerpt:
          "From smart home devices to AI-powered assistants, here's our pick of must-have tech in 2025."
      },
      {
        id: 2,
        title: "How to Choose the Right Laptop",
        date: "August 10, 2025",
        excerpt:
          "We break down the specs, brands, and features to help you buy the perfect laptop for your needs."
      },
      {
        id: 3,
        title: "The Future of Wearable Technology",
        date: "August 5, 2025",
        excerpt:
          "Exploring how wearables are evolving beyond fitness tracking to become integral parts of our digital lives."
      },
      {
        id: 4,
        title: "Sustainable Tech: Eco-Friendly Innovations",
        date: "July 28, 2025",
        excerpt:
          "Discover how technology companies are reducing environmental impact with green initiatives."
      }
    ];

    setBlogs(sampleBlogs);
  }, []);

  return (
    <div className="blog-page">
      <h1>Tech Insights Blog</h1>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p className="date">{blog.date}</p>
            <p className="excerpt">{blog.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;