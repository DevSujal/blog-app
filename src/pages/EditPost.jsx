import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import dataBaseService from "../appwrite/config.service";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [posts, setPosts] = useState();

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dataBaseService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPosts(post);
          } else {
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [slug, navigate]);
  return posts ? (
    <div className="py-8">
        <Container>
            <PostForm />
        </Container>
    </div>
  ) : null;
}

export default EditPost;
