import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Markdown from "react-markdown";
import "./../../src/styles/PostDetail.css";
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Modal } from "flowbite-react";

import { Button } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const PostDetail = () => {
  const post_id = useLoaderData();
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const axiosSecure = useAxiosSecure();
  const [styleMain, setStyleMain] = useState(false);
  const { loggedInUser } = useContext(AuthContext);


  useEffect(() => {
    axiosSecure.get(`/blogs/${post_id}`).then((res) => {
      setBlog(res.data);
      if (res.data.main_post_Style === "on") {
        setStyleMain(true);
      }
    });
  }, [axiosSecure, post_id]);
  useEffect(() => {
    if (blog?.author_id) {
      axiosSecure.get(`/getAuthorNameImg/${blog?.author_id}`).then((res) => {
        setAuthor(res.data);
      });
    }
  }, [axiosSecure, blog]);

  if (blog?.timePosted) {
    var timeISOString = blog.timePosted;

    var time = new Date(timeISOString).toString().substring(0, 25);
  }

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 bg-cambridge_blue-900 dark:bg-gray-800 dark:text-gray-50 pt-32 md:pt-24 ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlogVerse: Details</title>
      </Helmet>
      <div className="w-full mx-auto space-y-4 text-center">
        <p className="text-xs font-semibold uppercase">{blog?.post_category}</p>
        <h1 className="text-4xl font-bold md:text-5xl">{blog?.post_title}</h1>
        <p className="text-sm dark:text-gray-400">
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
      </div>
      {loggedInUser?._id===blog?.author_id ? (<div className="flex justify-end">
        <Link to={`/updatePost/${blog?._id}`}>
          <Button gradientMonochrome="pink">
            <FaEdit className="mr-2 h-5 w-5" />
            Edit Post
          </Button>
        </Link>
      </div>):<></>}
      

      <img src={blog?.main_img} className="w-full mb-4"></img>
      {styleMain ? (
        <div className="dark:text-gray-100" id="main-text">
          <Markdown>{blog?.main_post}</Markdown>
        </div>
      ) : (
        <div className="dark:text-gray-100">
          <p>{blog?.main_post}</p>
        </div>
      )}

      <div
        className="pt-12 border-t dark:border-gray-700 hover:cursor-pointer"
        onClick={() => setOpenModal(true)}
      >
        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
          <img
            src={author?.image}
            alt=""
            className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
          />
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{author?.full_name}</h4>
            <p className="dark:text-gray-400">Senior Journalist</p>
          </div>
        </div>
        <div className="flex justify-center pt-4 space-x-4 align-center">
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
    </article>
  );
};

export default PostDetail;
