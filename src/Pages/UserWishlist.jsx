import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import UserWIshlistRow from "../Components/UserWishlist/UserWIshlistRow";
import { Helmet } from "react-helmet";

const UserWishlist = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    setBlogList(loggedInUser?.wishlist);
  }, [loggedInUser]);

  return (
    <div className="py-16 pt-24 max-w-screen-xl mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlogVerse: Wishlist</title>
      </Helmet>
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-2xl text-cyan-900 dark:text-cyan-100 font-bold md:text-4xl">
          User Wishlist
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
              {blogList?.map((blogId, index) => (
                <UserWIshlistRow
                  key={index}
                  blogId={blogId}
                  index={index}
                ></UserWIshlistRow>
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

export default UserWishlist;
