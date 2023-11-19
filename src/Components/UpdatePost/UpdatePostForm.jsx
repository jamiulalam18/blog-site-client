/* eslint-disable react/prop-types */
import {
  Button,
  Label,
  Textarea,
  TextInput,
  FileInput,
  Checkbox,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { successToast } from "../../Toasts/SuccessToast";
import { Navigate } from "react-router-dom";

const UpdatePostForm = ({ post_id }) => {
  const { loggedInUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [blog, setBlog] = useState({});
  const [category, setCategory] = useState("");

  useEffect(() => {
    axiosSecure.get(`/blogs/${post_id}`).then((res) => {
      setBlog(res.data);
      setCategory(res.data.post_category);
    });
  }, [axiosSecure, post_id]);

  function auto_grow(e) {
    e.currentTarget.style.height = "5px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    console.log(category);
  }

  const handleUpdatePost = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const post_category = category;
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
    const _id = blog?._id;

    if (thumbnailFile.name) {
      console.log(thumbnailFile.name);
      let url = "";
      let body = new FormData();
      body.set("key", import.meta.env.VITE_IMGBB_APPID);
      body.append("image", thumbnailFile);
      axios
        .post("https://api.imgbb.com/1/upload", body)
        .then(function (response) {
          url = response.data.data.url;
          const thumbnail = url;

          if (post_pictureFile.name) {
            console.log(post_pictureFile.name);
            body.set("key", import.meta.env.VITE_IMGBB_APPID);
            body.append("image", post_pictureFile);
            axios
              .post("https://api.imgbb.com/1/upload", body)
              .then(function (response) {
                url = response.data.data.url;
                const main_img = url;

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
                };
                console.log(new_product);

                // send data to the server
                axiosSecure.patch(`/blogs/${_id}`, new_product).then((res) => {
                  console.log(res.data);
                  if (res.data.modifiedCount > 0) {
                    successToast("Blog posted successfully!!");
                    Navigate(`/userPosts/${loggedInUser._id}`);
                  }
                });
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            const main_img = blog?.main_img;
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
            };
            console.log(new_product);
            // send data to the server
            axiosSecure.patch(`/blogs/${_id}`, new_product).then((res) => {
              console.log(res.data);
              if (res.data.modifiedCount > 0) {
                successToast("Blog posted successfully!!");
                Navigate(`/userPosts/${loggedInUser._id}`);
              }
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (post_pictureFile.name) {
      const thumbnail = blog?.thumbnail;
      console.log(post_pictureFile.name);
      let url = "";
      let body = new FormData();
      body.set("key", import.meta.env.VITE_IMGBB_APPID);
      body.append("image", post_pictureFile);
      axios
        .post("https://api.imgbb.com/1/upload", body)
        .then(function (response) {
          url = response.data.data.url;
          const main_img = url;

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
          };
          console.log(new_product);

          // send data to the server
          axiosSecure.patch(`/blogs/${_id}`, new_product).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              successToast("Blog posted successfully!!");
              Navigate(`/userPosts/${loggedInUser._id}`);
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      const thumbnail = blog?.thumbnail;
      const main_img = blog?.main_img;
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
      };
      console.log(new_product);

      // send data to the server
      axiosSecure.patch(`/blogs/${_id}`, new_product).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          successToast("Blog posted successfully!!");
          Navigate(`/userPosts/${loggedInUser._id}`);
        }
      });
    }

    // let url = "";
    // let body = new FormData();
    // body.set("key", import.meta.env.VITE_IMGBB_APPID);
    // body.append("image", thumbnailFile);
    // axios
    //   .post("https://api.imgbb.com/1/upload", body)
    //   .then(function (response) {
    //     url = response.data.data.url;
    //     const thumbnail = url;
    //     body.set("key", import.meta.env.VITE_IMGBB_APPID);
    //     body.append("image", post_pictureFile);
    //     axios
    //       .post("https://api.imgbb.com/1/upload", body)
    //       .then(function (response) {
    //         url = response.data.data.url;
    //         const main_img = url;
    //         const comments = [];

    //         const new_product = {
    //           author_id,
    //           post_category,
    //           post_title,
    //           thumbnail,
    //           main_img,
    //           short_description,
    //           main_post,
    //           main_post_Style,
    //           post_tags_arr,
    //           comments,
    //         };
    //         console.log(new_product);

    //         // send data to the server
    //         axiosSecure.post(`/blogs`, new_product).then((res) => {
    //           console.log(res.data);
    //           if (res.data.insertedId) {
    //             successToast("Blog posted successfully!!");
    //             Navigate(`/userPosts/${loggedInUser._id}`);
    //           }
    //         });
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <div className="bg-white dark:bg-myrtle_green-200 flex justify-center w-full rounded-lg">
      <form
        onSubmit={handleUpdatePost}
        className="flex max-w-md flex-col gap-2 w-full py-4 rounded-lg"
      >
        <h2 className="text-2xl">{`Category: ${category}`}</h2>
        {/* <div>
          <div className="max-w-md" id="select">
            <div className=" block">
              <Label htmlFor="post_category" value="Select Category" />
            </div>
            <Select
              id="post_category"
              name="post_category"
              required
              defaultValue={category}
            >
              <option>Technology</option>
              <option>Film and Music</option>
              <option>Food</option>
              <option>Review</option>
              <option>Sports</option>
              <option>Travel</option>
              <option>Others</option>
            </Select>
          </div>
        </div> */}

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
            defaultValue={blog?.post_title}
          />
        </div>

        <div id="fileUpload" className="max-w-md">
          <div className="block">
            <Label htmlFor="file" value="Thumbnail Picture: " />
            <a
              href={blog?.thumbnail}
              rel="noreferrer"
              target="_blank"
              className="underline"
            >
              &nbsp;{blog?.thumbnail}
            </a>
          </div>
          <FileInput
            id="thumbnail"
            name="thumbnailFile"
            accept="image/*"
            helperText="A thumbnail is useful to attract readers."
          />
        </div>

        <div id="fileUpload" className="max-w-md">
          <div className="block">
            <Label htmlFor="file" value="Post Picture: " />
            <a
              href={blog?.main_img}
              rel="noreferrer"
              target="_blank"
              className="underline"
            >
              &nbsp;{blog?.main_img}
            </a>
          </div>
          <FileInput
            id="post_picture"
            name="post_pictureFile"
            accept="image/*"

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
              defaultValue={blog?.short_description}
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
              defaultValue={blog?.main_post}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="markdown-format"
            name="markdown-format"
            defaultChecked={blog?.main_post_Style}
          />
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
            defaultValue={blog?.post_tags_arr?.join(", ")}
          />
        </div>

        <Button type="submit">Update Your Blog</Button>
      </form>
    </div>
  );
};

export default UpdatePostForm;
