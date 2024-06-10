import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import {
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaEye,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useUserInfo from "../../../Hooks/useUserInfo";
import Spiner from "../../../Components/Spiner";
import { Helmet } from "react-helmet-async";
import useBlog from "../../../Hooks/useBlogs";

const ContentManagement = () => {
  const [userInfo] = useUserInfo();
  console.log(userInfo);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;

  const [blogs, refetch, isLoading] = useBlog();

  useEffect(() => {
    setPosts(blogs);
  }, [blogs]);

  const handleSearch = () => {
    setActivePage(1);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event?.target?.value);
    setActivePage(1);
  };

  const getFilteredAndSearchedPosts = () => {
    let filteredPosts = posts;
    if (filterStatus !== "all") {
      filteredPosts = posts.filter((post) => post.status === filterStatus);
    }
    if (searchText) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return filteredPosts;
  };

  const displayPosts = getFilteredAndSearchedPosts();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/blogs/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "This Blog has been deleted.", "success");
              setPosts(posts.filter((post) => post._id !== id));
            }
          });
      }
    });
  };

  const handlePublish = async (id) => {
    try {
      const result = await axiosSecure.patch(
        `/blogs/${id}`,
        {
          status: "published",
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.modifiedCount > 0) {
        Swal.fire("Published!", "Blog is successfully published!", "success");
        setPosts(
          posts.map((post) =>
            post._id === id ? { ...post, status: "published" } : post
          )
        );
      }
    } catch (error) {
      Swal.fire("Failed!", "Failed to publish", "error");
    }
  };

  const handleUnPublish = async (id) => {
    try {
      const result = await axiosSecure.patch(
        `/blogs/${id}`,
        {
          status: "draft",
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (result.data.modifiedCount > 0) {
        Swal.fire(
          "Unpublished!",
          "Blog is successfully unpublished!",
          "success"
        );
        setPosts(
          posts.map((post) =>
            post._id === id ? { ...post, status: "draft" } : post
          )
        );
      }
    } catch (error) {
      Swal.fire("Failed!", "Failed to unpublish", "error");
    }
  };

  const handleEdit = (id) => {
    console.log(`Requested to edit this id: ${id}`);
  };

  return (
    <div className="pb-12 mx-auto overflow-x-hidden">
      <Helmet>
        <title>LifeFlow | Content Management</title>
      </Helmet>
      <h1 className="text-3xl font-bold border-b-2 border-red-500 mb-6 w-fit text-center mx-auto">
        Content Management
      </h1>
      <div className="flex justify-center mb-4">
        <div className="flex justify-end mx-6 block lg:hidden">
          <Link to="/dashboard/content-management/add-blog">
            <button className="border-2 border-red-500 py-2 px-8 rounded-lg text-red-500 font-bold flex items-center">
              <FaPlus className="mr-2" /> Add Blog
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center lg:mx-[200px]">
        {/* SearchBar */}
        <div className="flex items-center border-2 border-red-500 rounded-lg p-2">
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

        <div className="flex items-center gap-4 bg-red-500 px-8 py-2 rounded-lg h-12 md:w-auto mx-6 mt-4 md:mt-0">
          <label htmlFor="statusFilter" className="text-white font-semibold">
            Filter by Status:
          </label>
          <select
            className="rounded-lg outline-none"
            id="statusFilter"
            onChange={handleFilterChange}
            value={filterStatus}
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        {(userInfo?.role === "Admin" || userInfo?.role === "Volunteer") && (
          <div className="flex justify-end mx-6  lg:block">
            <Link to="/dashboard/content-management/add-blog">
              <button className="border-2 border-red-500 py-2 px-8 rounded-lg text-red-500 font-bold flex items-center">
                <FaPlus className="mr-2" /> Add Blog
              </button>
            </Link>
          </div>
        )}
      </div>
      {isLoading ? (
        <Spiner />
      ) : displayPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 container px-4 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4  justify-items-center   mt-4">
            {displayPosts
              .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
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
                      <Link to={`viewBlog/${post._id}`}>
                        <button className="text-red-500 flex items-center">
                          <FaEye className="mr-1" />
                          View Blog
                        </button>
                      </Link>
                    </div>
                    <div className="actions mt-4">
                      {userInfo?.role === "Admin" ? (
                        <div className="flex justify-between items-center">
                          {post.status === "draft" ? (
                            <button
                              onClick={() => handlePublish(post._id)}
                              className="bg-green-500 py-1 px-3 text-white font-semibold rounded-lg flex items-center"
                            >
                              <FaSave className="mr-1" />
                              Publish
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnPublish(post._id)}
                              className="bg-yellow-500 py-1 px-3 text-white font-semibold rounded-lg flex items-center"
                            >
                              <FaTimes className="mr-1" />
                              Unpublish
                            </button>
                          )}
                          <NavLink
                            to={`/dashboard/content-management/edit-blog/${post._id}`}
                            className="bg-blue-500 py-1 px-3 text-white font-semibold rounded-lg flex items-center"
                          >
                            <FaEdit className="mr-1" />
                            Edit
                          </NavLink>
                          {userInfo?.role === "Admin" && (
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="bg-red-500 py-1 px-3 text-white font-semibold rounded-lg flex items-center"
                            >
                              <FaTrashAlt className="mr-1" />
                              Delete
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-red-500 font-bold">
                          Not authorized to take actions
                        </div>
                      )}
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
        <Spiner />
      )}
    </div>
  );
};

export default ContentManagement;
