import { useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useUserInfo from "../../../Hooks/useUserInfo";
import { axiosOpen } from "../../../Hooks/useAxiosCommon";
import { axiosSecure } from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

// image hosting api
const img_hosting_key = process.env.REACT_APP_IMG_BB;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddBlog = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [userInfo, refetch, isLoading] = useUserInfo();
  console.log(userInfo?.email);

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
  const navigate = useNavigate();
  const handleContentChange = (value) => {
    setValue("content", value);
  };

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axiosOpen.post(img_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(res.data.data.display_url);

      // Create blog data
      const blogData = {
        title: data.title,
        content: data.content,
        photo: res.data.data.display_url,
        status: "draft",
      };
      console.log(blogData);

      // Post blog data
      const blogRes = await axiosSecure.post("/blogs", blogData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (blogRes.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Blog Created!",
          text: "New Blog is posted successfully!",
          confirmButtonText: "Ok!",
        });

        // Reset form

        reset();
        navigate("/dashboard/content-management");
      }
    } catch (error) {
      // Handle errors
      console.error("Error submitting data:", error);
      setErrorMessage("An error occurred while submitting data.");
      Swal.fire({
        icon: "error",
        title: "Blog Not Created!",
        text: errorMessage,
        confirmButtonText: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center w-screen px-4 ">
      <div className="flex flex-col border-[3px] -mt-10 rounded-lg py-6 border-red-200 md:container xl:w-[70%] px-4  mx-auto   bg-slate-200 ">
        <Helmet>
          <title>{`LifeFlow | Add Blog`}</title>
        </Helmet>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold pb-2 border-b-[3px] border-red-500 px-4 w-fit">
            Add New Blog
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
              {...register("title", { required: true })}
              className="border-2 border-red-300    py-2 px-4 w-full rounded-md outline-none"
              required
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
              config={editorConfig}
              onBlur={(newContent) => handleContentChange(newContent)}
            />
            <input type="hidden" {...register("content", { required: true })} />
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
              {...register("image", { required: true })}
              required
              type="file"
              className="file-input w-full max-w-xs rounded-md bg-gray-100"
            />
          </div>
          <div className="form-control w-full pt-4 ">
            <input
              type="submit"
              value={loading ? "Loading..." : "Post"}
              className="btn bg-red-500 hover:bg-red-700 transition-all duration-300 ease-linear text-xl text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
