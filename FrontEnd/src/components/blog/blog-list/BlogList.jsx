import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { AuthContext } from "../../../contextProvider/AuthContextProvider";

/*const BlogList = props => {
  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList; */

export default function BlogList() {

  const {token} = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);
  
  const resultBlog = async () => {
    try {
      const response = await fetch("http://localhost:3001/blogPosts/", {
        method:"GET",
        headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}
      });
      if(response.ok) {
        const result = await response.json();
        setBlogs(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    resultBlog();
  }, [blogs]);

  return (
    <Row>
      {blogs.map((blog, i) => (
        <Col key={`item-${i}`} md="4" style={{marginBottom: 50}}>
          <BlogItem key={blog._id} {...blog}/>
        </Col>
      ))}
    </Row>
  )
}
