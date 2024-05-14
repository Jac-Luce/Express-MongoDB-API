import React, { useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import NewBlogPost from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Profile from "./pages/login/Profile";
import AuthorList from "./components/author/AuthorList";
import { useContext } from "react";
import AuthContext from "./contextProvider/AuthContextProvider";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token" || ""));
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Login token={token} setToken={setToken}/>} />
        <Route path="/signIn" element={<Register token={token} setToken={setToken}/>} />
        <Route path="/me" element={<Profile token={token} setToken={setToken}/> } />
        <Route path="/home" element={<Home />} />
        <Route path="/authors" element={<AuthorList token={token}/>} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
