import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight } from 'tabler-icons-react';
import React, {useEffect, useState, useContext} from "react";

import { AreaChart, Area } from "recharts";
import { db } from "../../../firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";

function AvgReturn() {
  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const [av, setAv] = useState(0);
  const [avP, setAvP] = useState(0);
  const da = [];
  const da2 = [];


  const getData = async () => {
    
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      da.push(doc.data());
    });
    setDatas(da);


    var totR =0;

    da.forEach((cr, ind)=>{
      totR = totR + ((cr.sell-cr.buy)*cr.quantity)
      da2.push({
      sl:ind,
      date: cr.date,
      tR: totR,
      aR: totR/(ind+1),
      });
	  
    })
    var f = 0;
    da.forEach((cr, ind)=>{
      if (ind == 0){
        f = ((cr.sell-cr.buy)*cr.quantity);
      }
    })
     setDatas(da2);
     var p = ((totR/da2.length)-f)/100;
     setAvP(p)
      setAv(totR/da2.length)

  }
  useEffect(() => {
    return ()=>{
    getData(); }
    },[]);
    


  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position='apart' py="sm">
            <Stack>
                <Text color="gray">Average Return</Text>
                <Group spacing="xs">
                <Text  size="xl" weight="500" >₹{av}</Text>
                <Text size="md" color={ avP>0 ? "green" : "red"}>
              {av}% { avP > 0? <ArrowUpRight size={12} strokeWidth={2} color={"#4cbf40"} /> : <ArrowDownRight size={12} strokeWidth={2} color={"#ff0000"} />}
            </Text>
                
                </Group>
            </Stack>
            <AreaChart
      width={160}
      height={60}
      data={datas}
      margin={{
        right: 0,
        left: 0,
        
      }}
    ><defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#f5832c" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#f5832c" stopOpacity={0}/>
    </linearGradient>
  
  </defs>
      <Area type="monotone" dataKey="aR" stroke="#f5832c" strokeWidth="2px" fill="url(#colorUv)"/>
    </AreaChart>
      </Group>
    </Paper>
  );
}

export default AvgReturn;