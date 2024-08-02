import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function DetailNews() {
  const { id } = useParams();
  const [detailNews, setDetailNews] = useState(null);

  const fetchDetailNews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/article/${id}`);
      console.log(response.data, ">> response detail news");
      setDetailNews(response.data);
    } catch (error) {
      console.log(error, ">> error di detail news");
    }
  };

  useEffect(() => {
    fetchDetailNews();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <div className="container-detail-page max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3"></div>
          </div>
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold md:text-3xl text-center text-gray-800">
                {detailNews?.title}
              </h2>
            </div>
            <figure>
              <img
                className="w-full object-cover rounded-xl"
                src={detailNews?.imgUrl}
                alt={detailNews?.title}
              />
            </figure>
            <p className="text-lg text-gray-800 text-justify">
              {detailNews?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
