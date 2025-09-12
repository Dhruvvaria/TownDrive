import React from "react";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      {/* <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-primary "></div> */}
      <img src="/loader.gif" alt="Loading.." className="h-32 md:h-52" />
    </div>
  );
}

export default Loader;
