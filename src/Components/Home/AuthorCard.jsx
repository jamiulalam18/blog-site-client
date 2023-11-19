/* eslint-disable react/prop-types */
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const AuthorCard = ({topAuthor}) => {
    const [author, setAuthor] = useState({});
    const axiosSecure = useAxiosSecure();
    const{_id, blogCount}=topAuthor;


    useEffect(() => {
        if (_id) {
          axiosSecure.get(`/getAuthorNameImg/${_id}`).then((res) => {
            setAuthor(res.data);
          });
        }
      }, [axiosSecure, _id]);

    return (
        <div className="space-y-6 mx-4">
            <div className="relative flex flex-col text-gray-700 bg-white dark:bg-midnight_green-400 w-56 rounded-xl bg-clip-border">
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 dark:text-white bg-white shadow-lg h-40 rounded-xl bg-clip-border">
                <img src={author?.image} alt="profile-picture" className="w-full h-full" />
              </div>
              <div className="p-6 text-center">
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
                  {author?.full_name}
                </h4>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 dark:from-pink-400 dark:to-pink-600 bg-clip-text">
                  Senior Journalist
                </p>
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
                  {`${blogCount} blogs published!!!!`}
                </h4>

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
    );
};

export default AuthorCard;