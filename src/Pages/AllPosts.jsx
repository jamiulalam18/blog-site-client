import { Pagination, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { Label, Select } from "flowbite-react";
import PostCard from "../Components/AllPosts/PostCard";
import { AiOutlineFileSearch } from "react-icons/ai";
const AllPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [count, setCount] = useState(0);
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);
  const axiosSecure = useAxiosSecure();

  const [blogType, setBlogType] = useState("All");
  const [searchData, setSearchData]= useState("");

  useEffect(() => {
    axiosSecure.get(`/blogsCount?filter=${blogType}&search=${searchData}`).then((res) => {
      setCount(res.data.count);
    });
  }, [axiosSecure, blogType,searchData]);

//   useEffect(() => {
//     axiosSecure
//       .get(
//         `/blogsByPage?page=${
//           currentPage - 1
//         }&size=${itemsPerPage}&filter=${blogType}`
//       )
//       .then((res) => {
//         setBlogs(res.data);
//       });
//   }, [currentPage, itemsPerPage, axiosSecure, blogType]);

  useEffect(() => {
    axiosSecure
      .get(
        `/blogsByPage?page=${
          currentPage - 1
        }&size=${itemsPerPage}&filter=${blogType}&search=${searchData}`
      )
      .then((res) => {
        setBlogs(res.data);
      });
  }, [currentPage, itemsPerPage, axiosSecure, blogType, searchData]);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    const val = e.target.value;
    setBlogType(val);
    setCurrentPage(1);
  };

  const handleSearch =(e)=>{
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchText = form.get("searchText");
    setSearchData(searchText);
    // document.getElementById("searchForm").reset();
    setCurrentPage(1);
  }
  const handleSearchOnChange =(e)=>{
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const searchText = form.get("searchText");
    setSearchData(searchText);
    setCurrentPage(1);

  }

  return (
    <div className="max-w-screen-xl mx-auto pt-28 flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row w-full items-center gap-4 justify-end lg:px-5">
        <form action="submit" id="searchForm" onChange={handleSearchOnChange} onSubmit={handleSearch} className="flex flex-1">
          <TextInput
            id="searchText"
            type="text"
            name="searchText"
            icon={AiOutlineFileSearch}
            placeholder="Search by title or tag"
            required
            className="w-full"
          />
          <Button type="submit">
            Search <AiOutlineFileSearch className="ml-2 h-5 w-5" />
          </Button>
        </form>
        <div className="flex items-center">
          <div className="block text-2xl">
            <Label className="text-xl" htmlFor="filter" value="Filter By Category:" />
          </div>
          <Select className="" id="filter" value={blogType} onChange={handleFilter} required>
            <option>All</option>
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
      <div className="lg:px-5 mt-4">
        {blogs.map((blog) => (
          <PostCard key={blog._id} blog={blog}></PostCard>
        ))}
      </div>
      <div className="max-w-md flex mx-auto items-center gap-2 justify-center">
        <div className="block">
          <Label htmlFor="numberOfBlogs" value="Blogs Per Page:" />
        </div>
        <Select
          id="numberOfBlogs"
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          required
        >
          <option>2</option>
          <option>3</option>
          <option>5</option>
          <option>10</option>
        </Select>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default AllPosts;
