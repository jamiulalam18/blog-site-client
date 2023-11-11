import AddPostForm from "../Components/AddPost/AddPostForm";

const AddPost = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto pt-24">
        <div className="bg-cambridge_blue-800 dark:bg-night text-center rounded-lg py-4">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
            Write New Blog Post
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Please fill up the form and hit the post button below to add new
            blog.
          </p>
        </div>
        <AddPostForm></AddPostForm>
      </div>
    </div>
  );
};

export default AddPost;
