import React from "react";
import { Hearts } from "react-loader-spinner";

import { useSelector } from "react-redux";
function Loading(props) {
  const { loading } = useSelector((state) => state.show);
  if (!loading) return;
  return (
    <div className="loader" style={{ display: "flex" }}>
      <Hearts
        height="80"
        width="80"
        color="#B9848C"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
