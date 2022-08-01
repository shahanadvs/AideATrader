import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';
import React, {useEffect, useState, useContext} from "react";

import { AreaChart, Area } from "recharts";


function TotalReturn({data}) {

  const [datas, setDatas] = useState([]);
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
    

  }
useEffect(() => {

  
   return()=>{
    getData();
  }
},[datas]);

  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position="left" py="sm">
        <Stack>
          <Text color="gray">Total Return</Text>
          <Group spacing="xs">
            <Text size="xl" weight="500">
              ₹36,447
            </Text>
            <Text size="md" color="green">
              36% <ArrowUpRight size={12} strokeWidth={2} color={"#4cbf40"} />
            </Text>
          </Group>
        </Stack>
        <AreaChart
      width={160}
      height={60}
      data={data}
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
