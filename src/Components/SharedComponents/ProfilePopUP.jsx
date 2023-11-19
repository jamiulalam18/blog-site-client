/* eslint-disable react/prop-types */
import { ImFacebook2 } from "react-icons/im";
import { FaTwitter, FaInstagramSquare } from "react-icons/fa";
import { Modal } from "flowbite-react";
import { useState } from "react";

const ProfilePopUP = ({ openModal, author }) => {
    const [openModalInside, setOpenModalInside] = useState(openModal);

  function onCloseModal() {
    setOpenModalInside(false);
  }
  return (
    <Modal show={openModalInside} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="relative flex flex-col text-gray-700 bg-white w-96 rounded-xl bg-clip-border">
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg h-80 rounded-xl bg-clip-border">
                <img src={author?.image} alt="profile-picture" className="w-full h-full" />
              </div>
              <div className="p-6 text-center">
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {author?.full_name}
                </h4>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text">
                  Senior Journalist
                </p>
              </div>
              <div className="flex justify-center p-6 pt-2 gap-7">
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
  );
};

export default ProfilePopUP;
