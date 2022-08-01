import React, {useEffect, useState, useContext} from "react";
import { BarChart, Bar, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";
import { db } from "../../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";



function StrategyGraph() {

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


    const stra=[];

    da.forEach((cr, ind)=>{
      const isPre = (e) => e == cr.strategy; 
      var x = stra.findIndex(isPre);
      if (x===-1){
        stra.push(cr.strategy);
        da2.push({
          strategy: cr.strategy,
          pr: ((cr.sell-cr.buy)*cr.quantity),
        });
      }else{
        da2[x].pr = da2[x].pr + ((cr.sell-cr.buy)*cr.quantity);
      }
	  
    })
    setDatas(da2);
    

  }
useEffect(() => {

  
   return()=>{
    getData(); 
   }
  
},[]);



  return (
    <BarChart width={580} height={300} data={datas}>
     <CartesianGrid  strokeDasharray="3 10" />
     <XAxis dataKey="strategy" />
     <YAxis />
     <Tooltip />
   
      <Bar dataKey="pr" fill="#8884d8" />
    </BarChart>
  );
}

export default StrategyGraph;