import React, {useEffect, useState, useContext} from "react";
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";
import { db } from "../../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";



function DailyGraph({data}) {

  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da = data;
  const da2 = [];

  const getData =  () => {
    const days=[];

    da.forEach((cr, ind)=>{
      const isPre = (e) => e == cr.date; 
      var x = days.findIndex(isPre);
      if (x===-1){
        days.push(cr.date);
        da2.push({
          date: cr.date,
          pr: ((cr.sell-cr.buy)*cr.quantity),
        });
      }else{
        da2[x].pr = da2[x].pr + ((cr.sell-cr.buy)*cr.quantity);
      }
	  
    })
    setDatas(da2);
    

  }
useEffect(() => {

  
    getData(); 
  
},[datas]);



  return (
    <BarChart width={580} height={300} data={datas}>
     <CartesianGrid  strokeDasharray="3 10" />
     <XAxis dataKey="date" />
     <YAxis />
     <Tooltip />
   
      <Bar dataKey="pr" fill="#8884d8" />
    </BarChart>
  );
}

export default DailyGraph;