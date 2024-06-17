import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fileService from "../appwrite/file.service";

function PostCard({ $id, title, featuredImage }) {

  const [image, setImage] = useState()
  useEffect(() => {
    fileService.getFilePreview(featuredImage)
    .then((res) => {setImage(res)})
  }, [])
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          <img
            src={image}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
