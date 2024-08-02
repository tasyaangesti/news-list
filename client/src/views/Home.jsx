import React, { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      console.log(response, ">> response");
      setNews(response.data);
    } catch (error) {
      console.log(error, ">> error di home");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <div className="grid grid-cols-3 gap-4">
        {news.map((newsItem) => (
          <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500">
            <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src={newsItem.imgUrl}
                alt=".."
              />
              <div className="absolute top-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                {newsItem.category}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {newsItem.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
