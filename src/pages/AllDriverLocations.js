import React, { useState, useContext } from "react";
import Map from '../components/Map';
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../utils/AuthContext";


function AllDriverLocation() {
  const [mapObject, setMapObject] = useState(null);

  return (
    <>
      <Map setMapObject={setMapObject} />
    </>
  );
}

export default AllDriverLocation;
