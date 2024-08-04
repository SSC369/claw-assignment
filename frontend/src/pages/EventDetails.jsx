import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TbEditCircle } from "react-icons/tb";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import host from "../host";
import Loader from "../components/loader/Loader";
import Weather from "../components/Weather/Weather";

const EventDetails = () => {
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const eToken = sessionStorage.getItem("eToken");
  const navigate = useNavigate();
  const { eventId } = useParams();

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const url = host + "/event/" + eventId;
      const res = await axios.get(url, {
        headers: {
          "auth-token": eToken,
        },
      });
      if (res.status === 200) {
        setEventDetails(res.data.event);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEventDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{ minHeight: "calc(100dvh - 60px)" }}
        className=" min-h-dvh flex flex-col items-center bg-gray-100 dark:bg-gray-800"
      >
        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader />
          </div>
        ) : (
          //details
          <div className="w-[80%] flex flex-col items-center">
            <div className="flex flex-col gap-3 w-[80%] mt-5">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="text-2xl md:text-5xl font-semibold text-gray-800 dark:text-gray-100">
                  {eventDetails.name}
                </h3>

                <div
                  onClick={() => navigate("/edit-event/" + eventId)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <p className="text-dark dark:text-slate-300 text-sm md:text-xl mt-1">
                    Edit
                  </p>
                  <TbEditCircle className=" text-black dark:text-white text-xl md:text-2xl" />
                </div>
              </div>

              <p className=" text-sm text-gray-600 dark:text-gray-300 mt-3 md:text-lg">
                {eventDetails.description}
              </p>

              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600 dark:text-white font-semibold">
                  Date:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {dayjs(eventDetails.date).format("MMM D, YYYY")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-600 dark:text-white">
                  Location:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {eventDetails.location}
                </p>
              </div>
            </div>

            <div className="w-[80%]">
              <h1 className="font-semibold dark:text-white text-black mt-[40px] border-b-2 border-red-500 w-fit">
                Weather Details
              </h1>
              <Weather location={eventDetails.location} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetails;
