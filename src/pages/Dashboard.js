import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  // const { allDriverLocation } = useContext(AuthContext); // Access socket data from context
  const userData = useSelector((state) => state.profile);
  return (
    <div>
      <center>
        <h1>Hi, {userData.name}</h1>
        {/* Display real-time data */}
        {/* <div>
          <h3>Real-Time Data:</h3>
          {socketData ? (
            <pre>{JSON.stringify(socketData, null, 2)}</pre>
          ) : (
            <p>No real-time data available.</p>
          )}
        </div> */}
      </center>
    </div>
  );
};

export default Dashboard;
