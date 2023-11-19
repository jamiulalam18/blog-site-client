import { Helmet } from "react-helmet";
import UpdatePostForm from "../Components/UpdatePost/UpdatePostForm";
import { useLoaderData } from "react-router-dom";

const UpdatePost = () => {
  const post_id = useLoaderData();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlogVerse: Update</title>
      </Helmet>
      <div className="max-w-screen-xl mx-auto pt-24">
        <div className="bg-cambridge_blue-800 dark:bg-night text-center rounded-lg py-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
            Update your Blog Post
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Please Edit the form and hit the update button below to update the
            blog.
          </p>
        </div>
        <UpdatePostForm post_id={post_id}></UpdatePostForm>
      </div>
    </div>
  );
};

export default UpdatePost;
