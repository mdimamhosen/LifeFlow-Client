import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useUserInfo from "../Hooks/useUserInfo";
import Spiner from "../Components/Spiner";
import useBlog from "../Hooks/useBlogs";

const DetailBlog = () => {
  const [useInfo] = useUserInfo();
  const [blogs] = useBlog();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const indiblog = blogs.find((blog) => blog._id === id);
    setBlog(indiblog);
    setLoading(false);
  }, [id, blogs]);
  console.log(blog);

  if (loading || !blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spiner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <Helmet>
        <title>LifeFlow | Detailed Blog page</title>
      </Helmet>
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          className="w-full h-[60vh] object-cover object-center"
          src={blog.photo}
          alt={blog.title}
        />
        <div className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-red-500 mb-4">{blog.title}</h1>
          <div
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />{" "}
          {useInfo.role === "admin" && (
            <button className="capitalize bg-blue-200 ho border-2 border-blue-600   py-2 px-1 rounded-md font-bold">
              {blog.status === "published" ? "Published" : "Unpublished"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBlog;
