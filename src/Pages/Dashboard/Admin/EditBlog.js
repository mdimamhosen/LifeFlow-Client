import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useUserInfo from "../../../Hooks/useUserInfo";
import { axiosOpen } from "../../../Hooks/useAxiosCommon";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import useBlog from "../../../Hooks/useBlogs";
import Spiner from "../../../Components/Spiner";

// image hosting api
const img_hosting_key = process.env.REACT_APP_IMG_BB;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const EditBlog = () => {
  const { id } = useParams();
  const [blogs, refetch] = useBlog();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [userInfo] = useUserInfo();
  console.log(userInfo?.email);

  useEffect(() => {
    const fetchedBlog = blogs.find((blog) => blog._id === id);
    setBlog(fetchedBlog);
    setLoading(false);
  }, [id, blogs]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const editorConfig = {
    height: "30vh",
    tabIndex: 1,
  };

  const handleContentChange = (value) => {
    setValue("content", value);
  };
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      let photoUrl = blog.photo;
      if (data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        const res = await axiosOpen.post(img_hosting_api, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        photoUrl = res.data.data.display_url;
      }

      const updatedBlogData = {
        title: data.title || blog.title,
        content: data?.content || blog.content,
        photo: photoUrl,
        status: blog.status,
      };
      console.log(updatedBlogData);

      const blogRes = await axiosSecure.patch(`/blogs/${id}`, updatedBlogData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(blogRes);
      if (blogRes.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Blog Updated!",
          text: "Blog has been updated successfully!",
          confirmButtonText: "Ok!",
        });
        refetch();
        reset();
        navigate("/dashboard/content-management");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setErrorMessage("An error occurred while submitting data.");
      Swal.fire({
        icon: "error",
        title: "Blog Not Updated!",
        text: errorMessage,
        confirmButtonText: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spiner />;

  return (
    <div className="flex min-h-screen justify-center items-center w-screen px-4">
      <div className="flex flex-col border-[3px] -mt-10 rounded-lg py-6 border-red-200 md:container xl:w-[70%] px-4 mx-auto bg-slate-200">
        <Helmet>
          <title>{`LifeFlow | Update Blog`}</title>
        </Helmet>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold pb-2 border-b-[3px] border-red-500 px-4 w-fit">
            Update Blog
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="lg:card-body">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">
                Title
              </span>
            </label>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              defaultValue={blog?.title}
              className="border-2 border-red-300 py-2 px-4 w-full rounded-md outline-none"
            />
            {errors.title && (
              <span className="text-red-300">Title is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">
                Blog Content
              </span>
            </label>
            <JoditEditor
              value={blog?.content}
              config={editorConfig}
              onBlur={(newContent) => handleContentChange(newContent)}
            />
            <input type="hidden" {...register("content")} />
            {errors.content && (
              <span className="text-red-300">Content is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-gray-700 font-semibold">
                Thumbnail Image
              </span>
            </label>
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs rounded-md bg-gray-100"
            />
          </div>
          <div className="form-control w-full pt-4">
            <input
              type="submit"
              value={loading ? "Loading..." : "Update"}
              className="btn bg-red-500 hover:bg-red-700 transition-all duration-300 ease-linear text-xl text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
