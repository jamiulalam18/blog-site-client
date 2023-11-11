import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    // queryFn: async () => {
    //   const res = await fetch("http://localhost:5000/users");
    //   return res.json();
    // },
    queryFn: () => axiosSecure.get(`/users`).then((res) => res.data),
  });
  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      this is{" "}
      {users.map((user) => (
        <>
          <h2>{user.email}</h2>
          <h2>{user.full_name}</h2>
        </>
      ))}
    </div>
  );
};

export default Users;
