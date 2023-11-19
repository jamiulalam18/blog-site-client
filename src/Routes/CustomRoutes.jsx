import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignInPage from "../Pages/SignInPage";
import SignUpPage from "../Pages/SignUpPage";
import AllPosts from "../Pages/AllPosts";
import AddPost from "../Pages/AddPost";
import FeaturedPosts from "./../Pages/FeaturedPosts";
import UserProfile from "../Pages/UserProfile";
import UserWishlist from "../Pages/UserWishlist";
import UserPosts from "../Pages/UserPosts";
import PostDetail from './../Pages/PostDetail';
import UpdatePost from './../Pages/UpdatePost';

const CustomRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/signup",
        element: <SignUpPage></SignUpPage>,
      },
      {
        path: "/allPosts",
        element: <AllPosts></AllPosts>,
      },
      {
        path: "/addPost",
        element: <AddPost></AddPost>,
      },
      {
        path: "/featuredPosts",
        element: <FeaturedPosts></FeaturedPosts>,
      },
      {
        path: "userProfile/:id",
        element: <UserProfile></UserProfile>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/users/${params.id}`);
        },
      },
      {
        path: "userPosts/:id",
        element: <UserPosts></UserPosts>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/users/${params.id}`);
        },
      },
      {
        path: "userWishlist/:id",
        element: <UserWishlist></UserWishlist>,
      },
      {
        path: "postDetails/:id",
        element: <PostDetail></PostDetail>,
        loader: ({ params }) => {
          return params.id;
        },
      },
      {
        path: "updatePost/:id",
        element: <UpdatePost></UpdatePost>,
        loader: ({ params }) => {
          return params.id;
        },
      },
    ],
  },
]);

export default CustomRoutes;
