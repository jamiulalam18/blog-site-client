/* eslint-disable react/prop-types */
import { Badge, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Modal } from "flowbite-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { successToast } from "../../Toasts/SuccessToast";

const RecentPostsCard = ({ recentBlog }) => {
  const {
    post_title,
    short_description,
    thumbnail,
    post_category,
    post_tags_arr,
    _id,
    author_id,
    timePosted,
  } = recentBlog;
  const axiosSecure = useAxiosSecure();
  const [author, setAuthor] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { loggedInUser, user, setLoggedInUser } = useContext(AuthContext);
  const [userWish, setUserWish] = useState([]);

  function onCloseModal() {
    setOpenModal(false);
  }
  useEffect(() => {
    setUserWish(loggedInUser.wishlist);
    console.log(loggedInUser);
  }, [loggedInUser]);

  const handleAddToBookmark = () => {
    axiosSecure
      .patch(`/addToWishList/${loggedInUser._id}`, { blogId: _id })
      .then((res) => {
        if (res.data.modifiedCount === 1) {
          successToast("Post saved to wishlist!!!!");
          axiosSecure
            .get(`usersByEmail/${user?.email}`)
            .then((res) => setLoggedInUser(res.data));
        }
      });
  };
  if (timePosted) {
    var timeISOString = timePosted;

    var time = new Date(timeISOString).toString().substring(0, 25);
  }

  useEffect(() => {
    if (author_id) {
      axiosSecure.get(`/getAuthorNameImg/${author_id}`).then((res) => {
        setAuthor(res.data);
      });
    }
  }, [axiosSecure, author_id]);
  return (
    <div className="p-1 rounded-xl h-full group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
      <img
        src={thumbnail}
        alt="art cover"
        loading="lazy"
        width="1000"
        height="667"
        className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl"
      />
      <div className="sm:w-7/12 pl-0 p-5 h-full">
        <div className="flex flex-col gap-2 h-full">
          <div className="space-y-4 flex-grow">
            <div className="flex">
              <Badge color="info">{post_category}</Badge>
            </div>
            <h4 className="text-2xl font-semibold text-cyan-900 dark:text-cyan-100">
              {post_title}
            </h4>
            <p className="text-sm text-gray-400 dark:text-gray-300">
              by&nbsp;
              <button
                onClick={() => setOpenModal(true)}
                className="underline dark:text-violet-400"
              >
                <span itemProp="name">{author?.full_name}</span>
              </button>
              &nbsp;on&nbsp;
              <time dateTime="2021-02-12 15:34:18-0200">{time}</time>
            </p>
            <p className="text-gray-600 dark:text-white">{short_description}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {post_tags_arr.map((tag) => (
                // eslint-disable-next-line react/jsx-key
                <Badge color="gray">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            {user ? (
              <>
                {userWish?.indexOf(_id) !== -1 ||
                loggedInUser?._id === author_id ? (
                  <Button
                    onClick={handleAddToBookmark}
                    disabled
                    outline
                    color="gray"
                  >
                    {loggedInUser?._id === author_id ? (
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

            <Link to={`/postDetails/${_id}`}>
              <Button>
                Read Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
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

export default RecentPostsCard;
