import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SelectBtn, RTE } from "../index";
import dataBaseService from "../../appwrite/config.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.service";
import fileService from "../../appwrite/file.service";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post.slug || "",
        content: post.content || "",
        status: post.status || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const image = data.image[0]
        ? await fileService.uploadFile(data.image[0])
        : null;

      if (image) {
        await fileService.deleteFile(post.featuredImage);
      }

      const dbPost = await fileService.updateFile(post.$id, {
        ...post,
        featuredImage: image ? image.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await fileService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
       const dbPost = await dataBaseService.createPost({ ...data, userId: userData.$id });

       if(dbPost){
        navigate(`/post/${dbPost.$id}`)
       }
      }
    }
  };
  return <div className="text-white bg-black">white</div>;
}

export default PostForm;
