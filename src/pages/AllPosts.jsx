import React, { useState, useEffect } from "react";
import dataBaseService from "../appwrite/config.service";
import { Container } from "postcss";
import { PostCard } from "../components";
function AllPosts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    dataBaseService.getAllPost()
    .then((posts) => {
        if(posts){
            setPosts(posts.documents);
        }
    })
    .catch((err) => console.log(err))
  }, []);
  return <div className="w-full py-8">
    <Container>
        <div className="flex flex-wrap">

        {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
            </div>
        ))}
        </div>
    </Container>
  </div>;
}

export default AllPosts;
