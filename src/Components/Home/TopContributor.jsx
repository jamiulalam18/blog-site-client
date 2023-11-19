import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Marquee from "react-fast-marquee";
import AuthorCard from "./AuthorCard";

const TopContributor = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    error,
    data: topAuthors,
  } = useQuery({
    queryKey: ["topAuthors"],
    // queryFn: async () => {
    //   const res = await fetch("http://localhost:5000/users");
    //   return res.json();
    // },
    queryFn: () => axiosSecure.get(`/topAuthors`).then((res) => res.data),
  });
  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100 dark:from-dark_green-100 dark:to-green-900-950">
      <div className="mb-12 space-y-2 text-center">
        <h2 className="text-2xl text-cyan-900 dark:text-cyan-100 font-bold md:text-4xl">
          Top Contributors
        </h2>
      </div>
      <Marquee>
        {topAuthors?.map((topAuthor) => (
          <AuthorCard key={topAuthor?._id} topAuthor={topAuthor}></AuthorCard>
        ))}
      </Marquee>
    </div>
  );
};

export default TopContributor;
