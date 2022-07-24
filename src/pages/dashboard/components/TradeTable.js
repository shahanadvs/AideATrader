import {  Table, Tag, Typography  } from 'antd';
import { Paper } from '@mantine/core';
import React from 'react';

const { Text } = Typography;


const columns = [
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (status) => 
         
                <Tag color={status==="WIN" ? 'green' : 'red'}>
                  {status}
                </Tag>,      
            
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
  },
  {
    title: 'Sell Price',
    dataIndex: 'sell',
    key: 'sell',
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
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '2',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '3',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '4',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '5',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '6',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '7',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '8',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '9',
    status: 'WIN',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  {
    key: '10',
    status: 'LOSS',
    date: '13/06/2022',
    symbol: 'Reliance',
    buy: '₹2400',
    sell: '₹425',
    quantity: '100',
    gain: '₹3000',
    strategy: 'Supply & Demand',
  },
  
];

const TradeTable = () => <Paper shadow="sm" p="md" radius="md">

  <Table columns={columns} dataSource={data} pagination ={false}/>

</Paper>;

export default TradeTable;