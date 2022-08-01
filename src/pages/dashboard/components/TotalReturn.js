import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight } from 'tabler-icons-react';
import React, {useEffect, useState, useContext} from "react";

import { AreaChart, Area } from "recharts";


function TotalReturn({data}) {

  const [datas, setDatas] = useState([]);
  const [tot, setTot] = useState(0);
  const [totP, setTotP] = useState(0);
  const da = data;
  const da2 = [];

  const getData =  () => {
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
    setTot(totR);
    var f = 0;
    da.forEach((cr, ind)=>{
      if (ind == 0){
        f = ((cr.sell-cr.buy)*cr.quantity);
      }
    })
    const p = (totR- f)/100;
    setTotP(p)

  }
useEffect(() => {

  
   
    getData();
  
},[datas]);

  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position="left" py="sm">
        <Stack>
          <Text color="gray">Total Return</Text>
          <Group spacing="xs">
            <Text size="xl" weight="500">
              ₹{tot}
            </Text>
            <Text size="md" color={ totP>0 ? "green" : "red"}>
              {totP}% { totP > 0? <ArrowUpRight size={12} strokeWidth={2} color={"#4cbf40"} /> : <ArrowDownRight size={12} strokeWidth={2} color={"#ff0000"} />}
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
      <Area type="monotone" dataKey="tR" stroke="#f5832c" strokeWidth="2px" fill="url(#colorUv)"/>
    </AreaChart>
      </Group>
    </Paper>
  );
}

export default TotalReturn;
