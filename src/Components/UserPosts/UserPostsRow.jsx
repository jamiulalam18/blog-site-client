/* eslint-disable react/prop-types */
import { Badge, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";


const UserPostsRow = ({blog,index}) => {
    return (
        <tr>
        <td>{index+1}</td>
        <td>{blog?.post_title}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={blog?.thumbnail}
                  alt="thumbnail"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{blog?.post_category}</div>
            </div>
          </div>
        </td>
        <td>
        {blog?.post_tags_arr?.map((tag) => (
              // eslint-disable-next-line react/jsx-key
              <Badge color="gray">{tag}</Badge>
            ))}
        </td>
        <th>
        <div className="flex items-center gap-2 mt-auto">

            <Link to={`/postDetails/${blog?._id}`}>
              <Button>
                Details <HiOutlineArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </th>
      </tr>
    );
};

export default UserPostsRow;