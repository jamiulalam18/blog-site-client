/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Badge, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const BannerCard = ({ choice }) => {
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState([]);
  const [time, setTime] = useState("");
  const [author, setAuthor] = useState({});
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

  const handleAddToBookmark = () => {
    console.log("Add to Bookmark");
  };
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-2">
      <div
        className="h-48 lg:h-auto lg:w-80 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
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
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={author?.image}
            alt="Avatar"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none font-bold">
              {author?.full_name}
            </p>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button onClick={handleAddToBookmark} outline color="gray">
            <BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
            Add to Wishlist
          </Button>
          <Link to={`/postDetails/${blog._id}`}>
            <Button>
              Read Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
