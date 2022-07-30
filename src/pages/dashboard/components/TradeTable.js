import {  Table, Tag } from 'antd';
import { Paper, Text } from '@mantine/core';
import React from 'react';



const columns = [
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    fixed: 'left',
    width: 100,
    render: (status) => 
     
            <Tag color={status==="WIN" ? 'green' : 'red'}>
              {status}
            </Tag>      
        
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol',
  },
  {
    title: 'Buy Price',
    dataIndex: 'buy',
    key: 'buy',
    render:(text)=><Text>₹{text}</Text>
  },
  {
    title: 'Sell Price',
    dataIndex: 'sell',
    key: 'sell',
    render:(text)=><Text>₹{text}</Text>
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Profit/Loss',
    dataIndex: 'gain',
    key: 'gain',
    render :(text, record, index)=>
    <Text color={record.status==="WIN" ? "green" : "red"}>
    ₹{(record.sell-record.buy)*record.quantity}
  </Text>  

  },
  {
    title: 'Strategy',
    dataIndex: 'strategy',
    key: 'strategy',
  },
  
  
];
const data = [
  {
    key: '1',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '2400',
    sell: '4250',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  
  
];

const TradeTable = () => <Paper shadow="sm" p="md" radius="md">

  <Table columns={columns} dataSource={data} pagination ={false}/>

</Paper>;

export default TradeTable;