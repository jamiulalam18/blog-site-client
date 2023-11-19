import {
  Button,
  Label,
  Select,
  Textarea,
  TextInput,
  FileInput,
  Checkbox,
} from "flowbite-react";
import { successToast } from "./../../Toasts/SuccessToast";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const { loggedInUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAddPost = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const post_category = form.get("post_category");
    const post_title = form.get("post_title");
    const thumbnailFile = form.get("thumbnailFile");
    const post_pictureFile = form.get("post_pictureFile");
    const short_description = form.get("short_description");
    const main_post = form.get("main_post");
    const post_tags = form.get("post_tags");
    const main_post_Style = form.get("markdown-format");
    const post_tags_arr = post_tags.split(",").map(function (item) {
      return item.trim();
    });
    const author_id = loggedInUser._id;

    let url = "";
    let body = new FormData();
    body.set("key", import.meta.env.VITE_IMGBB_APPID);
    body.append("image", thumbnailFile);
    axios
      .post("https://api.imgbb.com/1/upload", body)
      .then(function (response) {
        url = response.data.data.url;
        const thumbnail = url;
        body.set("key", import.meta.env.VITE_IMGBB_APPID);
        body.append("image", post_pictureFile);
        axios
          .post("https://api.imgbb.com/1/upload", body)
          .then(function (response) {
            url = response.data.data.url;
            const main_img = url;
            const comments = [];

            const new_product = {
              author_id,
              post_category,
              post_title,
              thumbnail,
              main_img,
              short_description,
              main_post,
              main_post_Style,
              post_tags_arr,
              comments,
            };
            console.log(new_product);

            // send data to the server
            axiosSecure.post(`/blogs`, new_product).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                successToast("Blog posted successfully!!");
                navigate(`/userPosts/${loggedInUser._id}`);
              }
            });
            // fetch(
            //   "https://b8a10-brandshop-server-side-jamiulalam18.vercel.app/products",
            //   {
            //     method: "POST",
            //     headers: {
            //       "content-type": "application/json",
            //     },
            //     body: JSON.stringify(new_product),
            //   }
            // )
            //   .then((res) => res.json())
            //   .then((data) => {
            //     console.log(data);
            //     if (data.insertedId) {
            //       successToast("Product inserted successfully!!");
            //     }
            //   });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function auto_grow(e) {
    e.currentTarget.style.height="5px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  }

  return (
    <div className="bg-white dark:bg-myrtle_green-200 flex justify-center w-full rounded-lg">
      <form
        onSubmit={handleAddPost}
        className="flex max-w-md flex-col gap-2 w-full py-4 rounded-lg"
      >
        <div>
          <div className="max-w-md" id="select">
            <div className=" block">
              <Label htmlFor="post_category" value="Select Category" />
            </div>
            <Select id="post_category" name="post_category" required>
              <option>Technology</option>
              <option>Film and Music</option>
              <option>Food</option>
              <option>Review</option>
              <option>Sports</option>
              <option>Travel</option>
              <option>Others</option>
            </Select>
          </div>
        </div>

        <div>
          <div className=" block">
            <Label htmlFor="post_title" value="Post Title" />
          </div>
          <TextInput
            id="post_title"
            name="post_title"
            placeholder="Post Title"
            required
            type="text"
          />
        </div>

        <div id="fileUpload" className="max-w-md">
          <div className="block">
            <Label htmlFor="file" value="Thumbnail Picture" />
          </div>
          <FileInput
            id="thumbnail"
            name="thumbnailFile"
            accept="image/*"
            helperText="A thumbnail is useful to attract readers."
            required
          />
        </div>

        <div id="fileUpload" className="max-w-md">
          <div className="block">
            <Label htmlFor="file" value="Post Picture" />
          </div>
          <FileInput
            id="post_picture"
            name="post_pictureFile"
            accept="image/*"
            required
            // helperText="A thumbnail is useful to attract readers."
          />
        </div>

        <div>
          <div className="max-w-md" id="short_description">
            <div className="block">
              <Label
                htmlFor="short_description"
                value="Post Short Description"
              />
            </div>
            <Textarea
              id="short_description"
              name="short_description"
              placeholder="Write a short description of your post..."
              required
              rows={2}
              onInput={auto_grow}
              className="min-h-16"
            />
          </div>
        </div>

        <div>
          <div className="max-w-md" id="main_post">
            <div className="block">
              <Label htmlFor="main_post" value="Main Text" />
            </div>
            <Textarea
              id="main_post"
              name="main_post"
              placeholder="Write the main text here. You can write in plain text or in markdown text format...."
              required
              rows={4}
              onInput={auto_grow}
              className="min-h-[128px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="markdown-format" name="markdown-format" />
          <Label htmlFor="markdown-format">Markdown Format</Label>
        </div>

        <div>
          <div className=" block">
            <Label htmlFor="post_tags" value="Tags" />
          </div>
          <TextInput
            id="post_tags"
            name="post_tags"
            placeholder="add some keywords separated by commas..."
            required
            type="text"
          />
        </div>

        <Button type="submit">Post Your Blog</Button>
      </form>
    </div>
  );
};

export default AddPostForm;
