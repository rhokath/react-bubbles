import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
//  export const getData = () => {
//   axiosWithAuth()
//   .get("http://localhost:5000/api/colors")
//   .then(res => {
//       console.log(res)
//       setColorList(res.data)
      
//      })
//   .catch(err => console.log(err))

// }

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const getData = () => {
    axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then(res => {
        console.log(res)
        setColorList(res.data)
        
       })
    .catch(err => console.log(err))

  }
  useEffect(()=> {
    getData()

  }, [])

  return (
    <>
      <h1>bubble page!</h1>
      <ColorList colors={colorList}  getData={getData }updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
