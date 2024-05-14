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
import ProtectRoute from "./components/authentication/ProtectRoute";

function App() {
  /*const [token, setToken] = useState(localStorage.getItem("token" || ""));*/
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signIn" element={<Register />} />
        <Route element={<ProtectRoute/>}>
          <Route path="/me" element={<Profile /> } />
          <Route path="/home" element={<Home />} />
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/new" element={<NewBlogPost />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
