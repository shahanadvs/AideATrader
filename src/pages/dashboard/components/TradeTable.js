import {  Table, Tag } from 'antd';
import { Paper, Text } from '@mantine/core';
import React, {useContext,useEffect, useState} from 'react';
import {db} from '../../../firebase';
import { collection, query, limit, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../context/AuthContext";




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

function TradeTable(){ 
 
  const {currentUser} = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const da =[];

 const getData = async () =>{
    const q = query(collection(db, currentUser.uid), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
      da.push(doc.data())
    })
    setDatas(da);
  }

  useEffect(() => {
    
    
  return()=>{
    getData();
  }
        
  }, [datas])

return(
  <Paper shadow="sm" p="md" radius="md">
    <Table columns={columns} dataSource={datas} rowKey={datas.created} pagination ={false}/>
  </Paper>
)

}

export default TradeTable;