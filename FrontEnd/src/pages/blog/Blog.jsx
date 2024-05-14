import React, { useEffect, useState, useContext } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { AuthContext } from "../../contextProvider/AuthContextProvider";

const Blog = props => {
  const {token} = useContext(AuthContext);
  const [blog, setBlog] = useState({});
 // const [loading, setLoading] = useState(true);
  const params = useParams();
  //const navigate = useNavigate();
  const { _id } = params;

  const singleBlog = async () => {
    try {
      const response = await fetch(`http://localhost:3001/blogPosts/${_id}`, {
        method:"GET",
        headers: {headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"}}
      });
      if(response.ok) {
        const result = await response.json();
        setBlog(result);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
  /*const { id } = params;
    const blog = posts.find(post => post._id.toString() === id);
    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }*/
    singleBlog();
  }, [blog]);

  /*if (loading) {
    return <div>loading</div>;
  } else {} */
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.category}</div>
              <div>{blog.content}</div>
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  
};

export default Blog;
