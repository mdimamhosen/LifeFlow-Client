import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";
import Pagination from "react-js-pagination";
import Spiner from "../Components/Spiner";
import { axiosOpen } from "../Hooks/useAxiosCommon";

const Blog = () => {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data } = await axiosOpen.get("/blogs");
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, [searchText, filterStatus, refetch]);

  const handleSearch = () => {
    setActivePage(1);
  };

  const getFilteredAndSearchedPosts = () => {
    let filteredPosts = blogs.filter((post) => post.status === "published");

    if (filterStatus !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.status === filterStatus
      );
    }

    if (searchText) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filteredPosts;
  };

  const displayPosts = getFilteredAndSearchedPosts();
  if (isLoading) return <Spiner />;

  return (
    <div className="my-10">
      <Helmet>
        <title>LifeFlow || Blogs</title>
      </Helmet>

      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        All Blogs
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center lg:mx-[200px] mb-6">
        <div className="flex items-center border-2 border-red-500 rounded-lg p-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search…"
            className="bg-transparent outline-none px-2 text-red-500"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch} className="text-red-500">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="px-4 lg:px-20">
        {displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">
              {displayPosts
                .slice(
                  (activePage - 1) * itemsPerPage,
                  activePage * itemsPerPage
                )
                .map((post) => (
                  <div
                    key={post._id}
                    className="card w-full bg-white rounded-md shadow-md overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative">
                      <img
                        src={post.photo}
                        className="rounded-md w-full h-40 object-cover"
                        alt="Blog"
                      />
                      {post.status === "published" && (
                        <div className="absolute rounded-lg w-fit bg-black drop-shadow-xl top-[10px] right-[10px] text-green-500 font-bold uppercase text-center flex justify-center items-center p-2 bg-opacity-70">
                          <p className="text-sm">{post.status}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-full mt-2 flex-1 p-4">
                      <h2 className="text-xl font-bold text-red-500">
                        {post.title}
                      </h2>
                      <p
                        className="text-gray-600 overflow-hidden max-h-[3em]"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                      <div className="card-actions justify-start mt-2">
                        <Link to={`/blog/${post._id}`}>
                          <button className="text-red-500 flex items-center">
                            <FaEye className="mr-1" />
                            View Blog
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={displayPosts.length}
                pageRangeDisplayed={5}
                onChange={(pageNumber) => setActivePage(pageNumber)}
                itemClass="px-3 flex py-2 border rounded-full mx-1 cursor-pointer"
                activeClass="bg-red-500 text-white"
                linkClass="no-underline text-red-500"
                activeLinkClass="no-underline text-white"
                innerClass="flex justify-center space-x-2"
              />
            </div>
          </>
        ) : (
          <div className="text-center text-2xl mt-6">
            No blogs available right now.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
