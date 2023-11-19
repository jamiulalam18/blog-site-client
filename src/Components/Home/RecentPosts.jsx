import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RecentPostsCard from "./RecentPostsCard";

const RecentPosts = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    error,
    data: recentBlogs,
  } = useQuery({
    queryKey: ["recentBlogs"],
    // queryFn: async () => {
    //   const res = await fetch("http://localhost:5000/users");
    //   return res.json();
    // },
    queryFn: () => axiosSecure.get(`/recentBlogs`).then((res) => res.data),
  });
  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100 dark:from-dark_green-100 dark:to-green-900-950">
      <div className="container m-auto px-6 text-gray-600 dark:text-gray-400 md:px-12 xl:px-6">
        <div className="mb-12 space-y-2 text-center">
          <h2 className="text-2xl text-cyan-900 dark:text-cyan-100 font-bold md:text-4xl">
            Recent Posts
          </h2>
          {/* <p className="lg:w-6/12 lg:mx-auto">
            Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt,
            debitis dolorum officia aliquid explicabo? Excepturi, voluptate?
          </p> */}
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
        {recentBlogs.map((recentBlog) => (
          <RecentPostsCard key={recentBlog._id} recentBlog={recentBlog}></RecentPostsCard>
        ))}
          {/* <div className="p-1 rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl">
            <img
              src="https://tailus.io/sources/blocks/twocards/preview/images/woman.jpg"
              alt="art cover"
              loading="lazy"
              width="1000"
              height="667"
              className="h-56 sm:h-full w-full sm:w-5/12 object-cover object-top rounded-lg transition duration-500 group-hover:rounded-xl"
            />
            <div className="sm:w-7/12 pl-0 p-5">
              <div className="space-y-2">
                <div className="space-y-4">
                  <h4 className="text-2xl font-semibold text-cyan-900">
                    Provident de illo eveniet commodi fuga fugiat laboriosam
                    expedita.
                  </h4>
                  <p className="text-gray-600">
                    Laborum saepe laudantium in, voluptates ex placeat quo harum
                    aliquam totam, doloribus eum impedit atque! Temporibus...
                  </p>
                </div>
                <a
                  href="https://tailus.io"
                  className="block w-max text-cyan-600"
                >
                  Read more
                </a>
              </div>
            </div>
          </div> */}
          {/* <RecentPostsCard></RecentPostsCard> */}
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
