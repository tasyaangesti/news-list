import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export function Home() {
  const [news, setNews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNews = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/home?page=${pageNumber}`
      );
      const data = response.data;
      if (data.length === 0) {
        setHasMore(false);
      }
      setNews((prevNews) => [...prevNews, ...data]);
    } catch (error) {
      console.log(error, ">> error di home");
      setError("failed to load news, please try again later.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <InfiniteScroll
        dataLength={news.length}
        next={() => {
          setPage((prevPage) => prevPage + 1);
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more news</p>}
      >
        <div className="grid grid-cols-3 gap-4 mt-[100px]">
          {news.map((newsItem) => (
            <div
              className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 cursor-pointer"
              key={newsItem.id}
              onClick={() => handleCardClick(newsItem.id)}
            >
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={newsItem.imgUrl}
                  alt={newsItem.title}
                />
                <div className="absolute top-0 right-0 bg-purple-700 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                  {newsItem.category}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {newsItem.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
