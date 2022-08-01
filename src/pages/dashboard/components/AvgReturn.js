import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';
import React, {useEffect, useState, useContext} from "react";

import { AreaChart, Area } from "recharts";


function AvgReturn({data}) {

  const [datas, setDatas] = useState([]);
  const da = data;
  const da2 = [];

  const getData =  () => {
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
     setDatas(da2);
    

  }
  useEffect(() => {

    
      
        getData(); 
      
    
  },[datas]);


  return (
    <Paper shadow="sm" p="md" radius="md">
      <Group position='apart' py="sm">
            <Stack>
                <Text color="gray">Average Return</Text>
                <Group spacing="xs">
                <Text  size="xl" weight="500" >₹7,289</Text>
                <Text size="md" color="green">36% <ArrowUpRight size={12} strokeWidth={2} color={'#4cbf40'}/></Text>
                
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