import { Text, Paper, Group, Stack, RingProgress } from '@mantine/core';
import { ArrowUpRight } from 'tabler-icons-react';

import { AreaChart, Area } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function AvgReturn() {
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
      <Area type="monotone" dataKey="uv" stroke="#f5832c" strokeWidth="2px" fill="url(#colorUv)"/>
    </AreaChart>
      </Group>
    </Paper>
  );
}

export default AvgReturn;