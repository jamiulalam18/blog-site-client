/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Badge, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { successToast } from "../../Toasts/SuccessToast";
import { AuthContext } from "../../Provider/AuthProvider";

const BannerCard = ({ choice }) => {
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState([]);
  const [time, setTime] = useState("");
  const [author, setAuthor] = useState({});
  const { loggedInUser, user, setLoggedInUser } = useContext(AuthContext);
  const [userWish, setUserWish] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/blogs/${choice}`).then((res) => {
      setBlog(res.data);
    });
  }, [axiosSecure, choice]);

  useEffect(() => {
    if (blog?.timePosted) {
      var timeISOString = blog?.timePosted;

      setTime(new Date(timeISOString).toString().substring(0, 25));
    }
    if (blog?.author_id) {
      axiosSecure.get(`/getAuthorNameImg/${blog?.author_id}`).then((res) => {
        setAuthor(res.data);
        console.log(res.data);
      });
    }
  }, [axiosSecure, blog]);

  useEffect(() => {
    setUserWish(loggedInUser?.wishlist);
  }, [loggedInUser]);

  const handleAddToBookmark = () => {
    axiosSecure
      .patch(`/addToWishList/${loggedInUser._id}`, { blogId: blog?._id })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          successToast("Post saved to wishlist!!!!");
          axiosSecure
            .get(`usersByEmail/${user?.email}`)
            .then((res) => setLoggedInUser(res.data));
        }
      });
  };

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-2">
      <div
        className="h-96 lg:h-auto lg:w-80 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${blog.thumbnail})` }}
        title={blog.post_title}
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white dark:bg-cambridge_blue rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-black font-extrabold mb-2 flex items-center">
            EDITOR&apos;S CHOICE
          </p>
          <div className="flex">
            <Badge color="info">{blog.post_category}</Badge>
          </div>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {blog.post_title}
          </div>
          <p className="text-gray-700 text-base">{blog.short_description}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {blog?.post_tags_arr?.map((tag) => (
              // eslint-disable-next-line react/jsx-key
              <Badge color="gray">{tag}</Badge>
            ))}
          </div>
        </div>
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={author?.image}
            alt="Avatar"
          />
          <div className="text-sm">
            <button className="text-gray-900 leading-none font-bold underline ">
              {author?.full_name}
            </button>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          {user ? (
            <>
              {userWish?.indexOf(blog?._id) !== -1 ||
              loggedInUser?._id === blog?.author_id ? (
                <Button
                  onClick={handleAddToBookmark}
                  disabled
                  outline
                  color="gray"
                >
                  {loggedInUser?._id === blog?.author_id ? (
                    <p>Own Post</p>
                  ) : (
                    <>
                      <BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
                      Added to Wishlist
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={handleAddToBookmark} outline color="gray">
                  <BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
          {/* {(userWish?.indexOf(blog?._id) !== -1 || loggedInUser?._id===blog?.author_id) ? (
              <Button onClick={handleAddToBookmark} disabled outline color="gray">
                
                {loggedInUser?._id===blog?.author_id ? <p>Own Post</p>:(<><BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
                Added to Wishlist</>)}
              </Button>
            ) : (
              <Button onClick={handleAddToBookmark} outline color="gray">
                <BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            )} */}
          <Link to={`/postDetails/${blog._id}`}>
            <Button>
              Read Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="relative flex flex-col text-gray-700 bg-white dark:bg-midnight_green-400 w-96 rounded-xl bg-clip-border">
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 dark:text-white bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                <img
                  src={author?.image}
                  alt="profile-picture"
                  className="w-full h-full"
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
                  {author?.full_name}
                </h4>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 dark:from-pink-400 dark:to-pink-600 bg-clip-text">
                  Senior Journalist
                </p>
              </div>
              <div className="flex justify-center p-6 pt-2 gap-7 dark:text-white">
                <a href="#facebook">
                  <ImFacebook2></ImFacebook2>
                </a>
                <a href="#twitter">
                  <FaTwitter></FaTwitter>
                </a>
                <a href="#instagram">
                  <FaInstagramSquare></FaInstagramSquare>
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BannerCard;
