/* eslint-disable react/prop-types */
import { Badge, Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const handleAddToBookmark = () => {
  console.log("Add to Bookmark");
};

const PostCard = ({ blog }) => {
  const {
    post_title,
    short_description,
    thumbnail,
    post_category,
    post_tags_arr,
    _id,
    author_id,
    timePosted,
  } = blog;
  const axiosSecure = useAxiosSecure();
  const [author, setAuthor] = useState({});
  if (timePosted) {
    var timeISOString = timePosted;

    var time = new Date(timeISOString).toString().substring(0, 25);
  }

  useEffect(() => {
    axiosSecure.get(`/getAuthorNameImg/${author_id}`).then((res) => {
      setAuthor(res.data);
    });
  }, [axiosSecure, author_id]);

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mb-2">
      <div
        className="h-48 lg:h-auto lg:w-80 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${thumbnail})` }}
        title={post_title}
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white dark:bg-cambridge_blue rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          {/* <p className="text-sm text-gray-600 flex items-center">
            Members only
          </p> */}
          <div className="flex">
            <Badge color="info">{post_category}</Badge>
          </div>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {post_title}
          </div>
          <p className="text-gray-700 text-base">{short_description}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {post_tags_arr.map((tag) => (
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
            <p className="text-gray-900 leading-none font-bold">{author?.full_name}</p>
            <p className="text-gray-600">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button onClick={handleAddToBookmark} outline color="gray">
            <BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
            Add to Wishlist
          </Button>
          <Link to={`/postDetails/${_id}`}>
            <Button>
              Read Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>

    // <Card className="max-w-sm lg:max-w-none mb-4" imgSrc={thumbnail} horizontal>
    //   <div className="flex">
    //     <Badge color="info">{post_category}</Badge>
    //   </div>
    //   <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //     {post_title}
    //   </h5>

    //   <div className="flex gap-4 items-center">
    //     <h2 className="font-bold">{author}</h2>
    //     <p className="text-sm text-gray-400 dark:text-gray-600">{startTime.toString().substring(0, 25)}</p>
    //   </div>

    //   <p className="font-normal text-gray-700 dark:text-gray-400">
    //     {short_description}
    //   </p>
    //   <div className="flex flex-wrap gap-3">
    //     {post_tags_arr.map((tag) => (
    //       // eslint-disable-next-line react/jsx-key
    //       <Badge color="gray">{tag}</Badge>
    //     ))}
    //   </div>
    //   <div className="flex items-center gap-2">
    //     <Button onClick={handleAddToBookmark} outline color="gray">
    //       <BsFillBookmarkCheckFill className="ml-2 h-5 w-5" />
    //       Add to Wishlist
    //     </Button>
    //     <Link to={`/postDetails/${_id}`}>
    //       <Button>
    //         Read Now <HiOutlineArrowRight className="ml-2 h-5 w-5" />
    //       </Button>
    //     </Link>
    //   </div>
    // </Card>

    // <div className="card lg:card-side bg-base-100 shadow-xl mb-2">
    //     <img
    //     className="w-96 h-96 rounded-l-xl"
    //       src={thumbnail}
    //       alt="Album"
    //     />
    //   <div className="card-body">
    //     <h2 className="card-title">{post_title}</h2>
    //     <p>{short_description}</p>
    //     <div className="card-actions justify-end">
    //       <button className="btn btn-primary">Listen</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PostCard;
