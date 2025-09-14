import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickUpLocation, setPickupLocation] = useState("");

  const { pickUpDate, setPickUpDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickUpLocation=" +
        pickUpLocation +
        "&pickUpDate=" +
        pickUpDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center bg-light gap-14 text-center">
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold">
        Luxury cars on rent
      </motion.h1>
      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={handleSearch}
        action=""
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row items-start md-items-center gap-10 min-md:ml-8">
          <div className="flex flex-col items-start gap-2">
            <select
              required
              value={pickUpLocation}
              className="cursor-pointer"
              onChange={(e) => setPickupLocation(e.target.value)}>
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickUpLocation ? pickUpLocation : "Please Select Location"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              value={pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500 cursor-pointer"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              id="return-date"
              className="text-sm text-gray-500 cursor-pointer"
              required
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 1.05 }}
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary text-white rounded-full hover:bg-primary-dull cursor-pointer">
          <img
            src={assets.search_icon}
            alt="Search"
            className="brightness-300"
          />
          Search
        </motion.button>
      </motion.form>
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        src={assets.main_car}
        alt="car"
        className="max-h-74"
      />
    </motion.div>
  );
};

export default Hero;
