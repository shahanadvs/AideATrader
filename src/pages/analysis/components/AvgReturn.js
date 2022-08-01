import React, {useEffect, useState, useContext} from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { db } from "../../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";



function AvgReturn( ) {

  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da = [];
  const da2 = [];

  const getData =  async() => {
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      da.push(doc.data());
    });
    setDatas(da);



    var totR =0;
    da.forEach((cr, ind)=>{
      da2.push({
      sl:ind,
      date: cr.date,
      tR: totR + ((cr.sell-cr.buy)*cr.quantity)
      });
	  totR = totR + ((cr.sell-cr.buy)*cr.quantity)
    })
    setDatas(da2);
    

  }
useEffect(() => {

  
    return()=>{
      getData(); 
    }
  
},[]);
  return (
    <AreaChart
      width={580}
      height={300}
      data={datas}
      margin={{
        top: 10,
        right: 0,
        left: 0,
        bottom: 0
      }}
    ><defs>
     <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="65%" stopColor="#8884d8" stopOpacity={0.8}/>
        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.5}/>
     </linearGradient></defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="tR" stroke="#8884d8" strokeWidth="2px" fill="url(#colorUv)" />
    </AreaChart>
  );
}
export default AvgReturn;