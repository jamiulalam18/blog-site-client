import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import UserPostsRow from "../Components/UserPosts/UserPostsRow";
import { Helmet } from "react-helmet";

const UserPosts = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [blogsByAuthor, setBlogsByAuthor] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (loggedInUser?._id) {
      axiosSecure.get(`/blogsByAuthor/${loggedInUser?._id}`).then((res) => {
        setBlogsByAuthor(res.data);
      });
    }
  }, [loggedInUser, axiosSecure]);

  return (
    <div className="py-16 pt-24 max-w-screen-xl mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlogVerse: User Posts</title>
      </Helmet>
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-2xl text-cyan-900 dark:text-cyan-100 font-bold md:text-4xl">
          User Posts
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="dark:text-white">
                <th>Serial Number</th>
                <th>Post Title</th>
                <th>Thumbnail/Category</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogsByAuthor?.map((blog, index) => (
                <UserPostsRow
                  key={index}
                  blog={blog}
                  index={index}
                ></UserPostsRow>
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

export default UserPosts;
