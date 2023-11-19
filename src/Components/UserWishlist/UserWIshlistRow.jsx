/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { Button } from "flowbite-react";
import { successToast } from "../../Toasts/SuccessToast";
import { HiOutlineArrowRight } from "react-icons/hi";
// import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserWIshlistRow = ({ blogId, index }) => {
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const { loggedInUser, user, setLoggedInUser } = useContext(AuthContext);

  const [userWish, setUserWish] = useState([]);

  useEffect(() => {
    setUserWish(loggedInUser.wishlist);
    // console.log(loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    axiosSecure.get(`/blogs/${blogId}`).then((res) => {
      setBlog(res.data);
    });
  }, [axiosSecure, blogId]);
  useEffect(() => {
    if (blog?.author_id) {
      axiosSecure.get(`/getAuthorNameImg/${blog?.author_id}`).then((res) => {
        setAuthor(res.data);
      });
    }
  }, [axiosSecure, blog]);

  const handleRemoveBookmark = () => {
    axiosSecure
      .patch(`/removeFromWishList/${loggedInUser._id}`, { blogId: blog?._id })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          successToast("Post removed from wishlist!!!!");
          axiosSecure
            .get(`usersByEmail/${user?.email}`)
            .then((res) => setLoggedInUser(res.data));
        }
      });
  };

  return (
    <tr>
        <td>{index+1}</td>
        <td>{blog?.post_title}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={author?.image}
                  alt="Avatar"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{author?.full_name}</div>
            </div>
          </div>
        </td>
        <td>
          {blog?.post_category}
          <br />
          {/* <span className="badge badge-ghost badge-sm">
            Desktop Support Technician
          </span> */}
        </td>
        <th>
        <div className="flex items-center gap-2 mt-auto">
            
              <Button onClick={handleRemoveBookmark} outline color="gray">
                Remove from Wishlist
              </Button>
            

            <Link to={`/postDetails/${blog?._id}`}>
              <Button>
                Read Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </th>
      </tr>
  );
};

export default UserWIshlistRow;
