import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import FeaturedPostRow from "../Components/FeaturedPosts/FeaturedPostRow";
import { Helmet } from "react-helmet";

const FeaturedPosts = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    error,
    data: featuredBlogs,
  } = useQuery({
    queryKey: ["featuredBlogs"],
    // queryFn: async () => {
    //   const res = await fetch("http://localhost:5000/users");
    //   return res.json();
    // },
    queryFn: () => axiosSecure.get(`/featuredBlogs`).then((res) => res.data),
  });
  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="py-16 pt-24 max-w-screen-xl mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlogVerse: Featured Posts</title>
      </Helmet>
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-2xl text-cyan-900 dark:text-cyan-100 font-bold md:text-4xl">
          Featured Posts
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="dark:text-white">
                <th>Serial Number</th>
                <th>Post Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {featuredBlogs.map((featuredBlog, index) => (
              <FeaturedPostRow key={index} featuredBlog={featuredBlog} index={index}></FeaturedPostRow>
            ))}
            </tbody>
            {/* foot */}
            {/* <tfoot>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot> */}
          </table>
        </div>

        {/* {featuredBlogs?.map((featuredBlog) => (
          <h2 key={featuredBlog?._id}>{featuredBlog?.post_title}</h2>
        ))} */}
      </div>
    </div>
  );
};

export default FeaturedPosts;
