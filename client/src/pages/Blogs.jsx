import Card from "@/components/card";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Loader2, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [error, setError] = useState(false);

  async function fetchBlog({ page = 1, pageSize = 10 }) {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_PUBLIC_BACKEND_URL
        }/blog/getBlogs?page=${page}&pageSize=${pageSize}`
      );
      setBlogs(data?.blogs);
      setTotalBlogs(data?.totalDocuments || 0);
      setPageSize(data?.pageSize || 10);
      setPage(data?.currentPage || 1);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlog({ page: page, pageSize: pageSize });
  }, [page, pageSize]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 size={40} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <TriangleAlert size={100} className="text-rose-900" />
          <h1 className="text-xl">No blog found🥲🥲</h1>
        </div>
        <Link to={"/"}>
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto mt-20">
        <h1 className="text-center text-3xl 2xl:text-4xl font-bold my-10 md:my-16">
          Explore all our blogs
        </h1>
        {blogs.length != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {blogs.map((i) => (
              <Card
                key={i._id}
                title={i.title}
                slug={i.slug}
                image={i.img}
                id={i._id}
              />
            ))}
          </div>
        ) : (
          <div>No blogs available</div>
        )}
      </div>
      <div className="mb-20 flex w-full items-center justify-center  gap-2">
        <div className="">
          <Button
            variant="ghost"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button>{page}</Button>
          <Button
            variant="ghost"
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(totalBlogs / pageSize)}
          >
            Next
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              {pageSize}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setPageSize(10)}>
              10
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPageSize(20)}>
              20
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPageSize(50)}>
              50
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPageSize(100)}>
              100
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default BlogPage;
