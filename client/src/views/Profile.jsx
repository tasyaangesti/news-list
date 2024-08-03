import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Profile() {
  const { id } = useParams();
  // console.log(id, ">> id profile");
  const [profile, setProfile] = useState();

  const fetchDetailUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/profile/${id}`);
      console.log(response.data, ">> response detail profile");
      setProfile(response.data);
    } catch (error) {
      console.log(error, ">> error profile");
    }
  };

  useEffect(() => {
    fetchDetailUser();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            className="w-32 rounded-full shadow-lg border-4 border-indigo-400"
            alt="Avatar"
          />

          <h1 className="text-2xl font-semibold mt-4">
            {" "}
            {profile?.firstName} {profile?.lastName}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Email: {profile?.email}
          </p>
          <p className="text-gray-600 text-center mt-2">
            Phone: {profile?.phoneNumber}
          </p>
          <p className="text-gray-600 text-center mt-2">
            Member Since: {formatDate(profile?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
