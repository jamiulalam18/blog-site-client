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
import PostDetail from "./../Pages/PostDetail";
import UpdatePost from "./../Pages/UpdatePost";
import PrivateRoute from "./../PrivateRoute/PrivateRoute";

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
        element: (
          <PrivateRoute>
            <AllPosts></AllPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "/addPost",
        element: (
          <PrivateRoute>
            <AddPost></AddPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/featuredPosts",
        element: (
          <PrivateRoute>
            <FeaturedPosts></FeaturedPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "userProfile/:id",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        )
      },
      {
        path: "userPosts/:id",
        element: (
          <PrivateRoute>
            <UserPosts></UserPosts>
          </PrivateRoute>
        )
      },
      {
        path: "userWishlist/:id",
        element: (
          <PrivateRoute>
            <UserWishlist></UserWishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "postDetails/:id",
        element: (
          <PrivateRoute>
            <PostDetail></PostDetail>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return params.id;
        },
      },
      {
        path: "updatePost/:id",
        element: (
          <PrivateRoute>
            <UpdatePost></UpdatePost>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return params.id;
        },
      },
    ],
  },
]);

export default CustomRoutes;
